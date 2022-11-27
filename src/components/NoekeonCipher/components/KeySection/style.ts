import styled from "styled-components";

const KeySectionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.sizes.mobileBreakpoint}) {
    flex-direction: column;
    justify-items: center;
    align-items: center;

    gap: 24px;
    padding: 16px 0;
  }
`
const Title = styled.h5`
  color: ${props => props.theme.colors.systemText};
  font-size: ${props => props.theme.sizes.mainTextSize};
  font-weight: 600;
  font-family: inherit;
  line-height: ${props => props.theme.sizes.mainTextSize};
  transition: all 0.4s linear;
`

const KeySectionInfo = styled.section`
  display: flex;
  align-items: center;
  gap: 14px;

`

const Input = styled.input`
  text-align: center;
  border: none;
  background: none;
  padding: 5px 4px;
  font-size: ${props => props.theme.sizes.stytemTextSize};
  color: ${props => props.theme.colors.text};
  cursor: text;
  font-family: inherit;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: all 0.4s linear;
`;

export {
	KeySectionWrapper,
	Title,
	KeySectionInfo,
	Input
}
