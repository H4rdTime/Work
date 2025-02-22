// src/types.ts
export interface Service {
    id: string;
    attributes: {
      title: string;
      description: string;
      price: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }