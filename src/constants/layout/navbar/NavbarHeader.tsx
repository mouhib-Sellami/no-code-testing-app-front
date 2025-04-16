import { ActionIcon, Flex } from "@mantine/core";
import React from "react";
import { IconNotification } from "@tabler/icons-react";

export interface BreadCrumbDisplay {
    item: string,
    idx: number
}

const NavbarHeader: React.FC = ({ }) => {
    return (
        <Flex direction={"row"} align={"center"} justify={"space-between"} w={"100%"} h={"100%"} bg={"transparent"}>
            {/* <AppLogo height={"30px"} /> */}
            <ActionIcon
                variant="transparent"
                color={"white"}
            >
                <IconNotification color="white" size={20} />
            </ActionIcon>
        </Flex>
    )
}

export default NavbarHeader;