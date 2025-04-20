import LoginForm from "@/components/forms/auth/LoginForm";
import AuthLayout from "@/constants/layout/auth/AuthLayout";
import React from "react";

const LoginPage: React.FC = ({ }) => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    )
}

export default LoginPage;