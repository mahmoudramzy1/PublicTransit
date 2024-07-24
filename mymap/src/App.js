import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import './components/style/Mapcontrol.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import Map from './components/map';
import LeafletRoutingMachine from './components/LeafletRoutingMachine';

function App() {
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LandingPage />} />
        <Route path="/map" element={ <Map /> } />
        <Route path="/route" element={ <LeafletRoutingMachine /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;