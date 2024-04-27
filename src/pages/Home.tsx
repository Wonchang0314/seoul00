import FlexBox from "../layout/FlexBox";
import { useNavigate } from "react-router-dom";
import GridBox from "../layout/GridBox";

export default function Home() {
  const navigate = useNavigate();

  const goToMapScreen = () => {
    navigate("/map");
  };

  return (
    <div className="h-custom-height">
      <header className="h-16">
        <nav>
          <img src="/LOGO.png" alt="team logo" className="w-40 ml-8 mt-4" />
        </nav>
      </header>
      <div className="bg-gray-100 h-full w-full px-16">
        <GridBox className="grid grid-cols-3 flex flex-col bg-gray-100">
          <FlexBox direction="col" className="md:col-span-1  mt-32">
            <div>
              <h2 className="mb-1 text-3xl font-bold ">편리하게 집근처</h2>
              <h2 className="text-3xl font-bold">수거함 조회</h2>
              <div className="mt-4 text-lg text-gray-400">
                <p>편리한 분리수거 및 쓰레기 처리를 위해</p>
                <p>공공데이터를 이용하여 제공해 드립니다</p>
              </div>
              <button
                className="bg-green-500 mt-4 text-white font-bold py-3 px-4 rounded-full w-full"
                onClick={goToMapScreen}
              >
                지금 검색하기
              </button>
            </div>
          </FlexBox>
          <FlexBox className="col-span-2">
            <img src="/div.ImageWrap.png" className="mt-24 w-full h-full" />
          </FlexBox>
        </GridBox>
      </div>
      <div className="bg-gray-100 px-24">
        <FlexBox className="mt-64">
          <img src="/LOGO.png" alt="team logo" className="w-24 mb-16" />
          <FlexBox direction="col" className="mt-8">
            <p className="text-sm mb-2 mr-2">TEAM NAME: Binfinder</p>
            <p className="text-sm mb-16 ml-16 text-gray-400">
              Title email: https://data.seoul.go.kr
            </p>
          </FlexBox>
        </FlexBox>
      </div>
    </div>
  );
}
