import PropertyList from './components/PropertyList';
import { useProperties } from './hooks/useProperties';

function App() {
  const { properties, loading, error } = useProperties();
  return (
    <div className="App">
      <header className="App-header">
        <h1>🏠 Million Property App</h1>
        <p>Gestión de propiedades inmobiliarias</p>
      </header>

      <main>
        <PropertyList properties={properties} loading={loading} error={error} />
      </main>
    </div>
  );
}

export default App;
