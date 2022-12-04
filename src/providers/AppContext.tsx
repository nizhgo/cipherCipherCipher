import React, {createContext} from "react";
import getUserDefaultTheme from "../scripts/getUserDefaultTheme";
import getUserLang from "../scripts/getUserLang";
import IAppService from "../service/interfaces/IAppService";
import Language from "../service/types/Language";
import Theme from "../service/types/Theme";

export const AppContext = createContext<IAppService>({
	language: 'en',
	setLanguage: () => {
	},
	theme: 'auto',
	setTheme: () => {
	},
})


export const AppProvider = ({children}: any) => {

	const [language, setLanguage] = React.useState<Language>(getUserLang());
	const [theme, setTheme] = React.useState<Theme>(getUserDefaultTheme());

	//set theme to localstorage if theme changed
	React.useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);

	React.useEffect(() => {
		if (language === 'ru') {
			document.documentElement.lang = 'ru';
		}
		else {
			document.documentElement.lang = 'en';
		}
		localStorage.setItem('language', language);
	}, [language]);

	  return (
	<AppContext.Provider value={{language, setLanguage, theme, setTheme}}>
	  {children}
	</AppContext.Provider>
  );
}


