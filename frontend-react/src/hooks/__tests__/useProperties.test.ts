// src/hooks/__tests__/useProperties.test.ts
import { renderHook, act, waitFor } from '@testing-library/react';
import { useProperties } from '../useProperties';
import { propertyService } from '../../services/api';

// Mock del servicio API
jest.mock('../../services/api');

const mockProperties = [
  {
    id: '1',
    idOwner: 'owner-1',
    name: 'Luxury Villa',
    address: '123 Beach Road',
    price: 500000,
  },
];

describe('useProperties', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should load properties at startup', async () => {
    (propertyService.getAllProperties as jest.Mock).mockResolvedValue(
      mockProperties,
    );

    const { result } = renderHook(() => useProperties());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.properties).toEqual(mockProperties);
    expect(result.current.error).toBeNull();
  });

  test('should handle API errors', async () => {
    (propertyService.getAllProperties as jest.Mock).mockRejectedValue(
      new Error('Network error'),
    );

    const { result } = renderHook(() => useProperties());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.properties).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });

  test('should apply filters', async () => {
    (propertyService.getPropertiesByFilter as jest.Mock).mockResolvedValue(
      mockProperties,
    );

    const { result } = renderHook(() => useProperties());

    // Esperar carga inicial
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Aplicar filtro
    act(() => {
      result.current.applyFilter({ name: 'Luxury' });
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(propertyService.getPropertiesByFilter).toHaveBeenCalledWith({
      name: 'Luxury',
    });
  });
});
