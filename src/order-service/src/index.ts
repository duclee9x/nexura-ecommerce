import { startServer } from './server'
import { logger } from './utils/logger'

async function main() {
  try {
    await startServer()
    logger.info('Order service started successfully')
  } catch (error) {
    logger.error('Failed to start order service:', error)
    process.exit(1)
  }
}

main() 