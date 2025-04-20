import { Stack } from "@mantine/core";
import React, { PropsWithChildren } from "react";


const PageContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Stack p={0} m={0} w={"100%"} gap={"xl"}>
            {children}
        </Stack>
    )
}

export default PageContentWrapper;