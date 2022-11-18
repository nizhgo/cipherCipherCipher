import React from "react";
import styled from "styled-components";
import StateSwitcherProps from "./interfaces";
const StateSwitcher = (props: StateSwitcherProps) => {
	const {title, options, onChange, selected} = props;
	return (
		<StateSwitcherContainer>
			<StateSwitcherTitle>{title}</StateSwitcherTitle>
			<StateSwitcherOptions>
				{options.map((option: string, index: number) => {
					return (
						<StateSwitcherOption isSelected={selected === option.toLowerCase()} onClick={() => onChange(option.toLowerCase())} key={index}>
							{option}
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

const StateSwitcherOptionContainer = styled.div<{isSelected: boolean}>`
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	padding: 3px 10px;
  	border-radius: 32px;
  	background-color: ${props => props.isSelected ? props.theme.colors.selected : 'transparent'};
	color: ${props => props.theme.colors.systemText};
  	font-size: 14px;
  	font-weight: 500;
  	line-height: 17px;
  	cursor: pointer;
  	transition: all 0.5s ease-out;
  `

const StateSwitcherOptions = styled.div`
  	display: flex;
  	padding: 2px 3px;
  	border-radius: 32px;
  	background-color: ${props => props.theme.colors.primary};
  transition: all 0.4s linear;
  `

export default StateSwitcher

const StateSwitcherContainer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
  	gap: 6px;
	`

const StateSwitcherTitle = styled.p`
	font-size: 14px;
	font-weight: 400;
	color: ${props => props.theme.colors.secondaryText};
  transition: all 0.4s linear;
`
