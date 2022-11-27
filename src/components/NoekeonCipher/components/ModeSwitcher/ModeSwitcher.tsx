import React from "react";
import Swap from "../../../../assets/images/swap.svg";
import {AppContext} from "../../../../providers/AppContext";
import InfoIconBox from "../../../UI/InfoIconBox/InfoIconBox";
import {NoekeonContext} from "../../NoekeonProvider";
import content from "./content";
import {
	ModeSwitcherContainer,
	ModeTitle,
	SwitchButton
} from "./style";

const ModeSwitcher = () => {
	const {language} = React.useContext(AppContext);
	const lang = language || 'en';
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
			<ModeTitle>{mode === 'encrypt' ? content.plaintext[language] : content.ciphertext[language]}</ModeTitle>
			<section>
				<SwitchButton onClick={handleSwitch} ref={ButtonRef}><InfoIconBox src={Swap} alt='swap'/></SwitchButton>
			</section>
			<ModeTitle>{mode === 'encrypt' ? content.ciphertext[language] : content.plaintext[language]}</ModeTitle>
		</ModeSwitcherContainer>
	)
}


export default ModeSwitcher
