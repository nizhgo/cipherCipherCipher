import CryptoJS from "crypto-js";
import React, {
	useContext,
	useEffect
} from "react";
import CloseIcon from '../../assets/images/close.svg';
import CopyIcon from '../../assets/images/copy.svg';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import {NoekeonContext} from "../NoekeonCipher/NoekeonProvider";
import InfoIconBox from "../UI/InfoIconBox/InfoIconBox";
import {
	BoxContent,
	Info,
	LefthandSide,
	RighthandSide,
	TranslatorInput,
	TranslatorWrapper
} from "./style";


const Translator = () => {
	const {key, mode, leftText, setLeftText, rightText, setRightText} = useContext(NoekeonContext);
	const leftPanelRef = React.useRef<HTMLTextAreaElement>(null);
	const rightPanelRef = React.useRef<HTMLTextAreaElement>(null);
	const { copied, copyToClipboard } = useCopyToClipboard();;
	const isEncrypt = mode === 'encrypt';
	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setLeftText(e.target.value)
	}


	useEffect(function () {
		if (leftPanelRef.current && rightPanelRef.current) {
			leftPanelRef.current.focus();
			rightPanelRef.current.spellcheck = false;
			leftPanelRef.current.spellcheck = false;
		}}, []);

	    const translate = () => {
			//isEncrypt ? setTranslatedText(EncryptUTF8(text, NoekeonKey)) : setTranslatedText(DecryptBase64(text, NoekeonKey));
		    isEncrypt ? setRightText(CryptoJS.AES.encrypt(leftText, key).toString()) : setRightText(CryptoJS.AES.decrypt(leftText, key).toString(CryptoJS.enc.Utf8));
	}


		const handleCopy = () => {
			copyToClipboard(rightText);
		}
		const handleClear = () => {
			setLeftText('');
			setRightText('');
		}
		//auto resize textarea height on text change
		useEffect(() => {
			if (leftPanelRef.current && rightPanelRef.current) {
				leftPanelRef.current.style.height = "auto";
				rightPanelRef.current.style.height = "auto";
				let height; //set heighest textarea height to other textarea (min height 128px)
				if (leftPanelRef.current.scrollHeight > rightPanelRef.current.scrollHeight) {
					height = leftPanelRef.current.scrollHeight;
				}
				else {
					height = rightPanelRef.current.scrollHeight;
				}
				if (height < 128) {
					height = 128;
				}
				leftPanelRef.current.style.height = height + "px";
				rightPanelRef.current.style.height = height + "px";
				// setTextAreaHeight(height);
			}
		}, [leftText, rightText]);

		//auto translate on stop typing for 0.6 second

		useEffect(() => {
			const handler = setTimeout(() => translate(), 600);
			return () => {
				clearTimeout(handler);
			};
		}
		, [leftText, key]);


		return (
			<TranslatorWrapper>
				<LefthandSide>
					<BoxContent>
						<TranslatorInput placeholder='Enter text to translate' value={leftText} onChange={handleTextChange}
						                 ref={leftPanelRef}/>
						<Info>
							<section onClick={handleClear}><InfoIconBox src={CloseIcon}/></section>
							<p>{leftText.length}</p>
						</Info>
					</BoxContent>
				</LefthandSide>
				<RighthandSide>
					<BoxContent>
						<TranslatorInput placeholder='Translated text will appear here' ref={rightPanelRef} value={rightText}
						                 onChange={(e) => handleTextChange(e)}/>
						<Info>
							<section onClick={handleClear}><InfoIconBox src={CloseIcon}/></section>
							<section onClick={handleCopy}><InfoIconBox src={CopyIcon}/></section>
						</Info></BoxContent>
				</RighthandSide>
			</TranslatorWrapper>

		)
	}

	export default Translator





