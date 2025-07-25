import { Divider, Flex, Menu, px, useMantineTheme } from '@mantine/core';
import React from 'react';
import { dispatch } from '@/redux/store';
import useConfirmModal from '@/hooks/modals-hooks/useConfirmModal';
import { handleSessionExpired } from '@/redux/slices/sessionSlice/sessionSlice';
import useAuth from '@/hooks/useAuth';
import UserButton from './UserButton';
import { IconArrowsLeftRight, IconLogout, IconTrash } from '@tabler/icons-react';
import { logout } from '@/redux/slices/authSlices/authSliceThunk';

const NavbarFooter: React.FC = () => {
    const { openDeleteModal } = useConfirmModal();
    const { user, role } = useAuth();
    const { colors } = useMantineTheme();

    const logout_ = React.useCallback(async () => {
        openDeleteModal({
            content: "Are you sure you want to log out?",
            confirmText: "Log out",
            cancelText: "cancel",
            title: "Logging out",
            onConfirm: async () => {
                await dispatch(logout());
            }
        })
    }, [])

    return (
        <Flex direction={"column"} w={"100%"}>
            <Menu position="top-start" offset={5}>
                <Menu.Target >
                    <UserButton
                        name={user?.username ?? "default user"}
                        role={role.name ?? "default role"}
                    />
                </Menu.Target>
                <Menu.Dropdown w={px("14.2rem")}>
                    {/* <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                        leftSection={<IconArrowsLeftRight size={14} />}
                    >
                        Transfer my data
                    </Menu.Item>
                    <Menu.Item
                        color="red"
                        leftSection={<IconTrash size={14} />}
                    >
                        Delete my account
                    </Menu.Item>
                    <Menu.Divider /> */}
                    <Menu.Item
                        leftSection={<IconLogout size={18} color={colors.sideNavBarLinksColor[9]} />}
                        onClick={() => logout_()}
                        c={colors.sideNavBarLinksColor[9]}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu >
        </Flex >
    )
}

export default NavbarFooter;