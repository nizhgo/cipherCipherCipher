import React, {createContext} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage"

export const AppContext = createContext<any | null>(null);

export const AppProvider = ({children}: any) => {
	const getLanguage = () => {
		//get user lang from browser
		const [lang, setLang] = useLocalStorage('language', 'en');
		//if localstorage is empty set lang from browser and save it to localstorage
		if (lang === null || lang !== 'ru' || lang !== 'en') {
			const BrowserLang = navigator.language;
			 //cut first two letters from browser lang
			const lang = BrowserLang.slice(0, 2);
			console.log('BrowserLang', lang);
			return(lang === 'ru' ? 'ru' : 'en');
		}
		return lang;
	}

	const getTheme = () => {
		const theme = localStorage.getItem('theme');
		if (theme === null || theme === 'auto' || (theme !== 'light' && theme !== 'dark')) {
			//get preferred theme from browser
			const BrowserTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			localStorage.setItem('theme', BrowserTheme);
			return BrowserTheme;
		}
		return theme;
	}

	const [language, setLanguage] = React.useState<'ru' | 'en'>(getLanguage());
	const [theme, setTheme] = React.useState(getTheme);

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


