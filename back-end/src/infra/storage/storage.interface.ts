interface StorageInterface {
  uploadFile: (filePath: string, fileBuffer: Buffer) => Promise<string>;
}

export type { StorageInterface };
