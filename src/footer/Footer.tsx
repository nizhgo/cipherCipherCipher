import React from "react";
import LangSwitcher from "../components/LangSwitcher/LangSwitcher";
import {FooterWrapper} from "./style";

const Footer = () => {
	return (
		<FooterWrapper>
			<LangSwitcher/>
			<p>Aleksey Nizhgorodov 😎</p>
		</FooterWrapper>
	)
}

export default Footer

