import React, { useState } from 'react';
import type { PropertyFilter } from '../types/property';
import './PropertyFilters.css';

interface PropertyFiltersProps {
  onFilter: (filter: PropertyFilter) => void;
  loading: boolean;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  onFilter,
  loading,
}) => {
  const [filters, setFilters] = useState<PropertyFilter>({
    name: '',
    address: '',
    minPrice: undefined,
    maxPrice: undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === '' ? undefined : value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === '' ? undefined : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleClear = () => {
    const emptyFilters = {
      name: '',
      address: '',
      minPrice: undefined,
      maxPrice: undefined,
    };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  return (
    <div className="property-filters">
      <h3>🔍 Filtrar Propiedades</h3>
      <form onSubmit={handleSubmit} className="filters-form">
        <div className="filter-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name || ''}
            onChange={handleInputChange}
            placeholder="Buscar por nombre..."
          />
        </div>

        <div className="filter-group">
          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={filters.address || ''}
            onChange={handleInputChange}
            placeholder="Buscar por dirección..."
          />
        </div>

        <div className="filter-group">
          <label htmlFor="minPrice">Precio Mínimo:</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice || ''}
            onChange={handleNumberChange}
            placeholder="Precio mínimo"
            min="0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxPrice">Precio Máximo:</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice || ''}
            onChange={handleNumberChange}
            placeholder="Precio máximo"
            min="0"
          />
        </div>

        <div className="filter-buttons">
          <button type="submit" disabled={loading} className="filter-btn apply">
            {loading ? 'Buscando...' : 'Aplicar Filtros'}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="filter-btn clear"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyFilters;
