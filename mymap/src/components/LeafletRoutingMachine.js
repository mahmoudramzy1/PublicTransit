import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import PointOnMap from "./PointOnMap";
import './style/Mapcontrol.css';

export default function LeafletRoutingMachine({origin, destination}) {
  // const [origin, setOrigin] = useState(null);
  // const [destination, setDestination] = useState(null);
  // const [isSettingOrigin, setIsSettingOrigin] = useState(true);
  const map = useMap();

  useEffect(() => {
    if (origin && destination) {
      L.Routing.control({
        waypoints: [
          L.latLng(origin[0], origin[1]),
          L.latLng(destination[0], destination[1])
        ],
        lineOptions: {
          styles: [{ color: 'blue', opacity: 0.7, weight: 4 }]
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        fitSelectedRoutes: true,
        draggableWaypoints: false,
        showAlternatives: false,
        addWaypoints: true,
      }).addTo(map);
    }
  }, [map, origin, destination]);
}
//   return (
//     <div>
//     {/* <div className="map-controls"> */}
//      {/* <button onClick={() => setIsSettingOrigin(true)}>Set Origin</button>
//       <button onClick={() => setIsSettingOrigin(false)}>Set Destination</button> 
//     </div>
//     <PointOnMap setWaypoint={isSettingOrigin ? setOrigin : setDestination} />*/}
//   </div>
//   );
