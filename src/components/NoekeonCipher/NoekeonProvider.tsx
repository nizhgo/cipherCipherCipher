import React, {createContext} from "react";

export const NoekeonContext = createContext<any | null>(null);

export const NoekeonProvider = ({children}: any) => {
	const [key, setKey] = React.useState("");
	const [mode, setMode] = React.useState<'encrypt' | 'decrypt'>("encrypt");
	const [leftText, setLeftText] = React.useState("");
	const [rightText, setRightText] = React.useState("");
	  return (
	<NoekeonContext.Provider value={{key, setKey, mode, setMode, leftText, setLeftText, rightText, setRightText}}>
	  {children}
	</NoekeonContext.Provider>
  );
}

export default NoekeonProvider;
