import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { logger } from '../../utils';
import { type StorageInterface } from './storage.interface';

class StorageFirabase implements StorageInterface {
  async uploadFile(filePath: string, fileBuffer: Buffer): Promise<string> {
    const storage = getStorage();

    const fileDir = ref(storage, filePath);

    await uploadBytes(fileDir, fileBuffer);

    const fileURL = await getDownloadURL(fileDir);

    logger.info({
      msg: 'Upload de arquivo realizado para o Firebase.',
      filePath,
      fileURL,
    });

    return fileURL;
  }
}

export { StorageFirabase };
