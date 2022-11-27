import styled from "styled-components";

const HeaderContainer = styled.div`
  padding: 16px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`

const MenuToggleContainer = styled.div`
  z-index: 4;
  padding: 10px;
  cursor: pointer;
  transition: all 0.4s linear;
  filter: ${props => props.theme === 'dark' ? 'invert(1)' : 'invert(0)'};
  display: none;
  //if props.theme.sizes.mobile is true, then show
  @media (max-width: ${props => props.theme.sizes.mobileWidth}) {
    display: block;
  }
`

const LogoImg = styled.img`
  width: 196px;
  height: 30px;
  filter: ${props => props.theme.title === "light" ? "invert(0)" : "invert(1)"};
  transition: all 0.4s linear;
`

const MobileWrapper = styled.div`
  @media (max-width: ${props => props.theme.sizes.mobileWidth}) {
    display: none;
  }
`

const DropdownMenu = styled.div<{ isVisible: boolean }>`
  transform: ${props => props.isVisible ? "translateY(0)" : "translateY(-100%)"};
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 10px;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  transition: all 0.4s linear;
  height: 322px;
  //transition: transform 0.2s cubic-bezier(.65,.05,.36,1),opacity 0s,visibility 0s;
  border-bottom: 1px solid ${props => props.theme.colors.border};

`;


export {
	HeaderContainer,
	MenuToggleContainer,
	LogoImg,
	MobileWrapper,
	DropdownMenu
}
