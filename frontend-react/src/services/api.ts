import axios from 'axios';
import type {
  Property,
  PropertyFilter,
  CreatePropertyData,
} from '../types/property';

const API_BASE_URL = 'http://localhost:5019/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const propertyService = {
  getAllProperties: async (): Promise<Property[]> => {
    try {
      const response = await api.get<Property[]>('/properties');
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw new Error('Failed to fetch properties');
    }
  },

  getPropertyById: async (id: string): Promise<Property> => {
    try {
      const response = await api.get<Property>(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw new Error('Failed to fetch property');
    }
  },

  getPropertiesByFilter: async (
    filter: PropertyFilter,
  ): Promise<Property[]> => {
    try {
      const params = new URLSearchParams();

      if (filter.name) params.append('name', filter.name);
      if (filter.address) params.append('address', filter.address);
      if (filter.minPrice)
        params.append('minPrice', filter.minPrice.toString());
      if (filter.maxPrice)
        params.append('maxPrice', filter.maxPrice.toString());

      const response = await api.get<Property[]>(
        `/properties/filter?${params}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error filtering properties:', error);
      throw new Error('Failed to filter properties');
    }
  },

  createProperty: async (
    propertyData: CreatePropertyData,
  ): Promise<Property> => {
    try {
      const response = await api.post<Property>('/properties', propertyData);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw new Error('Failed to create property');
    }
  },
};
