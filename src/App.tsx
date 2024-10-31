import styled from "styled-components";
import GlobalStyle from "./styles/global";
import Background from "./components/Background";
import LandingContent from "./components/LandingContent";

export default function App() {
    return (
        <Container>
            <GlobalStyle />
            <Background />
            <LandingContent />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;
