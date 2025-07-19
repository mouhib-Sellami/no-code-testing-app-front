import { Box, Grid } from "@mantine/core";
import React, { PropsWithChildren } from "react";


const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box p={0} m={0} w={"100%"} h={"100%"}>
            <Grid w={"100%"} h={"100%"} styles={{
                inner: {
                    height: "100%",
                    overflow: "hidden",
                    margin: 0
                }
            }}>
                <Grid.Col span={{ base: 12, lg: 5, xl: 5 }}>
                    <Box p={0} m={0} h={"100%"} w={"100%"} style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(186, 45, 11, 0.15) 1px, transparent 0)`,
                        backgroundSize: "20px 20px",
                    }}>
                        {children}
                    </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 0, lg: 7, xl: 7 }} display={{ base: "none", lg: "block" }} bg={"blue"}>
                </Grid.Col>
            </Grid>
        </Box>
    )
}
export default AuthLayout;