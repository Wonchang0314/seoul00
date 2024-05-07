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
  const response = await axios.get<nearByResponse>(
    `http://3.39.190.141:8080/near?radius=${radius}&x=${longitude}&y=${latitude}`
  );
  return response.data;
};

export default locationBasedSearch;
