import { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";

interface Airport {
  id: string;
  ident: string;
  type: string;
  name: string;
  latitude_deg: string;
  longitude_deg: string;
  elevation_ft: string;
  continent: string;
  iso_country: string;
  iso_region: string;
  municipality: string;
  scheduled_service: string;
  gps_code: string;
  iata_code: string;
  local_code: string;
  home_link: string;
  wikipedia_link: string;
  keywords: string;
}
const useAirportCoordinates = () => {
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch("/data/airports.csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setAirports(result.data as Airport[]);
        },
      });
    };

    fetchCSV();
  }, []);

  const getCoordinatesByIATA = useCallback((iataCode: string) => {
    const airport = airports.find((a) => a.iata_code === iataCode);
    return airport ? { lat: parseFloat(airport.latitude_deg), lng: parseFloat(airport.longitude_deg) } : null;
  }, [airports]);

  return { airports, getCoordinatesByIATA };
};

export default useAirportCoordinates;
