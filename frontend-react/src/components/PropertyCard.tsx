import { useNavigate } from 'react-router-dom';
import type { Property } from '../types/property';
import { useState } from 'react';
import './PropertyCard.css';
import { optimizeImage } from '../services/imageService';

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

  const optmizedImage = optimizeImage(property.imageUrl, 400, 250);
  const fallbackImage = optimizeImage(undefined, 400, 250);

  return (
    <div className="property-card" onClick={handleClick}>
      <div className="property-image-container">
        <div className="property-overlay"></div>
        <img
          src={imageError ? fallbackImage : optmizedImage}
          alt={property.name}
          className="property-image"
          onError={handleImageError}
          loading="lazy"
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
