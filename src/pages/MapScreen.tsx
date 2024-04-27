import React from 'react';
import FlexBox from '../layout/FlexBox'
import GridBox from '../layout/GridBox';

function SearchResults() {
  // 가상의 검색 결과 데이터
  const searchResults = [
    { id: 1, name: 'Result 1' },
    { id: 2, name: 'Result 2' },
    { id: 3, name: 'Result 3' },
    // 추가적인 검색 결과 데이터...
  ];

  return (
    <FlexBox direction="row">
      {/* 왼쪽 열 - 검색창 */}
      <GridBox col={1}>
        <input type="text" placeholder="검색어를 입력하세요" />
        <div>
          {searchResults.map(result => (
            <div key={result.id}>{result.name}</div>
          ))}
        </div>
      </GridBox>

      {/* 오른쪽 열 - 지도 */}
      <GridBox col={1}>
        {/* 지도 컴포넌트를 여기에 추가 */}
        <div>지도 컴포넌트</div>
      </GridBox>
    </FlexBox>
  );
}

export default SearchResults;

