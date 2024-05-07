import FlexBox from "../layout/FlexBox";
export default function Introduction() {
  return (
    <FlexBox
      direction="col"
      className="mb-4 font-bold p-5 rounded-lg bg-white w-full mt-8"
    >
      <FlexBox direction="row" className="w-full mb-8 max-w-xl">
        <img src="/note.svg" alt="icon" className="w-8 mr-2 mb-4" />
        <FlexBox direction="col" className="items-start">
          <p className="mb-1">환경을 위한 지도앱, BinFinder!</p>
          <p className="text-sm text-gray-400 mt-1">
            지도를 통해 주변 의류, 폐의약품, 폐건전지 수거함, 그리고 휴지통
            위치를 신속하게 확인하세요.
          </p>
        </FlexBox>
      </FlexBox>

      <FlexBox direction="row" className="w-full mb-8 max-w-xl">
        <img src="/icon.png" alt="icon" className="w-8 mr-2 mb-4" />
        <FlexBox direction="col" className="items-start">
          <p className="mb-1">
            의류 수거함은 못 입을 옷을 버리는 곳이 아니에요!
          </p>
          <p className="text-sm text-gray-400 mt-1">
            의류 수거함은 다른 사람이 입을 수 있는 상태의 옷만 버리는 곳이에요
          </p>
          <p className="text-sm text-gray-400 mt-1">
            찢어졌거나 오염이 심한 옷은 일반쓰레기(종량제봉투)로 버려요
          </p>
        </FlexBox>
      </FlexBox>

      <FlexBox direction="row" className="w-full mb-8 max-w-xl">
        <img src="/Group.png" alt="icon" className="w-8 mr-2 mb-4" />
        <FlexBox direction="col" className="items-start">
          <p className="mb-1">
            쓰레기를 재활용하듯, 의약품도 올바르게 버리는 방법이 있답니다!
          </p>
          <p className="text-sm text-gray-400 mt-1">
            모든 약은 포장지를 제거하고 약만 모아서 폐의약품 전용 수거함에
            배출해야해요!
          </p>
        </FlexBox>
      </FlexBox>

      <FlexBox direction="row" className="w-full mb-4 max-w-xl">
        <img src="/vector.png" alt="icon" className="w-8 mr-2 mb-4" />
        <FlexBox direction="col" className="items-start">
          <p className="mb-1">
            모든 폐건전지, 폐형광등, 보조배터리(충전식 포함)는 재활용이
            가능하고, 분리배출 해야 해요!
          </p>
          <p className="text-sm text-gray-400 mt-1">
            생활 폐기물과 함께 배출될 경우, 화재사고의 원인이 될 수 있어요
          </p>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
