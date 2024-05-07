import FlexBox from "../layout/FlexBox";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { Button, Input, Layout } from "antd";
import NaverMapAPI from "../components/NaverMapAPI";
import NotFound from "../components/NotFound";
import { isMobileAtom, locationAtom } from "../global";
import { SearchOutlined } from "@ant-design/icons";
import "../styles/swipper.css";
import searchItems from "../API/SearchItems";
import locationBasedSearch from "../API/LocationBasedSearch";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";

interface binData {
  id: number;
  longitude: number;
  latitude: number;
  address: string;
  type: string;
}

export default function MapScreen() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [binsData, setBinsData] = useState<binData[]>([]);
  const [aroundBins, setAroundBins] = useState<binData[]>([]);
  const [myLocation, setMyLocation] = useAtom(locationAtom);
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);
  const [siderVisible, setSiderVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const types = [
    "CLOTHES",
    "STREET_TRASH",
    "BATTERY",
    "MEDICINE",
    "FLUORESCENT",
  ];
  const getTypeText = (type: string) => {
    switch (type) {
      case "CLOTHES":
        return "의류수거함";
      case "STREET_TRASH":
        return "가로휴지통";
      case "BATTERY":
        return "폐건전지 수거함";
      case "MEDICINE":
        return "폐의약품 수거함";
      case "FLUORESCENT":
        return "폐형광등 수거함";
      default:
        return "";
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleTypeSelected = (type: string) => {
    setSelectedType(type === "ALL" ? "ALL" : type);
  };

  const searchNearByBins = async () => {
    try {
      if (typeof myLocation !== "string") {
        const response = await locationBasedSearch({
          radius: 1,
          longitude: myLocation.longitude,
          latitude: myLocation.latitude,
        });
        const binsDataWithIds: binData[] = response.data.map((item, index) => ({
          id: index + 1,
          longitude: item.latitude,
          latitude: item.longitude,
          address: item.address,
          type: item.type,
        }));
        setBinsData(binsDataWithIds);
      }
    } catch (error) {
      console.error("Failed to fetch and update bins data:", error);
    }
  };

  useEffect(() => {
    searchNearByBins();
  }, [myLocation]);

  const filteredBinsData = useMemo(() => {
    if (selectedType === "ALL" || selectedType === "") {
      return binsData;
    } else {
      return binsData.filter((bin) => bin.type === selectedType);
    }
  }, [binsData, selectedType]);

  const handleSearch = async () => {
    if (input.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    const fetchPromises = types.map((type) =>
      searchItems({
        keyWord: input,
        page: 1,
        types: [type],
      })
    );
    try {
      const results = await Promise.all(fetchPromises);
      const combinedData = results.reduce<binData[]>((acc, result) => {
        if (result && result.content) {
          return [...acc, ...result.content];
        }
        return acc;
      }, []);

      setBinsData(combinedData);
      setCurrentLocation("서울특별시 " + input + "구");
    } catch (error) {
      console.error("검색 결과를 불러오는 데 실패했습니다.", error);
    }
  };

  const findMyLocation = () => {
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
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSider = () => {
    if (isMobile) {
      setSiderVisible(!siderVisible);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isMobile ? (
        <div
          className={`sider-container ${siderVisible ? "" : "sider-hidden"}`}
        >
          <Sider theme="light" className="shadow-md h-full" width={288}>
            <div className="flex flex-col items-center p-4 w-72">
              <img src="/LOGO.png" alt="team logo" className="w-40 my-4" />
              <div className="w-full relative">
                <Input
                  type="text"
                  placeholder="ex) 강남"
                  value={input}
                  onChange={handleInputChange}
                  className="p-3 pl-3 pr-10 rounded-lg border border-2 border-blue-500"
                />
                <Button
                  icon={<SearchOutlined />}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleSearch}
                  style={{
                    border: "none",
                    background: "transparent",
                    boxShadow: "none",
                  }}
                />
              </div>

              <FlexBox direction="col" className="w-full">
                <FlexBox
                  direction="row"
                  className="mt-4 justify-between w-full"
                >
                  <button
                    className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleTypeSelected("ALL")}
                  >
                    전체
                  </button>
                  <button
                    className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleTypeSelected("STREET_TRASH")}
                  >
                    <img
                      src="/trash.svg.png"
                      alt="Trash"
                      className="inline-block mr-2 w-5 h-5"
                    />
                    휴지통
                  </button>
                  <button
                    className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleTypeSelected("CLOTHES")}
                  >
                    <img
                      src="/icon.png"
                      alt="Trash"
                      className="inline-block mr-2 w-5 h-5"
                    />
                    의류수거함
                  </button>
                </FlexBox>
                <FlexBox
                  direction="row"
                  className="mt-4 mb-4 justify-between w-full"
                >
                  <button
                    className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleTypeSelected("MEDICINE")}
                  >
                    <FlexBox direction="row">
                      <img
                        src="/Group.png"
                        alt="Trash"
                        className="inline-block mr-2 w-5 h-5"
                      />
                      <p style={{ fontSize: "0.7rem" }}>폐의약품</p>
                    </FlexBox>
                  </button>
                  <button
                    className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleTypeSelected("BATTERY")}
                  >
                    <FlexBox direction="row">
                      <img
                        src="/Battery.png"
                        alt="Trash"
                        className="inline-block mr-2 w-5 h-5"
                      />
                      <p style={{ fontSize: "0.7rem" }}>폐건전지</p>
                    </FlexBox>
                  </button>
                  <button
                    className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleTypeSelected("FLUORESCENT")}
                  >
                    <FlexBox direction="row">
                      <img
                        src="/Vector.png"
                        alt="Trash"
                        className="inline-block mr-2 w-5 h-5"
                      />
                      <p style={{ fontSize: "0.7rem" }}>폐형광등</p>
                    </FlexBox>
                  </button>
                </FlexBox>
              </FlexBox>

              <div className="w-72 border-t-4 border-gray-100 my-2"></div>

              <FlexBox direction="row" className="w-full justify-between">
                <FlexBox direction="col">
                  <h2 className="mr-12 mb-1 text-l font-bold">위치정보</h2>
                  <p>{currentLocation}</p>
                </FlexBox>
                <button
                  className="ml-8 border border-gray-400 py-2 px-2 rounded-full hover:bg-gray-100 focus:outline-none"
                  onClick={findMyLocation}
                >
                  현 위치에서 찾기
                </button>
              </FlexBox>
              <div className="w-72 border-t-4 border-gray-100 my-2"></div>
              <div className="w-full">
                <h2 className="text-l font-bold text-left">주변 수거함</h2>
              </div>

              <FlexBox
                direction="col"
                className="w-full mt-2 overflow-y-scroll max-h-[calc(100vh-200px)]"
              >
                {filteredBinsData.length > 0 ? (
                  filteredBinsData.map((bin) => (
                    <div
                      key={bin.id}
                      className="border border-gray-300 p-3 rounded-md mt-3"
                    >
                      <FlexBox direction="row" className="items-center">
                        <img src="/Rectangle.png" className="w-1/3" />
                        <img
                          src="/site.png"
                          alt=""
                          className="inline-block mt-5 mr-2 ml-2 w-4 h-4"
                        />
                        <FlexBox direction="col" className="items-start ml-2">
                          <p className="font-bold text-l">
                            {getTypeText(bin.type)}
                          </p>
                          <p>{bin.address}</p>
                        </FlexBox>
                      </FlexBox>
                    </div>
                  ))
                ) : (
                  <NotFound />
                )}
              </FlexBox>
            </div>
          </Sider>
        </div>
      ) : (
        <Sider theme="light" className="shadow-md" width={288}>
          <div className="flex flex-col items-center p-4 w-72">
            <button onClick={goToHome}>
              <img src="/LOGO.png" alt="team logo" className="w-40 my-4" />
            </button>
            <div className="w-full relative">
              <Input
                type="text"
                placeholder="ex) 강남"
                value={input}
                onChange={handleInputChange}
                className="p-3 pl-3 pr-10 rounded-lg border border-2 border-blue-500"
              />
              <Button
                icon={<SearchOutlined />}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={handleSearch}
                style={{
                  border: "none",
                  background: "transparent",
                  boxShadow: "none",
                }}
              />
            </div>
            <FlexBox direction="col" className="w-full">
              <FlexBox direction="row" className="mt-4 justify-between w-full">
                <button
                  className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                  onClick={() => handleTypeSelected("ALL")}
                >
                  전체
                </button>
                <button
                  className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                  onClick={() => handleTypeSelected("STREET_TRASH")}
                >
                  <img
                    src="/trash.svg.png"
                    alt="Trash"
                    className="inline-block mr-2 w-5 h-5"
                  />
                  휴지통
                </button>
                <button
                  className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                  onClick={() => handleTypeSelected("CLOTHES")}
                >
                  <img
                    src="/icon.png"
                    alt="Trash"
                    className="inline-block mr-2 w-5 h-5"
                  />
                  의류수거함
                </button>
              </FlexBox>
              <FlexBox
                direction="row"
                className="mt-4 mb-4 justify-between w-full"
              >
                <button
                  className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                  onClick={() => handleTypeSelected("MEDICINE")}
                >
                  <FlexBox direction="row">
                    <img
                      src="/Group.png"
                      alt="Trash"
                      className="inline-block mr-2 w-5 h-5"
                    />
                    <p style={{ fontSize: "0.7rem" }}>폐의약품</p>
                  </FlexBox>
                </button>
                <button
                  className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                  onClick={() => handleTypeSelected("BATTERY")}
                >
                  <FlexBox direction="row">
                    <img
                      src="/Battery.png"
                      alt="Trash"
                      className="inline-block mr-2 w-5 h-5"
                    />
                    <p style={{ fontSize: "0.7rem" }}>폐건전지</p>
                  </FlexBox>
                </button>
                <button
                  className="rounded-full bg-white border border-gray-400 py-2 px-2 hover:bg-gray-300 focus:outline-none"
                  onClick={() => handleTypeSelected("FLUORESCENT")}
                >
                  <FlexBox direction="row">
                    <img
                      src="/Vector.png"
                      alt="Trash"
                      className="inline-block mr-2 w-5 h-5"
                    />
                    <p style={{ fontSize: "0.7rem" }}>폐형광등</p>
                  </FlexBox>
                </button>
              </FlexBox>
            </FlexBox>

            <div className="w-72 border-t-4 border-gray-100 my-2"></div>

            <FlexBox direction="row" className="w-full justify-between">
              <FlexBox direction="col">
                <h2 className="mr-12 mb-1 text-l font-bold">위치정보</h2>
                <p>{currentLocation}</p>
              </FlexBox>
              <button className="ml-8 border border-gray-400 py-2 px-2 rounded-full hover:bg-gray-100 focus:outline-none">
                현 위치에서 찾기
              </button>
            </FlexBox>
            <div className="w-72 border-t-4 border-gray-100 my-2"></div>
            <div className="w-full">
              <h2 className="text-l font-bold text-left">주변 수거함</h2>
            </div>

            <FlexBox
              direction="col"
              className="w-full mt-2 overflow-y-scroll max-h-[calc(100vh-200px)]"
            >
              {filteredBinsData.length > 0 ? (
                filteredBinsData.map((bin) => (
                  <div
                    key={bin.id}
                    className="border border-gray-300 p-3 rounded-md mt-3"
                  >
                    <FlexBox direction="row" className="items-center">
                      <img src="/Rectangle.png" className="w-1/3" />
                      <img
                        src="/site.png"
                        alt=""
                        className="inline-block mt-5 mr-2 ml-2 w-4 h-4"
                      />
                      <FlexBox direction="col" className="items-start ml-2">
                        <p className="font-bold text-l">
                          {getTypeText(bin.type)}
                        </p>
                        <p>{bin.address}</p>
                      </FlexBox>
                    </FlexBox>
                  </div>
                ))
              ) : (
                <NotFound />
              )}
            </FlexBox>
          </div>
        </Sider>
      )}
      {isMobile && (
        <button className="swiper-button" onClick={toggleSider}>
          {siderVisible ? ">" : "<"}
        </button>
      )}
      <NaverMapAPI bins={filteredBinsData} />
    </Layout>
  );
}
