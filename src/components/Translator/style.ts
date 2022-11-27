import styled from "styled-components";

const TranslatorWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${props => props.theme.sizes.mobileBreakpoint}) {
    display: flex;
    flex-direction: column;
  }
`


const BoxContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 32px;
`

const TranslatorInput = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 128px;
  resize: none;
  scrollbar-width: none;
  color: ${props => props.theme.colors.text};
  background: none;
  font-size: ${props => props.theme.sizes.mainTextSize};
  font-weight: 500;
  font-family: inherit;
  line-height: 1.5;
  transition: all 0.4s linear;

  &:focus {
    outline: none;
  }


`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.text};
  padding: 31px 10px;
  width: 100%;
  transition: all 0.4s linear;
    // border: 0.5px solid ${props => props.theme.colors.border};
`

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
`


const LefthandSide = styled(Box)`
  background-color: ${props => props.theme.colors.background};
`

const RighthandSide = styled(Box)`
  background-color: ${props => props.theme.colors.primary};
`


export {
	TranslatorWrapper,
	BoxContent,
	TranslatorInput,
	Box,
	Info,
	LefthandSide,
	RighthandSide
}
