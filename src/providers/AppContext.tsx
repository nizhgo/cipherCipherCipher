import React, {createContext} from "react";

export const AppContext = createContext<any | null>(null);

export const AppProvider = ({children}: any) => {
	const [language, setLanguage] = React.useState("en");
	const [theme, setTheme] = React.useState("light");
	  return (
	<AppContext.Provider value={{language, setLanguage, theme, setTheme}}>
	  {children}
	</AppContext.Provider>
  );
}
