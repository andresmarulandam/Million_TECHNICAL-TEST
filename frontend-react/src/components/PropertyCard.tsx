import type { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
}
const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div key={property.id} className="property-card">
      {property.imageUrl && (
        <img
          src={property.imageUrl}
          alt={property.name}
          className="property-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/300x200/cccccc/969696?text=No+Image';
          }}
        />
      )}
      <div className="property-info">
        <h3 className="property-name">{property.name}</h3>
        <p className="property-address">{property.address}</p>
        <p className="property-price">${property.price.toLocaleString()}</p>
        <p className="property-owner">ID Owner: {property.idOwner}</p>
      </div>
    </div>
  );
};
export default PropertyCard;
