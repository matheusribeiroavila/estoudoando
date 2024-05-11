import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '../../config';
import { logger } from '../../utils';

class Firebase {
  static connect(): void {
    try {
      initializeApp(firebaseConfig);

      logger.info({
        msg: 'Firebase conectado com sucesso.',
      });
    } catch (error: any) {
      logger.error({
        msg: 'Erro ao se conectar ao Firebase.',
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

export { Firebase };
