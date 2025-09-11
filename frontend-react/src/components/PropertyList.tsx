import type { Property } from '../types/property';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  loading: boolean;
  error: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="property-list loading">
        <div className="spinner"></div>
        <p>Cargando propiedades...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="property-list error">
        <p>❌ Error: {error}</p>
      </div>
    );
  }
  if (properties.length === 0) {
    return (
      <div className="property-list empty">
        <p>No se encontraron propiedades</p>
      </div>
    );
  }
  return (
    <div className="property-list">
      <h2>Propiedades ({properties.length})</h2>
      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};
export default PropertyList;
