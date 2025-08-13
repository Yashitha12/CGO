// Constants for components
import axios from "axios";

export const COMPONENT_CODES = {
  RUNWAY: "01",
  TAXIWAY: "02",
  APRON: "03",
  ATC_TOWER: "04",
  RADAR_TOWER: "05",
  HANGER: "06",
  OTHER: "07",
};

export const JWT_TOKEN = {
  jwtToken:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NTA1NjI0NSwiZXhwIjoxNzU1MTQyNjQ1fQ.XaG5VRb41E8lqzuwAmQMA0DKmpdQlsJ5iWqBp_WFgsj2-I8ub-pftUsjSKHI84t-m_GFzksUIP1u_8v4LBXbfQ",
};

// function to get the base sin number
export function getSessionBaseSin() {
   return sessionStorage.getItem("airfieldSinNumber");

}

// function to get the final sin number
export async function generateComponentSinId(baseSin, componentCode, jwtToken) {
  const response = await axios.post(
    "http://192.168.231.62/cgosincode/api/finalSin/generate",
    {
      baseSin,
      mainComponent: componentCode,
    },
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  return response.data.finalSinCode;
}

export const UNIT_MAPPING = {
  "Square Meters (m²)": "SQUARE_METERS",
  "Square Kilometers (km²)": "SQUARE_KILOMETERS",
  "Square Miles (mi²)": "SQUARE_MILES",
  "Square Yards (yd²)": "SQUARE_YARDS",
  "Square Feet (ft²)": "SQUARE_FEET",
  "Hectares (Ha)": "HECTARES",
  "Acres (ac)": "ACRES",
  Perches: "PERCHES",
};
