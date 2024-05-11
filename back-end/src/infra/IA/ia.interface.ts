interface IAInterface {
  getImageClothingItems: (imageBuffer: Buffer) => Promise<string | null>;
}

export type { IAInterface };
