import axios from "axios";

interface FetchItemsParams {
  keyWord: string;
  page: number;
  types: string[];
}

interface ApiResponse {
  content: {
    id: number;
    longitude: number;
    latitude: number;
    address: string;
    type: string;
  }[];
  hasNext: boolean;
}

const searchItems = async ({
  keyWord,
  page,
  types,
}: FetchItemsParams): Promise<ApiResponse> => {
  const typeQuery = types.length ? types.join(",") : "";
  const response = await axios.get(`/api/searchItems`, {
    params: { keyWord, page, types: typeQuery },
  });
  return response.data;
};

export default searchItems;
