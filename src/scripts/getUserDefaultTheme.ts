import Theme from "../service/types/Theme";

const getUserDefaultTheme = (): Theme => {
	  const userTheme = window.localStorage.getItem('theme');
	  if (userTheme && ['light', 'dark', 'auto'].includes(userTheme)) {
		  	    return userTheme as Theme;
	  }
	  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDarkMode ? 'dark' : 'light' as Theme;
}

export default getUserDefaultTheme;
