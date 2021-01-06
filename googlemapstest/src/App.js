import './App.css';
import MapContainer from './components/MapContainer';
import NewMapContainer from './components/NewMapContainer';
import HeatMap from './components/HeatMap';
import { LoadScript } from '@react-google-maps/api';

function App() {
  return (
    // <MapContainer />;
    <LoadScript
      googleMapsApiKey='AIzaSyC7qV9kdOaPE1VtixpR2clHPkTATkUPMwk'
      libraries={['visualization']}
    >
      <NewMapContainer />
      <HeatMap />
    </LoadScript>
  );
}

export default App;
