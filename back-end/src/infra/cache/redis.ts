import RedisClient from 'ioredis';

import { env } from '../../config';
import { logger } from '../../utils';

class Redis {
  client: RedisClient;

  constructor() {
    this.client = new RedisClient(env.REDIS_URL, {
      lazyConnect: true,
    });
  }

  async connect(): Promise<void> {
    try {
      logger.info({
        message: 'Conectando ao redis...',
      });

      await this.client.connect();

      logger.info({
        message: 'Redis conectado com sucesso.',
      });
    } catch (error) {
      logger.error({
        message: `Erro ao se conectar ao redis: ${error as string}.`,
      });
    }
  }

  async disconnect(): Promise<void> {
    try {
      logger.info({
        message: 'Desconectando do redis...',
      });

      await this.client.quit();

      logger.info({
        message: 'Redis desconectado com sucesso.',
      });
    } catch (error) {
      logger.error({
        message: `Erro ao se desconectar do redis: ${error as string}.`,
      });
    }
  }
}

const redis = new Redis();

export { redis };
