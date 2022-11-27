import React from "react";
import {AppContext} from "../../providers/AppContext";
import StateSwitcherProps from "../SateSwitcher/interfaces";
import StateSwitcher from "../SateSwitcher/StateSwitcher";
import {content} from "./content";

const LangSwitcher = () => {
	const {language, setLanguage} = React.useContext(AppContext);
	const langSwitcher: StateSwitcherProps = {
		title: content.title[language],
		options: [{
			title: content.options.rus[language],
			onClick: () => setLanguage('ru'), value: 'ru'
		},
			{
				title: content.options.eng[language],
				onClick: () => setLanguage('en'), value: 'en'
			}],
		selected: language
	}
	return (
		<StateSwitcher {...langSwitcher}/>
	)
}

export default LangSwitcher;
