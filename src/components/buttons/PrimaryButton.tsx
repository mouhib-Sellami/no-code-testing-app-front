import React from "react";
import { Button, px, useMantineTheme } from "@mantine/core";
import { AppButtonProps } from "./type";

const PrimaryButton: React.FC<AppButtonProps> = (props) => {
    const { children, ...item } = props;
    const { colors } = useMantineTheme();
    return (
        <Button
            color={colors.primaryButtonColor[9]}
            h={px("2.5rem")}
            style={{
                // fontSize: 16,
                fontWeight: "500",
            }}
            {...item}
        >{children}</Button>
    )
}

export default PrimaryButton;