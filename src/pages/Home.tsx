import FlexBox from "../layout/FlexBox";
import { useNavigate } from "react-router-dom";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

export default function Home() {
  const navigate = useNavigate();

  const goToMapScreen = () => {
    navigate("/map");
  };

  return (
    <div>
      <Header className="bg-white">
        <nav>
          <img src="/LOGO.png" alt="team logo" className="w-40 ml-8 mt-4" />
        </nav>
      </Header>
      <div className="bg-gray-100 px-32">
        <FlexBox direction="row" className="md:col-span-1">
          <Sider>
            <div className="w-72">
              <h2 className="text-3xl font-bold ">편리하게 집근처</h2>
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
          </Sider>

          <Content>
            <img src="/div.ImageWrap.png" className="mt-16 h-108" />
          </Content>
        </FlexBox>
      </div>


    <div className="bg-gray-100 text-left text-l font-bold text-black py-0 pl-28 pr-4">
      <div className="flex items-start mb-4">
        <img src="/note.svg" alt="icon" className="w-8 mr-2" />
        <p className="mb-1">환경을 위한 지도앱, BinFinder!</p>
      </div>
      <p className="text-sm text-gray-400 mb-4 ml-10">지도를 통해 주변 의류, 폐의약품, 폐건전지 수거함 위치를 신속하게 확인하세요.</p>
      <div className="flex items-start mb-4">
        <img src="/note.svg" alt="icon" className="w-8 mr-2" />
        <p className="mb-1">무엇이 더 있나요?</p>
      </div>
      <p className="text-sm text-gray-400 mb-4 ml-10">BinFinder는 서울시 가로 휴지통의 위치와 재활용 센터시설 현황도 손쉽게 알려줍니다.</p>
      <div className="flex items-start mb-4">
        <img src="/note.svg" alt="icon" className="w-8 mr-2" />
        <p className="mb-1">어떻게 만들어졌나요?</p>
      </div>
      <p className="text-sm text-gray-400 mb-4 ml-10">BinFinder는 서울시의 공공 데이터를 기반으로 만들어졌습니다.</p>
      <div className="flex items-start mb-4">
        <img src="/note.svg" alt="icon" className="w-8 mr-2" />
        <p className="mb-1">BinFinder을 통한 편리한 분리수거</p>
      </div>
      <p className="text-sm text-gray-400 ml-10">주변 수거함 위치를 쉽고 빠르게 확인하여 분리수거 생활을 편리하게 즐겨보세요!</p>
    </div>










      <Footer>
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
      </Footer>
    </div>
  );
}
