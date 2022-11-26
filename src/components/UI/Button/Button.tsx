import React from "react";
import styled from "styled-components";


const ButtonBase = styled.button`
	  background: none;
	  color: ${props => props.theme.colors.stytemText};
	  border: none;
	  padding: 7px 14px;
	  border-radius: 12px;
	  font-size: ${props => props.theme.sizes.mainTextSize};
	  font-weight: 600;
	  font-family: inherit;
	  line-height: ${props => props.theme.sizes.mainTextSize};
	  transition: all 0.4s linear;
  		cursor: pointer;
	  `
interface ButtonProps {
	isActive?: boolean;
}
		export const Button = styled(ButtonBase)<ButtonProps>`
	  background: ${props => props.isActive ? props.theme.colors.primary : 'none'};
	  color: ${props => props.theme.colors.systemText};
	  font-size: ${props => props.theme.sizes.systemTextSize};
	  font-weight: 600;
	  font-family: inherit;
	  line-height: ${props => props.theme.sizes.mainTextSize};
	  transition: all 0.4s linear;

	  &:focus {
	    outline: none;
	  }
	  `;


