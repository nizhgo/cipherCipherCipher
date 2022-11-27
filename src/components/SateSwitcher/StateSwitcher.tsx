import React from "react";
import StateSwitcherProps from "./interfaces";
import {
	StateSwitcherContainer,
	StateSwitcherOptionContainer,
	StateSwitcherOptions,
	StateSwitcherTitle
} from "./style";

const StateSwitcher = (props: StateSwitcherProps) => {
	const {title, options, selected} = props;
	return (
		<StateSwitcherContainer>
			{title && <StateSwitcherTitle>{title}</StateSwitcherTitle>}
			<StateSwitcherOptions>
				{options.map((option, index) => {
						return (
							<StateSwitcherOption isSelected={selected === option.value} onClick={option.onClick}
							                     key={index}>
								{option.title}
							</StateSwitcherOption>
						)
					}
				)}
			</StateSwitcherOptions>
		</StateSwitcherContainer>
	);
}

const StateSwitcherOption = ({isSelected, onClick, children}: {isSelected: boolean, children: React.ReactNode, onClick: () => void}) => {
	return (
		<StateSwitcherOptionContainer isSelected={isSelected} onClick={onClick}>
			{children}
		</StateSwitcherOptionContainer>
	)
}

export default StateSwitcher

