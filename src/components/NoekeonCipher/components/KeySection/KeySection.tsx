import React, {
	useContext,
	useEffect
} from "react";
import styled from "styled-components";
import {AppContext} from "../../../../providers/AppContext";
import {content} from "./content";
import CopyIcon from '../../../../assets/images/copy.svg';
import {GenerateKey} from "../../scripts/NoekeonEncDec";
import {NoekeonContext} from "../../NoekeonProvider";

import {
	Button,
} from "../../../UI/Button/Button";
import InfoIconBox from "../../../UI/InfoIconBox";

const KeySection = () => {
	const {setKey, key} = useContext(NoekeonContext);
	const {language, setLanguage} = React.useContext(AppContext);
	const lang: 'ru' | 'en' = language || 'en';

	const keyGen = () => {
		let newKey = GenerateKey();
		//key to base-16
		const key16 = new Uint8Array(newKey).reduce((data, byte) => data + byte.toString(16).padStart(2, '0'), '');
		setKey(key16);
	}

	useEffect(() => {
		keyGen();
	}, []);

	const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKey(e.target.value);
	}

	const handleKeyCopy = () => {
		navigator.clipboard.writeText(key);
	}

	const handleKeyGenerate = () => {
		keyGen();
	}
	return (
		<KeySectionWrapper>
			<KeySectionInfo>
			<Title>{content.active_key[lang]}</Title>
			<Input value={key} onChange={handleKeyChange}/>
			<InfoIconBox src={CopyIcon} onClick={handleKeyCopy}/>
			</KeySectionInfo>
			<Button isActive={true} onClick={handleKeyGenerate}>{content.generate_new_key[lang]}</Button>
		</KeySectionWrapper>
	)
}

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


export default KeySection;
