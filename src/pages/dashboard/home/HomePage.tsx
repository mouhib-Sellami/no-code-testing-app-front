import PrimaryButton from "@/components/buttons/PrimaryButton";
import { SessionContext } from "@/contexts/SessionContext";
import { handleSessionExpired } from "@/redux/slices/sessionSlice/sessionSlice";
import { dispatch } from "@/redux/store";
import { Container, Text } from "@mantine/core";
import React from "react";


const HomePage: React.FC = ({ }) => {
    const { } = React.useContext(SessionContext);

    const logout_ = React.useCallback(async () => {
        dispatch(handleSessionExpired())
    }, [])
    return (
        <Container>
            <PrimaryButton onClick={logout_}>
                Logout
            </PrimaryButton>
        </Container>
    )
}

export default HomePage;