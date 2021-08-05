import React from 'react';
import Styled from '@emotion/styled';

/* Component Style */
const Wrapper = Styled.div({
  height: '100%',
});
const CalendarRankingWrapper = Styled.div({
  height: '50%',
});
const TotalRankingWrapper = Styled(CalendarRankingWrapper)();

/* Component */
function RankingPanel() {
  return (
    <Wrapper>
      <CalendarRankingWrapper>
        기준일자 식당 랭킹
      </CalendarRankingWrapper>
      <TotalRankingWrapper>
        전체 식당 랭킹
      </TotalRankingWrapper>
    </Wrapper>
  );
}

export default RankingPanel;
