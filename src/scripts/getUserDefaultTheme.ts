const getUserDefaultTheme = () => {
	  const userTheme = window.localStorage.getItem('theme');
	  if (userTheme && ['light', 'dark'].includes(userTheme)) {
		  	    return userTheme;
	  }
	  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDarkMode ? 'dark' : 'light';
}

export default getUserDefaultTheme;
