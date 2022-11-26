import React, {
	useContext,
	useEffect
} from "react";
import styled from "styled-components";
import CloseIcon from '../../assets/images/close.svg';
import CopyIcon from '../../assets/images/copy.svg';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import {Button} from "../UI/Button/Button";
import InfoIconBox from "../UI/InfoIconBox";
import {EncryptUTF8, DecryptBase64} from "../NoekeonCipher/scripts/NoekeonEncDec";
import CryptoJS from "crypto-js";
import {NoekeonContext} from "../NoekeonCipher/NoekeonProvider";


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





