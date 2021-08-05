import React from 'react';

import FlexBoxWrapper from './components/Layout/FlexBoxWrapper';
import FlexBox from './components/Layout/FlexBox';

/* AppTemplate */
type TemplateParams = {
  mapPanel: JSX.Element;
  calendarPanel: JSX.Element;
  rankingPanel: JSX.Element;
};
function AppTemplate({ mapPanel, calendarPanel, rankingPanel }: TemplateParams) {
  return (
    <FlexBoxWrapper customStyle={{ width: '100vw', height: '100vh' }}>
      <FlexBox customStyle={{ flex: '0.8' }}>
        {mapPanel}
      </FlexBox>
      <FlexBox customStyle={{ flex: '0.2' }}>
        <FlexBox customStyle={{ height: '25%' }}>
          {calendarPanel}
        </FlexBox>
        <FlexBox customStyle={{ height: '75%' }}>
          {rankingPanel}
        </FlexBox>
      </FlexBox>
    </FlexBoxWrapper>
  );
}

export default AppTemplate;
