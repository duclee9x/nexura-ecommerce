import { PrismaClient } from '../../db/prisma-client';
const prisma = new PrismaClient();

export const createSaga = async () => {
  return prisma.saga.create({ data: { status: 'RUNNING' } });
};

export const updateSagaStatus = async (id: string, status: string) => {
  return prisma.saga.update({ where: { id }, data: { status } });
};

export const addStep = async (sagaId: string, name: string) => {
  return prisma.step.create({ data: { sagaId, name, status: 'PENDING' } });
};

export const updateStepStatus = async (sagaId: string, name: string, status: string) => {
  return prisma.step.updateMany({ where: { sagaId, name }, data: { status } });
};

