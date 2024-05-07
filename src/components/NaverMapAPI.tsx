import { useEffect } from "react";
import { useAtom } from "jotai";
import { locationAtom } from "../global";

interface binData {
  id: number;
  longitude: number;
  latitude: number;
  address: string;
  type: string;
}

interface Props {
  bins: binData[];
}

function NaverMapAPI({ bins }: Props) {
  const [myLocation] = useAtom(locationAtom);

  useEffect(() => {
    if (!window.naver) return;

    if (typeof myLocation !== "string") {
      const mapOptions = {
        center: new window.naver.maps.LatLng(
          myLocation.latitude,
          myLocation.longitude
        ),
        zoom: 16,
      };

      // 지도 생성
      const localMap = new window.naver.maps.Map("map", mapOptions);
      // 사용자 위치에 마커 추가
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          myLocation.latitude,
          myLocation.longitude
        ),
        map: localMap,
        title: "Your Location",
      });

      bins.forEach((bin) => {
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(bin.latitude, bin.longitude),
          map: localMap,
          title: bin.type,
        });
      });

      return () => {
        localMap.destroy(); // 지도 인스턴스 제거
      };
    } else {
      console.log("네이버 지도 로딩");
    }
  }, [myLocation, bins]);

  return <div id="map" style={{ width: "100%", height: "1000px" }} />;
}

export default NaverMapAPI;
