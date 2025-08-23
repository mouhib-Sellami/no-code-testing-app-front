import React from "react";
import { AppUser } from "@/types/models/User";
import { Card, Divider, Drawer, Fieldset, ScrollArea, Stack, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { DateInput } from '@mantine/dates';

export interface ViewUserDetailsProps {
    user: AppUser,
    onClose: () => void,
    isVisible: boolean
}

const ViewUserDetails: React.FC<ViewUserDetailsProps> = ({ user, onClose, isVisible }) => {
    const { colors } = useMantineTheme();
    return (
        <Drawer opened={isVisible} onClose={onClose} title={"Collaborator"} transitionProps={{ duration: 150, timingFunction: 'linear' }}>
            <Stack
                w={"100%"} gap={"md"} >
                <Title order={4}>{user.first_name} {user.last_name}</Title>
                <Card withBorder p={6} px={10} bg={"transparent"} style={{ width: "fit-content" }}>
                    <Text size='sm'>{user.role?.name}</Text>
                </Card>
            </Stack>
            <Divider my={"md"} />
            <Fieldset legend="Personal information" bg={colors.mainContentColor[9]}>
                <ScrollArea>
                    <Stack w={"100%"} gap={"sm"}>
                        <TextInput label="First name" disabled value={user.first_name} />
                        <TextInput label="Last name" disabled value={user.last_name} />
                        <TextInput label="Profession" disabled value={user.profession} />
                        <TextInput label="Role" disabled value={user.role?.name || 'Staff'} />
                        <DateInput label="Joined at" disabled value={new Date(user.created_at)} valueFormat="YYYY-MM-DD" />
                    </Stack>
                </ScrollArea>
            </Fieldset>
        </Drawer>
    )
}

export default ViewUserDetails;
