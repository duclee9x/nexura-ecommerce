import { createSaga, updateSagaStatus, addStep, updateStepStatus } from './sagaStateDB';
import { trace, metrics } from '@opentelemetry/api';
import { logger } from '@nexura/common/utils';
const tracer = trace.getTracer('saga-orchestrator');
const meter = metrics.getMeter('saga-orchestrator');

const sagaSuccessCounter = meter.createCounter('saga_success_total');
const sagaFailureCounter = meter.createCounter('saga_failure_total');
const compensationFailureCounter = meter.createCounter('saga_compensation_failed_total');
const stepRetryCounter = meter.createCounter('saga_step_retries_total');

export async function withRetry(fn: () => Promise<void>, retries = 3, delay = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      await fn();
      if (i > 0) stepRetryCounter.add(1);
      return;
    } catch (err) {
      if (i < retries - 1) await new Promise(r => setTimeout(r, delay * (i + 1)));
      else throw err;
    }
  }
}

export async function runSaga(steps: { name: string, forward: () => Promise<void>, compensate: () => Promise<void> }[]) {
  const saga = await createSaga();

  for (const step of steps) {
    await addStep(saga.id, step.name);

    try {
      logger.info(`Starting step: ${step.name}`);

      await tracer.startActiveSpan(step.name, async (span) => {
        await withRetry(() => step.forward());
        span.setStatus({ code: 1 });
        span.end();
      });

      await updateStepStatus(saga.id, step.name, 'SUCCESS');
      logger.info(`Step succeeded: ${step.name}`);

    } catch (e) {
      logger.error(`Step failed: ${step.name}. Starting compensation.`);
      await updateStepStatus(saga.id, step.name, 'FAILED');
      sagaFailureCounter.add(1);

      for (const prevStep of [...steps].reverse()) {
        await updateStepStatus(saga.id, prevStep.name, 'COMPENSATING');

        try {
          await withRetry(() => prevStep.compensate());
          await updateStepStatus(saga.id, prevStep.name, 'COMPENSATED');
          logger.info(`Compensated: ${prevStep.name}`);
        } catch (compErr) {
          logger.error(`Compensation failed: ${prevStep.name}`);
          await updateStepStatus(saga.id, prevStep.name, 'COMPENSATION_FAILED');
          await updateSagaStatus(saga.id, 'COMPENSATION_FAILED');
          compensationFailureCounter.add(1);
          return;
        }
      }

      await updateSagaStatus(saga.id, 'COMPENSATED');
      return;
    }
  }

  await updateSagaStatus(saga.id, 'SUCCEEDED');
  sagaSuccessCounter.add(1);
  logger.info(`Saga completed successfully.`);
}