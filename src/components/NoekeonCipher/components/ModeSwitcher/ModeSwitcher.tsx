import React from "react";
import styled from "styled-components";
import {Button} from "../../../UI/Button/Button";
import {NoekeonContext} from "../../NoekeonProvider";
import Swap from "../../../../assets/images/swap.svg";
import InfoIconBox from "../../../UI/InfoIconBox";

const ModeSwitcher = () => {
	const {mode, setMode, leftText, setLeftText, rightText, setRightText} = React.useContext(NoekeonContext);
	const ButtonRef = React.useRef<HTMLButtonElement>(null);
	//then click on button rotate it 180deg on 0.2s
	const rotateButton = () => {
		//just add on rotate 180deg % 360deg
		if (ButtonRef.current) {
			if (ButtonRef.current.style.transform === "rotate(180deg)") {
				ButtonRef.current.style.transform = "rotate(0deg)";
			}
			else {
				ButtonRef.current.style.transform = "rotate(180deg)";
			}
		}
	}
	const handleSwitch = () => {
		rotateButton();
		setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
		//swap text
		setLeftText(rightText);
		setRightText(leftText);
	}
	return(
		<ModeSwitcherContainer>
				<ModeTitle>{mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}</ModeTitle>
			<section>
			<SwitchButton onClick={handleSwitch} ref={ButtonRef}><InfoIconBox src={Swap} alt="swap"/></SwitchButton>
			</section>
				<ModeTitle>{mode === 'encrypt' ? 'Decrypt' : 'Encrypt'}</ModeTitle>
		</ModeSwitcherContainer>
	)
}

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
  & > h5{
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

export default ModeSwitcher
