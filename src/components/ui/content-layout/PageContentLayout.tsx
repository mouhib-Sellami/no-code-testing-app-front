import { Box, Stack } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import ContentHeaderLayout, { ContentHeaderLayoutProps } from "./ContentHeaderLayout";

export interface PageContentLayoutProps extends PropsWithChildren, ContentHeaderLayoutProps {

}

const PageContentLayout: React.FC<PageContentLayoutProps> = (props) => {
    const { children, ...item } = props;
    return (
        <Box w={"100%"} h={"100%"} px={"md"} pos={"relative"}>
            <ContentHeaderLayout
                {...item}
            />
            <Stack p={0} m={0} w={"100%"} mt={"md"} gap={20}>
                {children}
            </Stack>
        </Box>
    )
}

export default PageContentLayout;