import Language from "../service/types/Language";

const getUserLang = (): Language => {
	const localStoragelang = localStorage.getItem('language');
	if (localStoragelang && ['en', 'ru'].includes(localStoragelang)) {
		return localStoragelang as Language;
	}
	const browserLang = navigator.language.split('-')[0];
	if (['en', 'ru'].includes(browserLang)) {
		return browserLang as Language;
	}
	return 'en';
};


export default getUserLang;
