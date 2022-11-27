import styled from "styled-components";
import {Button} from "../../../UI/Button/Button";

const ModeTitle = styled.h5`
  font-size: ${({theme}) => theme.sizes.mainTextSize};
  font-weight: 600;
  color: ${({theme}) => theme.colors.systemText};
  transform: translateX(0);
  transition: all 0.4s linear;
`
const ModeSwitcherContainer = styled.div`
  border-radius: 16px 16px 0 0;
  width: 100%;
  height: 64px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  transition: all 0.4s linear;
  background: ${props => props.theme.colors.background};
  //center content in grid
  & > h5 {
    text-align: center;
  }


`

const SwitchButton = styled(Button)`
  margin-inline: auto;
  padding: 6px;
  //speed up animation
  transition: all 0.3s linear;
  //must be on center ModeSwitcherContainer
  margin-left: auto;

`

export {
	ModeTitle,
	ModeSwitcherContainer,
	SwitchButton
}
