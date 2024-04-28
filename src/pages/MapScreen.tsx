import React from "react";
import FlexBox from "../layout/FlexBox";
import GridBox from "../layout/GridBox";
import { useNavigate } from "react-router-dom";

export default function MapScreen() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="h-full">
      <header className="h-16">
        <nav>
          <img src="/LOGO.png" alt="team logo" className="w-40 ml-8 mt-4" />
        </nav>
      </header>
      
    {/* 중간 부분 */}
    <div className="bg-gray-100 h-screen px-0 mt-0">
      <FlexBox className="h-full">
        {/* 첫 번째 섹션 */}
        <FlexBox direction="col" className="w-1/4 bg-gray-170 p-4 h-full"> 
          {/* 첫 번째 행 */}
          <FlexBox direction="col" className="w-full bg-white p-4 h-2/7"> 
            <div className="flex items-center rounded-lg w-full border border-2 border-blue-500 p-2">
              <input type="text" placeholder="ex)위치" className="outline-none flex-grow" />
              <span role="img" aria-label="search" className="text-blue-500 cursor-pointer">🔍</span>
            </div>
            <FlexBox className="space-x-4 mt-4">
              <button className="rounded-full bg-white border border-gray-400 py-2 px-4 text-xs hover:bg-gray-300 focus:outline-none">전체</button>
              <button className="rounded-full bg-white border border-gray-400 py-2 px-4 text-xs hover:bg-gray-300 focus:outline-none">
                <span role="img" aria-label="trash" className="text-gray-600">🗑️</span>
                쓰레기
                </button>
              <button className="rounded-full bg-white border border-gray-400 py-2 px-4 text-xs hover:bg-gray-300 focus:outline-none">
                <span role="img" aria-label="clothing" className="text-gray-600">👕</span>
                의료수거함
                </button>
            </FlexBox>
            
          </FlexBox>
                   
          {/* 두 번째 행 */}
          <FlexBox direction="col" className="w-full bg-white p-4 mt-3 h-1/7 items-start"> 
            <h2 className="text-l font-bold mb-4 text-left">위치정보</h2>
            <p className="text-left">서울특별시 동작구</p>
            <button className="border border-gray-400 py-2 px-4 rounded-full hover:bg-gray-100 focus:outline-none ml-auto">위치변경</button>
          </FlexBox>


        
          {/* 세 번째 행 */}
          <FlexBox direction="col" className="w-full bg-white p-4 mt-3 h-full h-4/7 items-start"> 
            <h2 className="text-l font-bold mb-4 text-left">주변 수거함</h2>
            <img src="/search.png" alt="search img" className="w-24 mb-16" />
            <p className="text-xs text-gray-400 text-center">검색결과가 없어요</p>
            <p className="text-xs text-gray-400 text-center justify-center">다른 위치를 찾아보실래요?</p>
          </FlexBox>
      
        </FlexBox>
        
        {/* 두 번째 섹션 */}
        <FlexBox direction="col" className="w-3/4 bg-gray-300 p-4 h-full"> 
          <h2 className="text-xl font-bold mb-4">지도 부분</h2>
        </FlexBox>
      </FlexBox>
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
