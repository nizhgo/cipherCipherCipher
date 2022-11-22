import React from "react";
import styled from "styled-components";
import Translator from "../Translator/Translator";
import KeySection from "./components/KeySection/KeySection";

const NoekeonCipher = () => {
	const [key, setKey] = React.useState<string>('');
	return (
		<div>
			<KeySection setAKey={setKey} />
			<Translator NoekeonKey={key}/>
		</div>
	)
}
export default NoekeonCipher;
