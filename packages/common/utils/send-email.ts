import { CommunicationProtocolEnum, DaprClient } from '@dapr/dapr';

import { logger } from '@nexura/common/utils';
export const sendEmail = async (email: string, subject: string, message: string) => {
      try {
        const BINDING_NAME = "smtp"
        const BINDING_OPERATION = "create"
        const client = new DaprClient({
          daprHost: process.env.DAPR_HOST,
          daprPort: process.env.DAPR_HTTP_PORT,
          communicationProtocol: CommunicationProtocolEnum.HTTP,
        });
        await client.binding.send(BINDING_NAME, BINDING_OPERATION, message, {
          emailTo: email,
          subject: subject,
        })
      } catch (error) {
        logger.error('Failed to send email:', error);
      }
}
  