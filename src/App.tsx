import {
    useContext,
    useState
} from "react";
import styled, {ThemeProvider} from "styled-components";
import Header from "./header/Header";
import {
    AppContext,
    AppProvider
} from "./providers/AppContext";
import LightTheme from "./themes/lightTheme";
import DarkTheme from "./themes/darkTheme";
import {AppContainer, AppWrapper}from "./style";

function App() {
    const {theme} = useContext(AppContext);
    return (
        <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>
                <AppWrapper>
                    <AppContainer>
                        <Header/>
                        <p>Test</p>
                    </AppContainer>
                </AppWrapper>
            </ThemeProvider>
    )
}


export default App
