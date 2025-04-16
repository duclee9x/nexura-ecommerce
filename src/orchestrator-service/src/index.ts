import './orchestrator/otel';
import { runSaga } from './orchestrator/sagaRunner';

const fakeCall = (name: string, succeed = true) => () =>
  new Promise<void>((res, rej) => setTimeout(() => succeed ? res() : rej(`${name} failed`), 500));

runSaga([
  {
    name: 'ReserveStock',
    forward: fakeCall('ReserveStock'),
    compensate: fakeCall('ReleaseStock')
  },
  {
    name: 'ChargePayment',
    forward: fakeCall('ChargePayment', false),
    compensate: fakeCall('Refund')
  },
  {
    name: 'CreateOrder',
    forward: fakeCall('CreateOrder'),
    compensate: fakeCall('CancelOrder')
  }
]);
