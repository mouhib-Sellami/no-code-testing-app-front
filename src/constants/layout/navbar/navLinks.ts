import {
    IconBuildingCog,
    IconFolderCode,
    IconShieldLock,
    IconSmartHome,
    IconUsers,
} from "@tabler/icons-react";
import { PATH_APP } from "@/routes/paths";
import { NavItem } from "@/components/navbar-components/NavItem";

export const navLinks: NavItem[] = [
    {
        label: "Dashboard",
        icon: IconSmartHome,
        link: PATH_APP.general.dashboard.home,
        name: "Home",
        isVisible: true,
    },
    {
        label: "Members",
        icon: IconUsers,
        link: PATH_APP.general.dashboard.users,
        name: "members",
        isVisible: true,
        permission: "can_view_user"
    },
    {
        label: "Privilege section",
        icon: IconShieldLock,
        link: PATH_APP.general.dashboard.roles,
        name: "roles",
        isVisible: true,
        permission: "can_view_role"
    },
    {
        label: "Projects",
        icon: IconFolderCode,
        link: PATH_APP.general.dashboard.projects,
        name: "projects",
        isVisible: true,
        permission: "can_view_project"
    },
    {
        label: "Organization",
        icon: IconBuildingCog,
        link: PATH_APP.general.dashboard.organization,
        name: "organization",
        isVisible: true,
        permission: "can_view_organization"
    },
    // {
    //     label: "sidebar.dashboard",
    //     icon: HiOutlinePresentationChartBar,
    //     initiallyOpened: false,
    //     name: "Tableau de bord",
    //     isVisible: true,
    //     links: [
    //         // {
    //         //     label: "sidebar.dashboard_rh",
    //         //     link: PATH_APP.general.dashboard.dashboardRH.index,
    //         // },

    //     ],
    // },
];
