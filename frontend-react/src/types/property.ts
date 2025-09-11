export interface Property {
  id?: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  imageUrl?: string;
  createdAt?: Date;
}

export interface PropertyFilter {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface CreatePropertyData {
  idOwner: string;
  name: string;
  address: string;
  price: number;
  imageUrl?: string;
}
