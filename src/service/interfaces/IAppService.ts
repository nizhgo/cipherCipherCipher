import Language from "../types/Language";
import Theme from "../types/Theme";

export default interface IAppService {
	language: Language;
	theme: Theme;

	setLanguage(language: Language): void;

	setTheme(theme: Theme): void;
}

