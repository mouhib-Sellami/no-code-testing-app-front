import React from "react";
import { AppModalProps } from "../base-modal/types";
import BaseAppModal from "../base-modal/BaseAppModal";
import { useForm } from "@mantine/form";
import { CreateUpdateProject } from "@/types/models/Project";
import useUsers from "@/hooks/useUsers";
import { dispatch } from "@/redux/store";
import DataTableConfig from "@/config/DataTableConfig";
import { fetchUsers } from "@/redux/slices/userSlice/userSliceBaseServices";
import { fetchProviders } from "@/redux/slices/providerSlice/providerSlice";
import useProviders from "@/hooks/useProviders";
import { Box, px, ScrollArea, SimpleGrid, Stack, Stepper, Textarea, TextInput } from "@mantine/core";
import CustomLoadingOverlay from "@/components/custom-loading/CustomLoadingOverlay";
import ProviderCard from "@/components/cards/ProviderCard";


const CreateProjectModal: React.FC<AppModalProps> = (props) => {
    const USER_STATE = useUsers();
    const PROVIDER_STATE = useProviders();
    const [active, setActive] = React.useState(0);
    const [query, setQuery] = React.useState("");

    const initialValues: CreateUpdateProject = React.useMemo(() => {
        return {
            name: "",
            description: "",
            managed_by_id: -1,
            members: [],
            provider_id: -1,
        }
    }, []);

    const fetchUsersData = React.useCallback(async () => {
        await dispatch(fetchUsers({
            p: 1,
            page_size: DataTableConfig.MAX_PAGE_SIZE,
            search: query
        }))
    }, [query])

    const fetchProviders_ = React.useCallback(async () => {
        await dispatch(fetchProviders())
    }, [query])


    React.useEffect(() => {
        fetchProviders_()
        fetchUsersData()
    }, [])
    React.useEffect(() => {
        fetchUsersData()
    }, [query])

    const form = useForm({
        enhanceGetInputProps: () => ({ disabled: true }),
        mode: 'controlled',
        initialValues: initialValues,
        validate: {

        },
    });
    // list of selected memebers and render input https://mantine.dev/form/recipes/
    return (
        <BaseAppModal
            {...props}
            withCancelButton
            size={px("70rem")}
            title="Create new project 🤙"
            onCancel={() => props.onCancel()}
            onSubmit={() => setActive(a => a + 1)}
        // SubmitButtonLoading={isLoading}
        >
            <Box p={0} m={0} h={px("25rem")}>

                <Stepper active={active} >
                    <Stepper.Step label="Project details" description="Provider project details">
                        <Stack w={"100%"} gap={"sm"} mt={"md"}>
                            <TextInput
                                label="Project name"
                                placeholder="To be change"
                                withAsterisk
                                required
                                key={form.key('name')}
                                {...form.getInputProps('name')}
                            />
                            <Textarea
                                styles={{
                                    input: {
                                        height: "var(--input-size)"
                                    }
                                }}
                                label="Project description"
                                placeholder="To be change"
                                withAsterisk
                                rows={5}
                                required
                                key={form.key('description')}
                                {...form.getInputProps('description')}
                            />
                        </Stack>
                    </Stepper.Step>
                    <Stepper.Step label="Assign project">
                        Step 2 content: Verify email
                    </Stepper.Step>
                    <Stepper.Step label="Project provider" >
                        <ScrollArea pos={"relative"} mah={px("15rem")} h={px("15rem")} mt={"md"}>
                            {PROVIDER_STATE.isLoading && <CustomLoadingOverlay />}
                            <SimpleGrid cols={3}>
                                {
                                    PROVIDER_STATE.providers.map((elm, idx) => (
                                        <ProviderCard key={idx} provider={elm}></ProviderCard>
                                    ))

                                }
                            </SimpleGrid>
                        </ScrollArea>

                    </Stepper.Step>
                    <Stepper.Step label="Choose a template">
                        Step 2 content: Verify email
                    </Stepper.Step>
                </Stepper>
            </Box>
        </BaseAppModal>
    )
}

export default CreateProjectModal;
