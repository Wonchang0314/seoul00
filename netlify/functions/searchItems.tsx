import axios from "axios";

exports.handler = async function (
  event: { queryStringParameters: { keyWord: any; page: any; types: any } },
  context: any
) {
  const { keyWord, page, types } = event.queryStringParameters;
  const typeQuery = types ? `&type=${types}` : "";
  const url = `http://3.39.190.141:8080/search?query=${encodeURIComponent(
    keyWord
  )}${typeQuery}&page=${page}&size=20`;

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
