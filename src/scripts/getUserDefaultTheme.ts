const getUserDefaultTheme = () => {
	  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDarkMode ? 'dark' : 'light';
}

export default getUserDefaultTheme;
