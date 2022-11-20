import React from "react";
import styled from "styled-components";

const Footer = () => {
	return (
		<FooterWrapper>
			<p>Aleksey Nizhgorodov 😎</p>
			<p>{Date.now()}</p>
		</FooterWrapper>
	)
}

export default Footer

const FooterWrapper = styled.footer`	  
  		display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  padding: 20px 0;
	  width: 100%;
	  background-color: ${props => props.theme.colors.systemBackground};
	  color: ${props => props.theme.colors.systemText};
	  font-size: 14px;
	  font-weight: 400;
	  line-height: 1.5;
	  letter-spacing: 0.5px;
	  text-align: center;
  	  flex-shrink: 0;
  	animation: fadeIn 0.5s ease-in-out;
  		// border-top: 1px solid ${props => props.theme.colors.border};
	  `
