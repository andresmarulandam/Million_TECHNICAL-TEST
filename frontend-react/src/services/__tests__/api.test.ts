import type { Property, PropertyFilter } from '../../types/property';

const mockGet = jest.fn();

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: mockGet,
    post: jest.fn(),
  })),
}));

import axios from 'axios';
import { propertyService } from '../api';

const mockProperty: Property = {
  id: '1',
  idOwner: 'owner-123',
  name: 'Test Property',
  address: '123 Test St',
  price: 100000,
  imageUrl: 'https://example.com/image.jpg',
  createdAt: new Date('2023-01-01T00:00:00Z'),
};

describe('Property Service API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProperties', () => {
    it('should return all properties on successful request', async () => {
      // Arrange
      const mockProperties: Property[] = [mockProperty];
      mockGet.mockResolvedValueOnce({ data: mockProperties });

      // Act
      const result = await propertyService.getAllProperties();

      // Assert
      expect(mockGet).toHaveBeenCalledWith('/properties');
      expect(result).toEqual(mockProperties);
    });

    it('should throw error on failed request', async () => {
      // Arrange
      mockGet.mockRejectedValueOnce(new Error('Network Error'));

      // Act & Assert
      await expect(propertyService.getAllProperties()).rejects.toThrow(
        'Failed to fetch properties',
      );
      expect(mockGet).toHaveBeenCalledWith('/properties');
    });
  });

  describe('getPropertyById', () => {
    it('should return property by id on successful request', async () => {
      // Arrange
      const propertyId = '1';
      mockGet.mockResolvedValueOnce({ data: mockProperty });

      // Act
      const result = await propertyService.getPropertyById(propertyId);

      // Assert
      expect(mockGet).toHaveBeenCalledWith(`/properties/${propertyId}`);
      expect(result).toEqual(mockProperty);
    });

    it('should throw error when property not found', async () => {
      // Arrange
      const propertyId = '999';
      mockGet.mockRejectedValueOnce(new Error('Not Found'));

      // Act & Assert
      await expect(propertyService.getPropertyById(propertyId)).rejects.toThrow(
        'Failed to fetch property',
      );
      expect(mockGet).toHaveBeenCalledWith(`/properties/${propertyId}`);
    });
  });

  describe('getPropertiesByFilter', () => {
    it('should return filtered properties with name filter', async () => {
      // Arrange
      const filter: PropertyFilter = { name: 'Test' };
      const mockProperties: Property[] = [mockProperty];
      mockGet.mockResolvedValueOnce({ data: mockProperties });

      // Act
      const result = await propertyService.getPropertiesByFilter(filter);

      // Assert
      expect(mockGet).toHaveBeenCalledWith('/properties/filter?name=Test');
      expect(result).toEqual(mockProperties);
    });

    it('should return filtered properties with price range', async () => {
      // Arrange
      const filter: PropertyFilter = {
        minPrice: 50000,
        maxPrice: 200000,
      };
      const mockProperties: Property[] = [mockProperty];
      mockGet.mockResolvedValueOnce({ data: mockProperties });

      // Act
      const result = await propertyService.getPropertiesByFilter(filter);

      // Assert
      expect(mockGet).toHaveBeenCalledWith(
        '/properties/filter?minPrice=50000&maxPrice=200000',
      );
      expect(result).toEqual(mockProperties);
    });

    it('should throw error on filter failure', async () => {
      // Arrange
      const filter: PropertyFilter = { name: 'Test' };
      mockGet.mockRejectedValueOnce(new Error('Server Error'));

      // Act & Assert
      await expect(
        propertyService.getPropertiesByFilter(filter),
      ).rejects.toThrow('Failed to filter properties');
    });
  });
});
