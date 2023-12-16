import styled from "styled-components";

export const AbstractLayer = styled.div<{
  zIndex: number;
  isDimmed: boolean;
}>`
  position: absolute;
  top: 0;

  width: 100vw;
  height: 100vh;

  background: ${({ isDimmed }) =>
    isDimmed ? "rgba(0,0,0,0.25)" : "transparent"};

  z-index: ${({ zIndex }) => zIndex};
`;
