import FlexBox from "../layout/FlexBox";

export default function NotFound() {
  return (
    <FlexBox direction="col" className="w-full mt-12">
      <img src="/not-found.png" alt="search img" className="w-24 mb-8" />
      <p className="text-xs text-gray-400 text-center">검색결과가 없어요</p>
      <p className="text-xs text-gray-400 text-center justify-center">
        다른 위치를 찾아보실래요?
      </p>
    </FlexBox>
  );
}
