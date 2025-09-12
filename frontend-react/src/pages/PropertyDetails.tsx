import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Property } from '../types/property';
import { propertyService } from '../services/api';
import './PropertyDetails.css';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await propertyService.getPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load property',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="property-details loading">
        <div className="spinner"></div>
        <p>Cargando propiedad...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="property-details error">
        <p>❌ Error: {error}</p>
        <Link to="/" className="back-link">
          ← Volver al listado
        </Link>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-details not-found">
        <p>Propiedad no encontrada</p>
        <Link to="/" className="back-link">
          ← Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div className="property-details">
      <Link to="/" className="back-link">
        ← Volver al listado
      </Link>

      <div className="property-details-content">
        <div className="property-image-section">
          <div className="property-image-container">
            <img
              src={
                property.imageUrl ||
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop'
              }
              alt={property.name}
              className="property-detail-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop';
              }}
            />
          </div>
        </div>

        <div className="property-info-section">
          <h1 className="property-detail-name">{property.name}</h1>
          <p className="property-detail-address">{property.address}</p>

          <div className="property-detail-price">
            ${property.price.toLocaleString()}
          </div>

          <div className="property-detail-meta">
            <div className="meta-item">
              <span className="meta-label">ID Owner:</span>
              <span className="meta-value">{property.idOwner}</span>
            </div>

            {property.createdAt && (
              <div className="meta-item">
                <span className="meta-label">Creado:</span>
                <span className="meta-value">
                  {new Date(property.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <div className="property-actions">
            <button className="action-btn contact">Contactar</button>
            <button className="action-btn favorite">⭐ Favorito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
