import React from "react"
import ResetPasswordForm from "@/components/forms/auth/forgetPasswordRequest/ResetPasswordForm";
import AuthLayout from "@/constants/layout/auth/AuthLayout";

const ResetPasswordRequest: React.FC = ({ }) => {

    return (
        <AuthLayout>
            <ResetPasswordForm />
        </AuthLayout>
    )
}

export default ResetPasswordRequest;