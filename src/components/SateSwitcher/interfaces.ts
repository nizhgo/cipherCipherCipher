import React from "react";

interface StateSwitcherProps {
	title?: string;
	options: OptionProps[];
	selected: string;
}

interface OptionProps {
	title: string;
	value: string;
	onClick: () => void;
}


export default StateSwitcherProps;


