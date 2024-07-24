import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

export default function PointOnMap({ waypointType, setWaypoint , markersRef}) {
  const map = useMap();
  // const markersRef = useRef({ origin: null, destination: null });

  useEffect(() => {
    const onClick = (e) => {
      const { lat, lng } = e.latlng;

      if (waypointType === 'origin') {
        // Remove existing origin marker if it exists
        if (markersRef.current.origin) {
          return
        }
        // Add new origin marker
        const originMarker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`Origin Point<br />Latitude: ${lat}<br />Longitude: ${lng}`);
        markersRef.current.origin = originMarker;
        setWaypoint({ type: 'origin', coords: [lat, lng] });
      } else if (waypointType === 'destination') {
        // Remove existing destination marker if it exists
        if (markersRef.current.destination) {
          return
        }
        // Add new destination marker
        const destinationMarker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`Destination Point<br />Latitude: ${lat}<br />Longitude: ${lng}`);
        markersRef.current.destination = destinationMarker;
        setWaypoint({ type: 'destination', coords: [lat, lng] });
      }
    };

    map.on("click", onClick);

    return () => {
      map.off("click", onClick);
    };
  }, [map, waypointType, setWaypoint]);

  return null;
}