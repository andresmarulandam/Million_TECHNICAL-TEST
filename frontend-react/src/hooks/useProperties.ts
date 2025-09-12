import { useState, useEffect } from 'react';
import type { Property, PropertyFilter } from '../types/property';
import { propertyService } from '../services/api';

export const useProperties = (initialFilter?: PropertyFilter) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<PropertyFilter>(
    initialFilter || {},
  );

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        let data: Property[];
        if (
          Object.values(currentFilter).some(
            (value) => value !== undefined && value !== '',
          )
        ) {
          data = await propertyService.getPropertiesByFilter(currentFilter);
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
  }, [currentFilter]);

  const applyFilter = (filter: PropertyFilter) => {
    setCurrentFilter(filter);
  };

  return { properties, loading, error, applyFilter };
};
