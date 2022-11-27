import React from "react";
import {
	Dot,
	MenuToggleWrapper
} from "./style";

interface MenuToggleProps {
	onClick: (p: any) => void;
}

const MenuToggle = () => {
	return (
		<MenuToggleWrapper>
			<Dot/>
			<Dot/>
			<Dot/>
		</MenuToggleWrapper>
	)
}

export default MenuToggle


