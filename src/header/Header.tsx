import React from "react";
import AppLogo from "../assets/images/logo.svg"
import LangSwitcher from "../components/LangSwitcher/LangSwitcher";
import MenuToggle from "../components/MenuToggle/MenuToggle";
import StateSwitcherProps from "../components/SateSwitcher/interfaces";
import StateSwitcher from "../components/SateSwitcher/StateSwitcher";
import {AppContext} from "../providers/AppContext";

import {content} from "./content";
import {
	DropdownMenu,
	HeaderContainer,
	LogoImg,
	MenuToggleContainer,
	MobileWrapper
} from "./style"

const Header = () => {
	const {theme, setTheme, language} = React.useContext(AppContext);
	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
	const themeSwitcher: StateSwitcherProps = {
		title: content.themeSwitcher.title[language],
		options: [{
			title: content.themeSwitcher.options.light[language],
			onClick: () => setTheme('light'), value: 'light'
		},
			{
				title: content.themeSwitcher.options.auto[language],
				onClick: () => setTheme('auto'), value: 'auto'
			},
			{
				title: content.themeSwitcher.options.dark[language],
				onClick: () => setTheme('dark'), value: 'dark'
			}],
		selected: theme
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
			    <LangSwitcher/>
		    </DropdownMenu>
	    </HeaderContainer>
  )
}

export default Header



