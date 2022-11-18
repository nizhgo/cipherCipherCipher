import React from "react";

interface StateSwitcherProps {
	title: string;
	options: string[];
	onChange: (value: string) => void;
	selected: string;
}


export default StateSwitcherProps;


