import React from "react";
import { Alert, Box, Center, Group, PasswordInput, px, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { NavLink, useNavigate, useParams } from "react-router";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useForm } from "@mantine/form";
import { IconShieldCheckered } from "@tabler/icons-react";
import useAuth from "@/hooks/useAuth";
import { PATH_AUTH } from "@/routes/paths";

const ResetPasswordForm: React.FC = ({ }) => {
    const params = useParams();
    const { colors } = useMantineTheme();
    const { isLoading } = useAuth();
    const navigate = useNavigate();

    const [isExpired, setIsExpired] = React.useState(false);

    const initialValues = React.useMemo(() => {
        return {
            password: '',
            confirm_password: '',
            token: params.token
        }
    }, [params])

    console.log(initialValues);

    const verify_token = React.useCallback(async () => { }, [])

    React.useEffect(() => {
        if (!params.token) {
            setIsExpired(true);
        }
    }, [params])

    const form = useForm({
        mode: "uncontrolled",
        initialValues: initialValues,
        validate: {
            password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? null : 'Invalid password'),
        },
    });

    const submit = React.useCallback(async (values) => {

    }, [])

    return (
        <Center w={"100%"} h={"100%"}>
            <Stack w={{ base: "80%", xl: "70%", lg: "70%", md: "50%", sm: "50%" }} gap={20}>
                <Group w={"100%"} align='flex-start' style={{ flexDirection: "column" }} mb={"xl"} gap={0}>
                    <Title order={2} fz={{ xl: 26, lg: 24, md: 20 }}>Reset Password</Title>
                    <Text c={"dimmed"} fz={{ xl: 16, lg: 14, md: 12 }}>Please enter your new password.</Text>
                </Group>
                <Box hidden={isExpired}>
                    <form onSubmit={form.onSubmit((values) => submit(values))} style={{ width: "100%" }}>
                        <Stack w={"100%"} gap={"sm"}>
                            <PasswordInput
                                required
                                withAsterisk
                                label="Password"
                                placeholder="Password"
                                key={form.key('password')}
                                {...form.getInputProps('password')}
                                error={form.errors.password || form.errors.confirmPassword}
                                radius="md"
                            />
                            <PasswordInput
                                required
                                withAsterisk
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                // key={form.key('confirmPassword')}
                                // {...form.getInputProps('confirmPassword')}
                                // error={form.errors.confirmPassword}
                                radius="md"
                            />
                            <PrimaryButton h={44} type='submit'>
                                <Text fz={{ xl: 16, lg: 14, md: 12 }}>
                                    Confirmer
                                </Text>
                            </PrimaryButton>
                            <Text ta="center" c={"dimmed"} fz={{ xl: 16, base: 14 }} mt="md">
                                Vous voulez se connecter?{' '}
                                <NavLink to={"/"} style={{ textDecoration: "none", color: colors.whiteBlackLabelTextColor[9] }}>
                                    Cliquez ici
                                </NavLink>
                            </Text>
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