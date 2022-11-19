import React from "react";
import styled from "styled-components";
import {preview} from "vite";
import AppLogo from "../assets/images/logo.svg"
import MenuToggle from "../components/MenuToggle/MenuToggle";
import StateSwitcher from "../components/SateSwitcher/StateSwitcher";
import {AppContext} from "../providers/AppContext";
import StateSwitcherProps from "../components/SateSwitcher/interfaces";
import {content} from "./content";
const Header = () => {
	const {theme, setTheme, language, setLanguage} = React.useContext(AppContext);
	const [lang, setLang] = React.useState<'ru' | 'en'>(language || 'en');
	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
	const themeSwitcher: StateSwitcherProps = {
		title: content.themeSwitcher.title[lang],
		options: [{title: content.themeSwitcher.options.light[lang],
					onClick: () => setTheme('light'), value:'light'},
			{title: content.themeSwitcher.options.auto[lang],
				onClick: () => setTheme('auto'), value:'auto'},
			{title: content.themeSwitcher.options.dark[lang],
				onClick: () => setTheme('dark'), value:'dark'}],
		selected: theme
	}
	const langSwitcher: StateSwitcherProps = {
		title: content.langSwitcher.title[lang],
		options: [{title: content.langSwitcher.options.rus[lang],
			onClick: () => setLang('ru'), value:'ru'},
			{title: content.langSwitcher.options.eng[lang],
				onClick: () => setLang('en'), value:'en'}],
		selected: lang
	}
  return (
	  	<HeaderContainer>
		    <LogoImg src={AppLogo} alt="logo"/>
		    <MobileWrapper>
		    <StateSwitcher {...themeSwitcher}/>
		    </MobileWrapper>
		    <MenuToggleContainer onClick={() => setIsMenuOpen(!isMenuOpen)}>
		    <MenuToggle/>
			    		    </MenuToggleContainer>
		    <DropdownMenu isVisible={isMenuOpen}>
			    <LogoImg src={AppLogo} alt="logo"/>
			    <StateSwitcher {...themeSwitcher}/>
			    <StateSwitcher {...langSwitcher}/>
		    </DropdownMenu>
	    </HeaderContainer>
  )
}

export default Header



const HeaderContainer = styled.div`
	margin-top: 20px;
	width: 100%;
  	display: flex;
  	justify-content: space-between;
  	align-items: center;
  	flex-shrink: 0;
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
  	filter: ${props => props.theme.theme === "light" ? "invert(0)" : "invert(1)"};
  	transition: all 0.4s linear;
	`

const MobileWrapper = styled.div`
  @media (max-width: ${props => props.theme.sizes.mobileWidth}) {
    display: none;
  }
  `

const DropdownMenu = styled.div<{isVisible: boolean}>`
    transform: ${props => props.isVisible ? "translateY(0)" : "translateY(-100%)"};
  	position: fixed;
  	z-index: 2;
  	top: 0;
  	left: 0;
  	right: 0;
  	padding: 20px 5px;
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
