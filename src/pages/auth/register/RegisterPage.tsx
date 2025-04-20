import React from "react";
import OrganizationDetailsForm from "@/components/forms/auth/register/OrganizationDetailsForm";
import UserDetailsForm from "@/components/forms/auth/register/UserDetailsForm";
import AuthLayout from "@/constants/layout/auth/AuthLayout";
import { Center, rem, Stack, Stepper } from "@mantine/core";
import useFormDataFormatter from "@/hooks/useFormDataFormatter";
import { SessionContext } from "@/contexts/SessionContext";

const RegisterPage: React.FC = ({ }) => {
    const [active, setActive] = React.useState(0);
    const [userDetails, setUserDetails] = React.useState<UserDetailsRegisterForm | null>(null);
    const [organizationDetails, setOrganizationDetails] = React.useState<OrganizationDetailsRegisterForm | null>(null);
    const { isLoading, register } = React.useContext(SessionContext);
    const { jsonToFormData } = useFormDataFormatter();

    const onNext = React.useCallback((data) => {
        setUserDetails(data);
        setActive(c => c + 1);
    }, [])
    const onPrev = React.useCallback((data) => {
        setOrganizationDetails(data);
        setActive(c => c - 1);
    }, [])

    const submit = React.useCallback(async (values) => {
        setOrganizationDetails(values);
        const data: SignUpRequest = { ...userDetails, organization: values }
        const formData = jsonToFormData(data);
        await register?.(formData);
    }, [userDetails])

    return (
        <AuthLayout>
            <Center w={"100%"} h={"100%"}>
                <Stack w={{ base: "80%", xl: "70%", lg: "80%", md: "60%", sm: "50%" }} gap={20}>
                    <Stepper active={active} w={"100%"} allowNextStepsSelect={false} styles={{ stepIcon: { maxWidth: rem(40), minWidth: rem(40), maxHeight: rem(40), minHeight: rem(40) } }}>
                        <Stepper.Step label="User details">
                            <UserDetailsForm data={userDetails} onSubmit={onNext} />
                        </Stepper.Step>
                        <Stepper.Step label="Organization details">
                            <OrganizationDetailsForm isLoading={isLoading} data={organizationDetails} onSubmit={submit} onPrev={onPrev} />
                        </Stepper.Step>
                    </Stepper>
                </Stack>
            </Center>
        </AuthLayout>
    )
}

export default RegisterPage;