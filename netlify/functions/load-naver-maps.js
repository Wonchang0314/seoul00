export async function handler(event, context) {
  const naverApiKey = process.env.REACT_APP_NAVER_MAP_API_KEY; // 환경 변수에서 네이버 지도 API 키 가져오기
  return {
    statusCode: 200,
    body: JSON.stringify({ key: naverApiKey }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // CORS 정책 설정
    },
  };
}
