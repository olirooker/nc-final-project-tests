import './App.css';
import MapContainer from './components/MapContainer';
import NewMapContainer from './components/NewMapContainer';
import HeatMap from './components/HeatMap';
import { LoadScript } from '@react-google-maps/api';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  return (
    // <MapContainer />;
    <LoadScript googleMapsApiKey={API_KEY} libraries={['visualization']}>
      <NewMapContainer />
      <HeatMap />
    </LoadScript>
  );
}

export default App;
