import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { LineString } from 'ol/geom';
import { boundingExtent } from 'ol/extent';

type Coordinates = {
  lat: number;
  lng: number;
};

type MapComponentProps = {
  departureCoordinates: Coordinates;
  arrivalCoordinates: Coordinates;
};

const MapComponent: React.FC<MapComponentProps> = ({ departureCoordinates, arrivalCoordinates }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Initialize OpenLayers map
      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([(departureCoordinates.lng + arrivalCoordinates.lng) / 2, (departureCoordinates.lat + arrivalCoordinates.lat) / 2]),
          zoom: 4,
        }),
      });

      // Add departure marker
      const departureFeature = new Feature({
        geometry: new Point(fromLonLat([departureCoordinates.lng, departureCoordinates.lat])),
        name: 'Departure',
      });

      // Add arrival marker
      const arrivalFeature = new Feature({
        geometry: new Point(fromLonLat([arrivalCoordinates.lng, arrivalCoordinates.lat])),
        name: 'Arrival',
      });

      // Add polyline
      const line = new Feature({
        geometry: new LineString([
          fromLonLat([departureCoordinates.lng, departureCoordinates.lat]),
          fromLonLat([arrivalCoordinates.lng, arrivalCoordinates.lat]),
        ]),
      });

      const vectorSource = new VectorSource({
        features: [departureFeature, arrivalFeature, line],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      mapInstance.current.addLayer(vectorLayer);

      // Adjust the view to fit the line
      const extent = boundingExtent([
        fromLonLat([departureCoordinates.lng, departureCoordinates.lat]),
        fromLonLat([arrivalCoordinates.lng, arrivalCoordinates.lat]),
      ]);
      mapInstance.current.getView().fit(extent, { padding: [50, 50, 50, 50] });
    }
  }, [departureCoordinates, arrivalCoordinates]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%', borderRadius:"1em", overflow:"hidden", background:"transparent" }} />;
};

export default MapComponent;
