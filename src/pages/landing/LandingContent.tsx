import styled from "styled-components";

export default function LandingContent() {
    return (
        <ContentContainer>
            <Header>
                <Anchor>
                    <Logo>AL</Logo>
                </Anchor>
                <MenuIcon className="bi bi-grid-3x3-gap" />
            </Header>

            <BlurbContainer>
                <MainText>
                    Hey I'm <HighlightText>Aria Lopez</HighlightText> a <HighlightText>Fullstack Engineer</HighlightText>,
                    <br></br>welcome to my (under construction) corner of the internet!
                </MainText>

            </BlurbContainer>
            <ButtonGroup>
                <Button>&#8608; Projects</Button>
                <Button>&#8608; Articles</Button>
                <Button>&#8608; About Me</Button>
            </ButtonGroup>

        </ContentContainer>
    );
}

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    x-overflow: hidden;
    y-overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-height: 100px;
    margin: 2% 8%;
`;

const MenuIcon = styled.button`
    border: none;
    background: none;
    font-size: 40px;
    cursor: pointer;
`;

const Logo = styled.h1`
    font-size: 40px;
    margin: 10px;
    font-family: 'Pacifico', cursive;
    font-weight: 400;
    text-align: center;
    padding: 10px;
`;

const Anchor = styled.a`
    cursor: pointer;
`;

const BlurbContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10% 10% 0% 10%;
`;

const MainText = styled.h1`
    font-family: 'Krona One', sans-serif;
    font-size: 20px;
`;

const HighlightText = styled.a`
    font-family: 'Krona One', sans-serif;
    font-size: 30px;
    text-shadow: #fff0a3 3px 3px 1px;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0% 10%;
    @media (max-width: 900px) {
        align-items: flex-start;
    }
`;

const Button = styled.button`
    border: transparent;
    background: transparent;
    font-family: 'Krona One', sans-serif;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        transition: width 0.3s;
        text-decoration: underline;
    }
    margin: 0% 1%;
`;
