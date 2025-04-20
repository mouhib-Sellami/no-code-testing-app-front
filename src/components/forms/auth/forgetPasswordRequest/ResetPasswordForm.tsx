import React from "react";
import { Alert, Box, Center, Group, PasswordInput, px, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useForm } from "@mantine/form";
import { IconShieldCheckered } from "@tabler/icons-react";
import useAuth from "@/hooks/useAuth";
import { PATH_AUTH } from "@/routes/paths";
import { dispatch } from "@/redux/store";
import { resetPassword, verifyToken } from "@/redux/slices/authSlices/authSliceThunk";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";

const ResetPasswordForm: React.FC = ({ }) => {
    const params = useParams();
    const { colors } = useMantineTheme();
    const { isLoading } = useAuth();
    const navigate = useNavigate();

    const [isExpired, setIsExpired] = React.useState(false);

    const initialValues: resetPasswordRequest = React.useMemo(() => {
        return {
            password: '',
            confirm_password: '',
            token: params.token
        }
    }, [params])

    const verify_token = React.useCallback(async () => {
        const res = await dispatch(verifyToken({ token: params.token }))
        if (res.meta.requestStatus == "rejected") {
            setIsExpired(true);
        }
    }, [params])

    React.useEffect(() => {
        verify_token()
    }, [params])

    React.useEffect(() => {
        if (!params.token) {
            setIsExpired(true);
        }
    }, [params])

    const form = useForm({
        mode: "uncontrolled",
        initialValues: initialValues,
        validate: {
            password: (value) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value) ? null : 'Invalid password'),
            confirm_password: (value, values) => value == values.password ? null : "Password mismatch"
        },
        enhanceGetInputProps: () => ({ disabled: isLoading }),
    });

    const submit = React.useCallback(async (values: resetPasswordRequest) => {
        const res = await dispatch(resetPassword(values));
        if (res.meta.requestStatus == "fulfilled") {
            navigate(PATH_AUTH.login);
            dispatch(onShowNotification({
                level: "SUCCESS",
                content: "Password updated successfully",
                type: "AUTH"
            }))
        } else {
            dispatch(onShowNotification({
                level: "ERROR",
                content: "Password cannot be updated try again later",
                type: "AUTH"
            }))
            if (res.payload.hasOwnProperty('token')) {
                setIsExpired(true)
            }
        }
    }, [])

    return (
        <Center w={"100%"} h={"100%"}>
            <Stack w={{ base: "80%", xl: "70%", lg: "70%", md: "50%", sm: "50%" }} gap={20}>
                <Group w={"100%"} align='flex-start' style={{ flexDirection: "column" }} mb={"xl"} gap={0}>
                    <Title order={2} fz={{ xl: 26, lg: 24, md: 20 }}>Reset Password</Title>
                    <Text c={"dimmed"} fz={{ xl: 16, lg: 14, md: 12 }}>Please enter your new password.</Text>
                </Group>
                <Box hidden={isExpired} pos={'relative'}>
                    <form onSubmit={form.onSubmit((values) => submit(values))} style={{ width: "100%" }}>
                        <Stack w={"100%"} gap={"sm"}>
                            <PasswordInput
                                required
                                withAsterisk
                                label="Password"
                                placeholder="Password"
                                key={form.key('password')}
                                {...form.getInputProps('password')}
                                error={form.errors.password || form.errors.confirm_password}
                                radius="md"
                            />
                            <PasswordInput
                                required
                                withAsterisk
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                key={form.key('confirm_password')}
                                {...form.getInputProps('confirm_password')}
                                radius="md"
                            />
                            <PrimaryButton h={44} type='submit' loading={isLoading}>
                                <Text fz={{ xl: 16, lg: 14, md: 12 }}>
                                    Submit
                                </Text>
                            </PrimaryButton>
                        </Stack>
                    </form>
                </Box>
                <Stack hidden={!isExpired} style={{ display: isExpired ? "flex" : "none" }} gap={"lg"}>
                    <Alert variant="filled" color={colors.red[9]} styles={{ icon: { width: px("1.5rem") } }} icon={<IconShieldCheckered />} >
                        <Text fw={"500"} size="md">This link is expired.</Text>
                    </Alert>
                    <PrimaryButton type='submit' loading={isLoading} onClick={() => { navigate(PATH_AUTH.forgetPassword) }}>
                        <Text size='md' fz={{ xl: 16, lg: 14, md: 12 }}>
                            Request a new link
                        </Text>
                    </PrimaryButton>
                </Stack>
            </Stack>
        </Center>
    )
}

export default ResetPasswordForm;