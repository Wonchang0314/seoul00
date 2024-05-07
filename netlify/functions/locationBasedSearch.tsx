import axios from "axios";

exports.handler = async function (
  event: {
    queryStringParameters: { radius: any; longitude: any; latitude: any };
  },
  context: any
) {
  const { radius, longitude, latitude } = event.queryStringParameters;

  try {
    const response = await axios.get(
      `http://3.39.190.141:8080/near?radius=${radius}&x=${longitude}&y=${latitude}`
    );
    // 성공 응답 반환
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // 오류 처리
    return {
      statusCode: error.response.status || 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
