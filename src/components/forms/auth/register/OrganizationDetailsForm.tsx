import React from "react";
import { Button, Code, FileInput, SimpleGrid, Stack, TextInput } from "@mantine/core";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { IconUpload } from "@tabler/icons-react";
import slugify from 'react-slugify';
import { RegisterFormsProps } from "./type";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { useForm } from "@mantine/form";

const OrganizationDetailsForm: React.FC<RegisterFormsProps<OrganizationDetailsRegisterForm>> = ({ data, onSubmit, onPrev, isLoading }) => {
    const initialValues: OrganizationDetailsRegisterForm = React.useMemo(() => {
        if (data)
            return data
        return {
            name: '',
            email: '',
            org_pic: null
        }
    }, [data])

    const form = useForm({
        mode: "uncontrolled",
        initialValues: initialValues,
        validate: {
            name: (value) => (value.length > 0 ? null : 'Invalid field'),
        },
        enhanceGetInputProps: () => ({ disabled: isLoading }),
    });

    const slug = React.useMemo(() => {
        return slugify(form.getValues().name, {
            delimiter: ''
        }).replaceAll('-', '')
    }, [form])

    const submit = React.useCallback((values) => {
        onSubmit(values)
    }, [])

    return (
        <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Stack gap={"sm"} mt={"lg"}>
                <TextInput
                    label="Company name"
                    placeholder="Ulysse."
                    withAsterisk
                    required
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Company E-mail"
                    placeholder="jhon.doe@company.com"
                    withAsterisk
                    required
                    key={form.key('email')}
                    {...form.getInputProps('email')}

                />
                <FileInput
                    leftSection={<IconUpload size={20} />}
                    placeholder="Choose image"
                    label="Company logo"
                    key={form.key('org_pic')}
                    {...form.getInputProps('org_pic')}
                    accept="image/png, image/gif, image/jpeg"
                />
                <TextInput
                    disabled
                    label="Your domain"
                    placeholder="companyname"
                    withAsterisk
                    value={slug}
                    rightSection={<Code block px={"sm"} ta={"center"}>.nocode.ulysse</Code>}
                    styles={{
                        section: {
                            width: "fit-content",
                            height: "100%"
                        }
                    }}
                />
                <SimpleGrid cols={2}>
                    <SecondaryButton type='submit' mt={"sm"} onClick={() => onPrev(form.getValues())} disabled={isLoading}>
                        Go back
                    </SecondaryButton>
                    <PrimaryButton type='submit' mt={"sm"} loading={isLoading}>
                        Sign up
                    </PrimaryButton>
                </SimpleGrid>
            </Stack>
        </form>
    )

}

export default OrganizationDetailsForm;