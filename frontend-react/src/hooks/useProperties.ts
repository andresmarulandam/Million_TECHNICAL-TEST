import { useState, useEffect } from 'react';
import type { Property, PropertyFilter } from '../types/property';
import { propertyService } from '../services/api';

export const useProperties = (filter?: PropertyFilter) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        let data: Property[];
        if (
          filter &&
          (filter.name || filter.address || filter.minPrice || filter.maxPrice)
        ) {
          data = await propertyService.getPropertiesByFilter(filter);
        } else {
          data = await propertyService.getAllProperties();
        }

        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filter]);

  return { properties, loading, error };
};
