import styled from "styled-components";

export default function LandingContent() {
    return (
        <Container>
            <NameContainer>
                <Name>Aria Lopez</Name>
                <Title>
                    Fullstack Engineer
                </Title>
            </NameContainer>
            <ButtonContainer>
                <Button>&#8608; Projects</Button>
                <Button>&#8608; Writing</Button>
                <Button>&#8608; About Me</Button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const NameContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 10px;
`;

const Name = styled.h1`
    font-size: 40px;
    margin: 10px;
    font-family: 'Rock Salt', cursive;
`;

const Title = styled.h1`
    margin: 10px;
    font-size: 30px;
    font-family: 'Kalam', cursive;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Button = styled.button`
    border: transparent;
    background: transparent;
    font-family: 'Kalam', cursive;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        transition: width 0.3s;
        text-decoration: underline;
    }
    margin: 10px 0px;
`;
