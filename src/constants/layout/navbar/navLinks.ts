import {
    IconChartBar,
    IconFolder,
    IconLock,
    IconSettings,
    IconUsersGroup,
} from "@tabler/icons-react";
import { PATH_APP } from "@/routes/paths";
import { NavItem } from "@/components/navbar-components/NavItem";

export const navLinks: NavItem[] = [
    {
        label: "Overview",
        icon: IconChartBar,
        link: PATH_APP.general.dashboard.home,
        name: "Home",
        isVisible: true,
    },
    {
        label: "Team",
        icon: IconUsersGroup,
        link: PATH_APP.general.dashboard.users,
        name: "team",
        isVisible: true,
        permission: "can_view_user",
    },
    {
        label: "Permissions",
        icon: IconLock,
        link: PATH_APP.general.dashboard.roles,
        name: "permissions",
        isVisible: true,
        permission: "can_view_role",
    },
    {
        label: "Workspaces",
        icon: IconFolder,
        link: PATH_APP.general.dashboard.projects,
        name: "workspaces",
        isVisible: true,
        permission: "can_view_project",
    },
    {
        label: "Settings",
        icon: IconSettings,
        link: PATH_APP.general.dashboard.organization,
        name: "settings",
        isVisible: true,
        permission: "can_view_organization",
    },
];