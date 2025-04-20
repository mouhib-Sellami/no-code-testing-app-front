import React from "react";
import AuthLayout from "@/constants/layout/auth/AuthLayout";
import ForgetPasswordRequestForm from "@/components/forms/auth/forgetPasswordRequest/ForgetPasswordRequestForm";

const ForgetPasswordRequest: React.FC = ({ }) => {

    return (
        <AuthLayout>
            <ForgetPasswordRequestForm />
        </AuthLayout>
    )
}

export default ForgetPasswordRequest;