import React, { useEffect, useState } from "react";
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
      const userMarker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          myLocation.latitude,
          myLocation.longitude
        ),
        map: localMap,
        title: "Your Location",
      });

      if (bins.length > 0) {
        console.log(bins);
        bins.forEach((bin) => {
          // 데이터 세트에서 위도와 경도 순서 확인 후 적용
          const position = new window.naver.maps.LatLng(
            bin.latitude,
            bin.longitude
          );

          const marker = new window.naver.maps.Marker({
            position,
            map: localMap,
            title: bin.type,
          });
        });
        // bins 데이터를 기반으로 마커 추가
      }

      return () => {
        userMarker.setMap(null); // 컴포넌트 언마운트 시 마커 제거
        localMap.destroy(); // 지도 인스턴스 제거
      };
    } else {
      console.log("네이버 맵 로딩 실패");
    }
  }, [myLocation, bins]);

  return <div id="map" style={{ width: "100%", height: "1000px" }} />;
}

export default NaverMapAPI;
