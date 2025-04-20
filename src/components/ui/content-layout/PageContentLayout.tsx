import { Box } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import ContentHeaderLayout, { ContentHeaderLayoutProps } from "./ContentHeaderLayout";
import PageContentWrapper from "./PageContentWrapper";

export interface PageContentLayoutProps extends PropsWithChildren, ContentHeaderLayoutProps {

}

const PageContentLayout: React.FC<PageContentLayoutProps> = (props) => {
    const { children, ...item } = props;
    return (
        <Box w={"100%"} h={"100%"} pr={"lg"} pt={"lg"}>
            <ContentHeaderLayout
                {...item}
            />
            <PageContentWrapper>
                {children}
            </PageContentWrapper>
        </Box>
    )
}

export default PageContentLayout;