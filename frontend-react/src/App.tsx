import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyDetails from './pages/PropertyDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Million Luxury Properties</h1>
          <p>Exclusive real estate portfolio</p>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
