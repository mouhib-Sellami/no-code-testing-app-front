import { PATH_AUTH } from "@/routes/paths";
import { Container } from "@mantine/core";
import React from "react";
import { Link } from "react-router";

const LandingPage: React.FC = ({ }) => {

    return (
        <Container>
            <Link to={PATH_AUTH.login}>
                Login
            </Link>
        </Container>
    )
}

export default LandingPage;