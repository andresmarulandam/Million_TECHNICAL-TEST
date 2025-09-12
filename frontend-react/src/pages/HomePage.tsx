import PropertyFilters from '../components/PropertyFilters';
import PropertyList from '../components/PropertyList';
import { useProperties } from '../hooks/useProperties';

const HomePage: React.FC = () => {
  const { properties, loading, error, applyFilter } = useProperties();

  return (
    <>
      <div className="container">
        <div className="filters-section">
          <PropertyFilters onFilter={applyFilter} loading={loading} />
        </div>

        <div className="content-section">
          <PropertyList
            properties={properties}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
