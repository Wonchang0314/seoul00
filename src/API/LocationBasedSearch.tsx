import axios from "axios";

interface FetchItemsLocation {
  radius: number;
  longitude: number;
  latitude: number;
}

interface nearByResponse {
  data: {
    id: number;
    longitude: number;
    latitude: number;
    address: string;
    type: string;
  }[];
}

const locationBasedSearch = async ({
  radius,
  longitude,
  latitude,
}: FetchItemsLocation): Promise<nearByResponse> => {
  const response = await axios.get(`/.netlify/functions/locationBasedSearch`, {
    params: { radius, longitude, latitude },
  });
  return response.data;
};

export default locationBasedSearch;
