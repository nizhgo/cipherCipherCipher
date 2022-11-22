import styled from "styled-components";

const InfoIconBox = styled.img`
  	width: 22px;
  	height: 22px;
  	cursor: pointer;
    filter: ${props => props.theme.title === 'dark' ? 'invert(0.8)' : 'invert(0.3)'};
    transition: all 0.4s linear;
  `

export default InfoIconBox;
