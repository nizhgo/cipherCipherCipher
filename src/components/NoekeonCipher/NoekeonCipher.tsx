import React, {useContext} from "react";
import styled from "styled-components";
import {AppContext} from "../../providers/AppContext";
import Translator from "../Translator/Translator";
import KeySection from "./components/KeySection/KeySection";
import ModeSwitcher from "./components/ModeSwitcher/ModeSwitcher";
import {NoekeonProvider} from "./NoekeonProvider";


//create a type for the context

const NoekeonCipher = () => {
	return (
		<NoekeonProvider>
			<KeySection/>
			<ModeSwitcher/>
			<Translator/>
		</NoekeonProvider>
	)
}
export default NoekeonCipher;
