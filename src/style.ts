import styled from "styled-components";

const AppWrapper = styled.div`
	  display: flex;
  	  flex-direction: column;
  	  align-items: center;
  	  justify-content: start;
  	  height: 100%;
  	min-height: 100vh;
	  background-color: ${props => props.theme.colors.background};
  		transition: all 0.4s linear;
	  
	  `;

const AppContainer = styled.div`
	max-width: 1200px;
  	min-height: 100vh;
	width: 100%;
	margin: 0 auto;
	padding: 0 10px;
  	display: flex;
  	flex-direction: column;
`;

const AppContent = styled.div`
	flex: 1;
	height: 100%;
	width: 100%;
`;

export { AppWrapper, AppContainer, AppContent };
