import React, { useState, useEffect, useRef } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L, { map } from 'leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import LeafletGeocoder from './LeafletGeocoder';
import LeafletRoutingMachine from './LeafletRoutingMachine';
import './style/Mapcontrol.css'
import PointOnMap from './PointOnMap';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

function App() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypointType, setWaypointType] = useState(null);
  const markersRef = useRef({ origin: null, destination: null });
  // const [stop, setStop] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchStop = async () => {
  //     try {
  //       console.log('Fetching stop...');
  //       const response = await axios.get('http://localhost:8082/stops/1');
  //       console.log('API Response:', response.data); // Logging the response

  //       const stopData = response.data;
  //       if (stopData) {
  //         setStop({
  //           ...stopData,
  //           latitude: parseFloat(stopData.latitude),
  //           longitude: parseFloat(stopData.longitude),
  //         });
  //         console.log('Stop data set:', stopData);
  //       } else {
  //         console.log('No stop data received');
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching stop:', error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchStop();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!stop) {
  //   return <div>No data available</div>;
  // }

  // console.log('Rendering map with center:', [stop.latitude, stop.longitude]);
  const handleSetWaypoint = ({ type, coords }) => {
    if (type === 'origin') {
      setOrigin(coords);
    } else if (type === 'destination') {
      setDestination(coords);
    }
  };

  useEffect(() => {
    if (origin && destination) {
      const sendtoback = async () => {
        try {
          const response = await axios.post('http://localhost:8082/api/route', { origin, destination });
          console.log('backend response: ', response.data);
        } catch (err) {
          console.error("error sending coordintes to backend: ", err);
          throw new Error("error sending coordintes to backend: ", err);
        }
      }
      sendtoback();
    }
  }, [origin, destination]);

  const handleSetOrigin = () => {
    if (markersRef.current.origin) {
      markersRef.current.origin.remove();
      markersRef.current.origin = null;
    }
    setWaypointType('origin');
  };

  const handleSetDestination = () => {
    if (markersRef.current.destination) {
      markersRef.current.destination.remove();
      markersRef.current.destination = null;
    }
    setWaypointType('destination');
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Leaflet Map with React</h1>
      </header>
    
      <MapContainer
        className="map-container"
        center={[30.051100, 31.365600]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[stop.latitude, stop.longitude]}>
          <Popup>
            {stop.city} <br /> Lat: {stop.latitude}, Lng: {stop.longitude}
          </Popup>
        </Marker> */}
        <div className="map-controls">
          <button onClick={handleSetOrigin}>Set Origin</button>
          <button onClick={handleSetDestination}>Set Destination</button>
        </div>
        {/* <LeafletRoutingMachine /> */}
        {/* <PointOnMap setWaypoint={isSettingOrigin ? setOrigin : setDestination} /> */}
        {origin && (
          <Marker position={origin}>
            <Popup>
              Origin Point<br />
              Latitude: {origin[0]}<br />
              Longitude: {origin[1]}
            </Popup>
          </Marker>
        )}
        {destination && (
          <Marker position={destination}>
            <Popup>
              Destination Point<br />
              Latitude: {destination[0]}<br />
              Longitude: {destination[1]}
            </Popup>
          </Marker>
        )}
        {waypointType && (
          <PointOnMap waypointType={waypointType} setWaypoint={handleSetWaypoint} markersRef={markersRef}/>
        )}
        <LeafletGeocoder />
        {origin && destination && (
          <LeafletRoutingMachine origin={origin} destination={destination} />
        )}

      </MapContainer>
    </div>
  );
}

let DefaultIcon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default App;