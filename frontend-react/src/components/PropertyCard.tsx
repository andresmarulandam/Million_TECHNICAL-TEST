import { useNavigate } from 'react-router-dom';
import type { Property } from '../types/property';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}
const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const placeholderImage =
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop';

  return (
    <div className="property-card" onClick={handleClick}>
      <div className="property-image-container">
        <div className="property-overlay"></div>
        <img
          src={
            imageError
              ? placeholderImage
              : property.imageUrl || placeholderImage
          }
          alt={property.name}
          className="property-image"
          onError={handleImageError}
        />
      </div>

      <div className="property-info">
        <h3 className="property-name">{property.name}</h3>
        <p className="property-address">{property.address}</p>
        <div className="property-price">${property.price.toLocaleString()}</div>
        <p className="property-owner">ID Owner: {property.idOwner}</p>
        <span className="property-link">Ver detalles</span>
      </div>
    </div>
  );
};
export default PropertyCard;
