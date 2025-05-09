import React from "react";
import { Grid, PasswordInput, Stack, TextInput } from "@mantine/core";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { RegisterFormsProps } from "./type";
import { useForm } from "@mantine/form";

const UserDetailsForm: React.FC<RegisterFormsProps<UserDetailsRegisterForm>> = ({ data, onSubmit }) => {
    const initialValues: UserDetailsRegisterForm = React.useMemo(() => {
        if (data)
            return data
        return {
            password: '',
            confirm_password: '',
            first_name: '',
            email: '',
            last_name: '',
            username: ''
        }
    }, [data])

    const form = useForm({
        mode: "uncontrolled",
        initialValues: initialValues,
        validate: {
            password: (value) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value) ? null : 'Invalid password'),
            confirm_password: (value, values) => value == values.password ? null : "Password mismatch",
            email: (value) => (/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value) ? null : 'Invalid email'),
            first_name: (value) => value.length > 0 ? null : 'Invalid field',
            last_name: (value) => value.length > 0 ? null : 'Invalid field',
            username: (value) => value.length > 0 ? null : 'Invalid field',
        },
    });

    const submit = React.useCallback((values: UserDetailsRegisterForm) => {
        onSubmit(values)
    }, [])

    return (
        <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Stack gap={"sm"} mt={"lg"}>
                <Grid>
                    <Grid.Col span={6}>
                        <TextInput
                            label="First name"
                            placeholder="Jhon"
                            withAsterisk
                            required
                            key={form.key('first_name')}
                            {...form.getInputProps('first_name')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Last name"
                            placeholder="Doe"
                            withAsterisk
                            required
                            key={form.key('last_name')}
                            {...form.getInputProps('last_name')}
                        />
                    </Grid.Col>
                </Grid>
                <TextInput
                    label="Username"
                    placeholder="jhon.doe"
                    withAsterisk
                    required
                    key={form.key('username')}
                    {...form.getInputProps('username')}
                />
                <TextInput
                    label="E-mail"
                    placeholder="jhon.doe@example.com"
                    withAsterisk
                    required
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <Grid>
                    <Grid.Col span={6}>
                        <PasswordInput
                            label="Password"
                            placeholder="**************"
                            withAsterisk
                            required
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <PasswordInput
                            label="Confirm password"
                            placeholder="**************"
                            withAsterisk
                            required
                            key={form.key('confirm_password')}
                            {...form.getInputProps('confirm_password')}
                        />
                    </Grid.Col>
                </Grid>
                <PrimaryButton type='submit' mt={"sm"}>
                    Next
                </PrimaryButton>
            </Stack>
        </form>
    )

}

export default UserDetailsForm;