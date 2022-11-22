import React from "react";
import {content} from "./content";
import {AppContext} from "../../providers/AppContext";
import StateSwitcherProps from "../SateSwitcher/interfaces";
import StateSwitcher from "../SateSwitcher/StateSwitcher";

const LangSwitcher = () => {
	const {language, setLanguage} = React.useContext(AppContext);
	const lang: 'ru' | 'en' = language || 'en';
	const langSwitcher: StateSwitcherProps = {
		title: content.title[lang],
		options: [{title: content.options.rus[lang],
			onClick: () => setLanguage('ru'), value:'ru'},
			{title: content.options.eng[lang],
				onClick: () => setLanguage('en'), value:'en'}],
		selected: lang
	}
	return (
		<StateSwitcher {...langSwitcher}/>
	)
}

export default LangSwitcher;
