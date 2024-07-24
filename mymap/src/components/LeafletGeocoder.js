import React, { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import 'leaflet-control-geocoder';

export default function LeafletGeocoder() {
    const map = useMap();
    useEffect(() => {
        L.Control.geocoder({
            defaultMarkGeocode: false
          })
            .on('markgeocode', function(e) {
              var lanlng = e.geocode.center;
              L.marker(lanlng).addTo(map).bindPopup(e.geocode.name);
              map.fitBounds(e.geocode.bbox);
            })
            .addTo(map);
    }, []);
    
    return null  
};
