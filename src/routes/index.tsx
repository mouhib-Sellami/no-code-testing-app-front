import { lazy } from "react";
import { PATH_APP, PATH_AUTH } from "./paths";
import { Outlet, useRoutes } from "react-router-dom";
import Loadable from "./Loadable";
import GuestGuard from "@/guards/GuestGuard";
import AuthGuard from "@/guards/AuthGuard";
import { DashboardLayout } from "@/constants/layout/DashboardLayout";
import PermissionGuardRedirection from "@/guards/PermissionGuardRedirection";


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
                    {/* <RegisterPage /> */}
                    <></>
                </GuestGuard>
            )
        },
        {
            path: PATH_AUTH.forgetPassword,
            element: (
                <GuestGuard>
                    {/* <ForgetPasswordPage /> */}
                    <></>
                </GuestGuard>
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
// const RegisterPage = Loadable(lazy(() => import('@pages/auth/register/RegisterPage')));
// const ForgetPasswordPage = Loadable(lazy(() => import('@/pages/auth/reset-password/ResetPasswordPage')));

//HOME
const HomePage = Loadable(lazy(() => import('@/pages/dashboard/home/HomePage')));
// ROLES
const RolePage = Loadable(lazy(() => import('@/pages/dashboard/roles/RolesPage')));

//OTHER
const Page404 = Loadable(lazy(() => import('@pages/errors/Page404')));
const LandingPage = Loadable(lazy(() => import('@pages/landing/LandingPage')));