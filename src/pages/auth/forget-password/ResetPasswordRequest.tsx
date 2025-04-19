import React from "react"
import { Box, Grid } from "@mantine/core";
import ResetPasswordForm from "@/components/forms/auth/forgetPasswordRequest/ResetPasswordForm";

const ResetPasswordRequest: React.FC = ({ }) => {

    return (
        <Box p={0} m={0} w={"100%"} h={"100%"}>
            <Grid w={"100%"} h={"100%"} styles={{
                inner: {
                    height: "100%",
                    overflow: "hidden",
                    margin: 0
                }
            }}>
                <Grid.Col span={{ base: 12, lg: 4, xl: 5 }}>
                    <ResetPasswordForm />
                </Grid.Col>
                <Grid.Col span={{ base: 0, lg: 8, xl: 7 }} display={{ base: "none", lg: "block" }} bg={"blue"}>

                </Grid.Col>
            </Grid>
        </Box>
    )
}

export default ResetPasswordRequest;