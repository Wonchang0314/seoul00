import FlexBox from "../layout/FlexBox";
import { useNavigate } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { useAtom } from "jotai";
import { isMobileAtom, locationAtom } from "../global";
import { useEffect } from "react";
import "../styles/home.css";
import Introduction from "../components/Introduction";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();
  const [isMobile] = useAtom(isMobileAtom);
  const [myLocation, setMyLocation] = useAtom(locationAtom);
  const naverMapAPIKey = process.env.REACT_APP_NAVER_MAP_API_KEY;

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapAPIKey}`;
    document.head.appendChild(script);
  }, [naverMapAPIKey]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location: ", error);
          window.alert("현재 위치를 알 수 없습니다.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      window.alert("Geolocation is not supported by this browser.");
    }
  }, [myLocation, setMyLocation]);

  const goToMapScreen = () => {
    navigate("/map");
  };

  return (
    <div className="w-full bg-gray-100">
      {isMobile ? (
        <div>
          <div>
            <nav className="bg-white mb-4">
              <img src="/LOGO.png" alt="team logo" className="w-40 ml-8" />
            </nav>
          </div>

          <div className="bg-gray-100 w-full">
            <FlexBox direction="col" className="items-center px-8">
              <h2 className="text-3xl font-bold mt-8">편리하게 집근처</h2>
              <h2 className="text-3xl font-bold">수거함 조회</h2>
              <div className="mt-4 text-lg text-gray-400">
                <p>편리한 분리수거 및 쓰레기 처리를 위해</p>
                <p>공공데이터를 이용하여 제공해 드립니다</p>
              </div>
              <button
                className="bg-green-500 mt-4 text-white font-bold py-3 rounded-full w-full"
                onClick={goToMapScreen}
              >
                지금 검색하기
              </button>
            </FlexBox>
            <div className="mt-16 mr-16">
              <img src="/div.ImageWrap.png" alt="binMap" />
            </div>
            <FlexBox direction="col" className="mt-16">
              <Introduction />
            </FlexBox>
            <Footer />
          </div>
        </div>
      ) : (
        <div>
          <Header className="bg-white">
            <nav>
              <img src="/LOGO.png" alt="team logo" className="w-40 ml-8 mt-4" />
            </nav>
          </Header>
          <div className="bg-gray-100 px-32">
            <FlexBox direction="row" className="col-span-1">
              <div className="w-full">
                <h2 className="text-3xl font-bold">편리하게 집근처</h2>
                <h2 className="text-3xl font-bold">수거함 조회</h2>
                <div className="mt-4 text-lg text-gray-400">
                  <p>편리한 분리수거 및 쓰레기 처리를 위해</p>
                  <p>공공데이터를 이용하여 제공해 드립니다</p>
                </div>
                <button
                  className="bg-green-500 mt-4 text-white font-bold py-3 rounded-full w-full"
                  onClick={goToMapScreen}
                >
                  지금 검색하기
                </button>
              </div>

              <Content>
                <img
                  src="/div.ImageWrap.png"
                  alt="logo"
                  className="mt-16 h-108"
                />
              </Content>
            </FlexBox>
          </div>
          <div>
            <Introduction />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
