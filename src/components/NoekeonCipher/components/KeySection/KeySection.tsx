import React, {
	useContext,
	useEffect
} from "react";
import CopyIcon from '../../../../assets/images/copy.svg';
import {AppContext} from "../../../../providers/AppContext";

import {Button,} from "../../../UI/Button/Button";
import InfoIconBox from "../../../UI/InfoIconBox/InfoIconBox";
import {NoekeonContext} from "../../NoekeonProvider";
import {GenerateKey} from "../../scripts/NoekeonEncDec";
import {content} from "./content";
import {
	Input,
	KeySectionInfo,
	KeySectionWrapper,
	Title
} from "./style";

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


export default KeySection;
