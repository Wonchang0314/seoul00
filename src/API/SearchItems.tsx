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
  const typeQuery = types.length ? `&type=${types.join(",")}` : "";
  const response = await axios.get<ApiResponse>(
    `http://3.39.190.141:8080/search?query=${encodeURIComponent(
      keyWord
    )}${typeQuery}&page=${page}&size=20`
  );
  return response.data;
};

export default searchItems;
