import AppCard from "@/components/cards/AppCard";
import PageContentLayout from "@/components/ui/content-layout/PageContentLayout";
import PermissionGuard from "@/guards/PermissionGuard";
import { ActionIcon, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

const UsersPage: React.FC = ({ }) => {
    const [opened, { open, close }] = useDisclosure();

    return (
        <PageContentLayout title={`Organization Members`}>
            <AppCard title={
                <Group align="center" justify="space-between" w={"100%"}>
                    <Title order={5}>Members 🪪</Title>
                    <PermissionGuard permission="can_create_user">
                        <ActionIcon onClick={() => open()} variant="filled" aria-label="Create new role">
                            <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </PermissionGuard>
                </Group>}
            >
            </AppCard>
        </PageContentLayout>
    )
}

export default UsersPage;