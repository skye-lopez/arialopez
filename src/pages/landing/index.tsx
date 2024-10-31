import styled from "styled-components";
import Background from "./Background";
import LandingContent from "./LandingContent";

export default function Landing() {
    return (
        <Container>
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
