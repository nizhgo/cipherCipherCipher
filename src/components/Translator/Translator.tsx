import React, {useEffect} from "react";
import styled from "styled-components";
import CloseIcon from '../../assets/images/close.svg';
import CopyIcon from '../../assets/images/copy.svg';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
interface TranslatorProps {

}
const Translator = () => {
	const [text, setText] = React.useState<string>('');
	const [translatedText, setTranslatedText] = React.useState<string>('');
	const [textAreaHeight, setTextAreaHeight] = React.useState<number>(0);
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const [isTyping, setIsTyping] = React.useState<boolean>(false);
	const { copied, copyToClipboard } = useCopyToClipboard();

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value)
	}
	useEffect(function () {
		if (textAreaRef.current) {
			textAreaRef.current.focus();
			//disable spellcheck
			textAreaRef.current.spellcheck = false;
		}}, []);

	    const translate = () => {
		setTranslatedText(text);
	}

		const handleCopy = () => {
			copyToClipboard(translatedText);
		}
		const handleClear = () => {
			setText('');
			setTranslatedText('');
		}
		const handleTranslate = (text: string) => {
			setTranslatedText(text);
		}

		//auto resize textarea height on text change
		useEffect(() => {
			if (textAreaRef.current) {
				textAreaRef.current.style.height = "auto";
				setTextAreaHeight(textAreaRef.current.scrollHeight);
			}
		}, [text]);

		//auto translate on stop typing for 0.6 second

		useEffect(() => {
			const handler = setTimeout(() => translate(), 600);
			return () => {
				clearTimeout(handler);
			};
		}
		, [text]);


		return (
			<TranslatorWrapper>
				<LefthandSide>
					<BoxContent>
						<TranslatorInput placeholder='Enter text to translate' value={text} onChange={handleTextChange}
						                 ref={textAreaRef} style={{height: textAreaHeight}}/>
						<Info>
							<section onClick={handleClear}><InfoIcon src={CloseIcon}/></section>
							<p>{text.length}</p>
						</Info>
					</BoxContent>
				</LefthandSide>
				<RighthandSide>
					<BoxContent>
						<TranslatorInput placeholder='Translated text will appear here' value={translatedText}
						                 onChange={(e) => handleTextChange(e)} style={{height: textAreaHeight}}/>
						<Info>
							<section onClick={handleClear}><InfoIcon src={CloseIcon}/></section>
							<section onClick={handleCopy}><InfoIcon src={CopyIcon}/></section>
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

const InfoIcon = styled.img`
  	width: 22px;
  	height: 22px;
  	cursor: pointer;
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


