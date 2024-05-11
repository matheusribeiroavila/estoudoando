import mongoose from 'mongoose';

import { env } from '../../config';
import { logger } from '../../utils';

class MongoDBClient {
  async connect(): Promise<void> {
    try {
      logger.info({
        msg: 'Conectando ao banco de dados...',
      });

      await mongoose.connect(env.DB_URL, {
        dbName: env.DB_NAME,
      });

      logger.info({
        msg: 'Banco de dados conectado com sucesso.',
      });
    } catch (error: any) {
      logger.error({
        msg: `Erro ao se conectar ao banco de dados: ${error as string}.`,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      });

      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      logger.info({
        msg: 'Desconectando do banco de dados...',
      });

      await mongoose.disconnect();

      logger.info({
        msg: 'Banco de dados desconectado com sucesso.',
      });
    } catch (error: any) {
      logger.error({
        msg: `Erro ao se desconectar do banco de dados: ${error as string}.`,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      });

      throw error;
    }
  }
}

const mongodb = new MongoDBClient();

export { mongodb };
