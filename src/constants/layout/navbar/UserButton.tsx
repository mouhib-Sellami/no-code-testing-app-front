import React, { forwardRef } from 'react';
import { IconSelector } from '@tabler/icons-react';
import { Group, Avatar, Text, UnstyledButton, Flex, useMantineTheme, Box } from '@mantine/core';
import { AppConfigContext } from '@/contexts/AppConfigContext';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    name: string;
    role: string;
    icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ name, role, icon, ...others }: UserButtonProps, ref) => {
        const { colors } = useMantineTheme();
        const { colorScheme } = React.useContext(AppConfigContext);

        return (<UnstyledButton
            ref={ref}
            style={{
                padding: 'var(--mantine-spacing-xs)',
                color: 'var(--mantine-color-text)',
                borderRadius: 12,
                width: "100%",
                backgroundColor: colors.userButtonBgColor[9],
                borderColor: colorScheme == "dark" ? colors.NavbarDividerColor[9] : "transparent",
                borderWidth: 1,
                borderStyle: "solid"
            }}
            {...others}
            pos={"relative"}

        >
            <Group w={"100%"}>
                <Avatar name={name} radius="xl" size={"2rem"} styles={{
                    placeholder: {
                        fontSize: "0.8rem"
                    }
                }}
                    bg={"primary"} color='white' />
                <Flex direction={"column"}>
                    <Text size="sm" fw={500} fz={{ xl: 14, lg: 12, md: 12 }} c={"light-dark(var(--mantine-color-linkColorLight-9), var(--mantine-color-linkColorDark-9))"}>
                        {name}
                    </Text>

                    <Text c="dimmed" size="xs" fz={{ xl: 12, lg: 10, md: 10 }}>
                        {role}
                    </Text>
                </Flex>
            </Group>
            <Box pos={"absolute"} style={{ top: 5, right: 5, position: "absolute" }}>
                {icon || <IconSelector size="20" color={colors.NavbarDividerColor[9]} />}
            </Box>
        </UnstyledButton>)
    }
);

export default UserButton;