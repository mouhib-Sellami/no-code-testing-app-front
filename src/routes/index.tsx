import { lazy } from "react";
import { PATH_APP, PATH_AUTH } from "./paths";
import { Outlet, useRoutes } from "react-router-dom";
import Loadable from "./Loadable";
import GuestGuard from "@/guards/GuestGuard";
import AuthGuard from "@/guards/AuthGuard";
import { DashboardLayout } from "@/constants/layout/DashboardLayout";
import PermissionGuardRedirection from "@/guards/PermissionGuardRedirection";
import TenantGuard from "@/guards/TenantGuard";
import { ReactFlowProvider } from "@xyflow/react";
import { BuilderViewerProvider } from "@/contexts/BuilderViewerContext";


export default function AppRoutes() {

    return useRoutes([

        {
            path: PATH_AUTH.landing,
            element: (
                <LandingPage />
            ),
            index: true
        },
        {
            path: PATH_AUTH.login,
            element: (
                <GuestGuard>
                    <LoginPage />
                </GuestGuard>
            ),
        },
        {
            path: PATH_AUTH.register,
            element: (
                <GuestGuard>
                    <TenantGuard>
                        <RegisterPage />
                    </TenantGuard>
                </GuestGuard>
            ),
        },
        {
            path: PATH_AUTH.forgetPassword,
            element: (
                <GuestGuard>
                    <TenantGuard>
                        <ForgetPasswordRequest />
                    </TenantGuard>
                </GuestGuard>
            ),
        },
        {
            path: PATH_AUTH.resetPassword,
            element: (
                <GuestGuard>
                    <TenantGuard>
                        <ResetPasswordRequest />
                    </TenantGuard>
                </GuestGuard>
            ),
        },
        {
            path: PATH_APP.general.dashboard.builder,
            element: (
                <ReactFlowProvider>
                    <AuthGuard>
                        <PermissionGuardRedirection permission="can_change_project">
                            <BuilderPage />
                        </PermissionGuardRedirection>
                    </AuthGuard>
                </ReactFlowProvider>
            ),
        },
        {
            path: PATH_APP.general.dashboard.projectLogs,
            element: (
                <BuilderViewerProvider>
                    <ReactFlowProvider>
                        <AuthGuard>
                            <PermissionGuardRedirection permission="can_view_project">
                                <ViewProjectLogPage />
                            </PermissionGuardRedirection>
                        </AuthGuard>
                    </ReactFlowProvider>
                </BuilderViewerProvider>
            )
        },
        {
            path: PATH_APP.root,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ), children: [
                {
                    path: PATH_APP.general.dashboard.home,
                    element: (
                        <HomePage />
                    )
                },
                {
                    path: PATH_APP.general.dashboard.roles,
                    element: (
                        <PermissionGuardRedirection permission="can_view_role">
                            <RolePage />
                        </PermissionGuardRedirection>
                    )
                },
                {
                    path: PATH_APP.general.dashboard.users,
                    element: (
                        <PermissionGuardRedirection permission="can_view_user">
                            <UsersPage />
                        </PermissionGuardRedirection>
                    )
                },
                {
                    path: PATH_APP.general.dashboard.projects,
                    element: (
                        <PermissionGuardRedirection permission="can_view_project">
                            <ProjectsPage />
                        </PermissionGuardRedirection>
                    )
                },
                {
                    path: PATH_APP.general.dashboard.runnerAgent,
                    element: (
                        <PermissionGuardRedirection permission="can_view_runner_agent">
                            <RunnerAgentPage />
                        </PermissionGuardRedirection>
                    )
                }

            ]
        },
        {
            path: PATH_APP.general.notFound,
            element: (
                <Page404 />
            )
        },
        {
            path: "*",
            element: (
                <Page404 />
            )
        },
    ])
};

// AUTH
const LoginPage = Loadable(lazy(() => import('@pages/auth/login/LoginPage')));
const RegisterPage = Loadable(lazy(() => import('@pages/auth/register/RegisterPage')));
const ForgetPasswordRequest = Loadable(lazy(() => import('@pages/auth/forget-password/ForgetPasswordRequest')));
const ResetPasswordRequest = Loadable(lazy(() => import('@pages/auth/forget-password/ResetPasswordRequest')));

//HOME
const HomePage = Loadable(lazy(() => import('@/pages/dashboard/home/HomePage')));

// ROLES
const RolePage = Loadable(lazy(() => import('@/pages/dashboard/roles/RolesPage')));

//USERS
const UsersPage = Loadable(lazy(() => import('@/pages/dashboard/users/UsersPage')));

//PROJECTS
const ProjectsPage = Loadable(lazy(() => import('@/pages/dashboard/project/ProjectsPage')));
const ViewProjectLogPage = Loadable(lazy(() => import('@/pages/dashboard/project/ViewProjectLogPage')));
const BuilderPage = Loadable(lazy(() => import('@/pages/dashboard/builder/BuilderPage')));

//CI /CD
const RunnerAgentPage = Loadable(lazy(() => import('@/pages/dashboard/runner-agent/RunnerAgentPage')));


//OTHER
const Page404 = Loadable(lazy(() => import('@pages/errors/Page404')));
const LandingPage = Loadable(lazy(() => import('@pages/landing/LandingPage')));