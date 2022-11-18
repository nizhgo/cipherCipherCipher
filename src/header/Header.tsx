import React from "react";
import styled from "styled-components";
import AppLogo from "../assets/images/logo.svg"
import StateSwitcher from "../components/stateSwutcher/StateSwitcher";
import {AppContext} from "../providers/AppContext";
import StateSwitcherProps from "../components/stateSwutcher/interfaces";
import {content} from "./content";
const Header = () => {
	const {theme, setTheme} = React.useContext(AppContext);
	const themeSwitcher: StateSwitcherProps = {
		title: content.themeSwitcher.title['en'],
		options: content.themeSwitcher.options['en'],
		onChange: (option: string) => setTheme(option),
		selected: theme
	}
  return (
	  	<HeaderContainer>
		    <LogoImg src={AppLogo} alt="logo"/>
		    <StateSwitcher {...themeSwitcher}/>
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

const LogoImg = styled.img`
	width: 208px;
	height: 40px;
  	filter: ${props => props.theme.theme === "light" ? "invert(0)" : "invert(1)"};
  	transition: all 0.4s linear;
	`

