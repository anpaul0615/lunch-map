import React from 'react';
import Styled from '@emotion/styled';
import CSS from "csstype";

/* Component Style */
const Wrapper = Styled.div<{ customStyle: CSS.Properties; }>`
  flex: ${p => p.customStyle.flex ?? '1'};
  width: ${p => p.customStyle.width ?? '100%'};
  height: ${p => p.customStyle.height ?? '100%'};
  margin: ${p => p.customStyle.margin};
  padding: ${p => p.customStyle.padding};
  box-sizing: border-box;

  border: ${p => p.customStyle.border};
  border-radius: ${p => p.customStyle.borderRadius};
  background: ${p => p.customStyle.background};
`;

/* Component Props/State */
type Props = {
  customStyle?: CSS.Properties;
  children: React.ReactNode;
};

/* Component */
function FlexBox({ customStyle = {}, children }: Props) {
  return (
    <Wrapper customStyle={customStyle}>
      {children}
    </Wrapper>
  );
}

export default FlexBox;
