import React from "react";
import { Alert, Box, Center, Group, Loader, px, Stack, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useForm } from '@mantine/form';
import PrimaryButton from "@/components/buttons/PrimaryButton";
import useAuth from "@/hooks/useAuth";
import { dispatch } from "@/redux/store";
import { forgetPasswordRequest } from "@/redux/slices/authSlices/authSliceThunk";
import { IconMailCode } from "@tabler/icons-react";
import Countdown from 'react-countdown';
import ForgetPasswordRender from "@/components/countDown/ForgetPasswordRender";

const ForgetPasswordRequestForm: React.FC = ({ }) => {
    const { colors } = useMantineTheme();
    const { isLoading } = useAuth();
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [timerStart, setTimeStart] = React.useState(false);

    const RESET_TIMEOUT = React.useMemo(() => {
        return Date.now() + 30000
    }, [timerStart])

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const submit = React.useCallback(async (values) => {
        const res = await dispatch(forgetPasswordRequest(values));
        if (res.meta.requestStatus == "fulfilled") {
            setIsSubmitted(true);
        }
        setIsSubmitted(true);
    }, [])

    const resend = React.useCallback(async () => {
        const res = await dispatch(forgetPasswordRequest(form.getValues()));
        if (res.meta.requestStatus == "fulfilled") {
            setIsSubmitted(true);
            setTimeStart(true);
        }
    }, [form])

    return (
        <Center w={"100%"} h={"100%"}>
            <Stack w={{ base: "80%", xl: "70%", lg: "70%", md: "50%", sm: "50%" }} gap={20}>
                <Group w={"100%"} align='flex-start' style={{ flexDirection: "column" }} mb={"xl"} gap={0}>
                    <Title order={2} fz={{ xl: 26, lg: 24, md: 20 }}>Forget Password</Title>
                    <Text c={"dimmed"} fz={{ xl: 16, lg: 14, md: 12 }}>Please enter your email.</Text>
                </Group>
                <Box hidden={isSubmitted}>
                    <form onSubmit={form.onSubmit((values) => submit(values))} style={{ width: "100%" }}>
                        <Stack w={"100%"} gap={"sm"}>
                            <TextInput
                                required
                                withAsterisk
                                label="Email"
                                placeholder="jhon.doe@example.com"
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />
                            <PrimaryButton type='submit' disabled={isSubmitted} loading={isLoading}>
                                <Text size='md' fz={{ xl: 16, lg: 14, md: 12 }}>
                                    Submit request
                                </Text>
                            </PrimaryButton>
                        </Stack>
                    </form>
                </Box>
                <Stack hidden={!isSubmitted} style={{ display: isSubmitted ? "flex" : "none" }} gap={"lg"}>
                    <Alert variant="filled" color={colors.activeLinkBgColor[9]} styles={{ icon: { width: px("1.5rem") } }} icon={<IconMailCode />} >
                        <Text fw={"500"} size="md">Please check your email address <code>{form.getValues().email}</code> for instruction to reset your password.</Text>
                    </Alert>
                    <PrimaryButton type='submit' onClick={resend} disabled={timerStart} loading={isLoading}>
                        <Text size='md' fz={{ xl: 16, lg: 14, md: 12 }}>
                            {timerStart ? <Countdown
                                autoStart={timerStart}
                                date={RESET_TIMEOUT}
                                renderer={ForgetPasswordRender}
                                onComplete={() => { setTimeStart(false) }}
                            /> : "Resend code"}
                        </Text>
                    </PrimaryButton>
                </Stack>
            </Stack>
        </Center>
    )
}

export default ForgetPasswordRequestForm;