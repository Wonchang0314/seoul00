import FlexBox from "../layout/FlexBox";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { SearchOutlined } from "@ant-design/icons";
import { Layout, Button, Input } from "antd";

export default function MapScreen() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" className="shadow-md" width={288}>
        <div className="flex flex-col items-center p-4 w-72">
          <img src="/LOGO.png" alt="team logo" className="w-40 my-4" />
          <div className="w-full relative">
            <Input
              type="text"
              placeholder="ex) 서울특별시 강남구"
              className="p-3 pl-3 pr-10 rounded-lg border border-2 border-blue-500"
            />
            <Button
              icon={<SearchOutlined />}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              style={{
                border: "none",
                background: "transparent",
                boxShadow: "none",
              }}
            />
          </div>
          <FlexBox direction="row" className="mt-4 justify-between w-full">
            <button className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none">
              전체
            </button>
            <button className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none">
              <img
                src="/trash.svg.png"
                alt="Trash"
                className="inline-block mr-2 w-5 h-5"
              />
              휴지통
            </button>
            <button className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none">
              <img
                src="/icon.png"
                alt="Trash"
                className="inline-block mr-2 w-5 h-5"
              />
              의류수거함
            </button>
          </FlexBox>
          <FlexBox direction="row" className="mt-4 mb-4">
            <button className="mr-4 rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none">
              <img
                src="/Group.png"
                alt="Trash"
                className="inline-block mr-2 w-5 h-5"
              />
              폐의약품
            </button>
            <button className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none">
              <img
                src="/icon.png"
                alt="Trash"
                className="inline-block mr-2 w-5 h-5"
              />
              폐건전지
            </button>
          </FlexBox>
          <div className="w-72 border-t-4 border-gray-100 my-2"></div>

          <FlexBox direction="row" className="w-full justify-between">
            <FlexBox direction="col">
              <h2 className="mr-12 mb-1 text-l font-bold">위치정보</h2>
              <p>서울특별시 동작구</p>
            </FlexBox>
            <button className="ml-8 border border-gray-400 py-2 px-2 rounded-full hover:bg-gray-100 focus:outline-none">
              위치변경
            </button>
          </FlexBox>
          <div className="w-72 border-t-4 border-gray-100 my-2"></div>
          <div className="w-full">
            <h2 className="text-l font-bold text-left">주변 수거함</h2>
          </div>
          <FlexBox direction="col" className="w-full mt-12">
            <img src="/not-found.png" alt="search img" className="w-24 mb-8" />
            <p className="text-xs text-gray-400 text-center">
              검색결과가 없어요
            </p>
            <p className="text-xs text-gray-400 text-center justify-center">
              다른 위치를 찾아보실래요?
            </p>
          </FlexBox>
        </div>
      </Sider>
      {/* 나머지 레이아웃 컴포넌트 */}
    </Layout>
  );
}
