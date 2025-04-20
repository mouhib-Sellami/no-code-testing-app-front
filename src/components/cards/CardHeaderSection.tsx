import { Box, Text, Title, useMantineTheme } from "@mantine/core";
import { JSX } from "react";

export interface CardHeaderSectionProps {
    title: string | JSX.Element,
    subTitle?: string,
}

const CardHeaderSection: React.FC<CardHeaderSectionProps> = ({ title, subTitle }) => {
    const { colors } = useMantineTheme();

    return (
        <Box w={"100%"} px={"md"} py={"md"} style={{
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderColor: colors.dividerBorderColorDark[9]
        }}>
            {typeof title == "string" ?
                <Title order={5} >{title}</Title>
                : title}
            <Text c={"dimmed"} size="xs">{subTitle}</Text>
        </Box>
    )
}

export default CardHeaderSection;