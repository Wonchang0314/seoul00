import FlexBox from "../layout/FlexBox";
export default function Footer() {
  return (
    <div className="bg-gray-100 w-full items-start">
      <FlexBox className="mt-16 w-1/2 ml-12">
        <img src="/LOGO.png" alt="team logo" className="w-24 mb-16" />
        <FlexBox
          direction="col"
          className="mt-8 items-start justify-between ml-8"
        >
          <p className="text-sm mb-2 mr-2">TEAM NAME: Binfinder</p>
          <p className="text-sm mb-16 text-gray-400">
            Title email: https://data.seoul.go.kr
          </p>
        </FlexBox>
      </FlexBox>
    </div>
  );
}
