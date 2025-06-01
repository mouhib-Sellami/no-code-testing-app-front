import React from "react";

import { AppModalProps } from "../base-modal/types";
import BaseAppModal from "../base-modal/BaseAppModal";
import { Project } from "@/types/models/Project";
import useRunners from "@/hooks/useRunners";
import { dispatch } from "@/redux/store";
import { fetchRunnerAgents } from "@/redux/slices/runnerAgentSlice/runnerAgentSliceBaseServices";
import { useDebouncedValue } from "@mantine/hooks";
import DataTableConfig from "@/config/DataTableConfig";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import useProjects from "@/hooks/useProjects";
import { executeProject } from "@/redux/slices/projectSlice/projectSliceBaseServices";
import { onShowNotification } from "@/redux/slices/notificationSlice/notificationSlice";
import { setSelectedProjectLogs } from "@/redux/slices/projectSlice/projectStatusLogSlice";
import { useNavigate } from "react-router";
import { PATH_APP } from "@/routes/paths";

export interface RunProjectModalProps extends AppModalProps {
    project: Project
}

const RunProjectModal: React.FC<RunProjectModalProps> = (props) => {
    const RUNNER_AGENT = useRunners();
    const [query, setQuery] = React.useState("");
    const [debouncedQuery] = useDebouncedValue(query, 200);
    const PROJECT_HOOKS = useProjects();
    const navigate = useNavigate();

    const runners = React.useMemo(() => {
        return RUNNER_AGENT.runners.filter(elm =>
            elm.status != "Inactive" && elm.status != "Initializing"
        ).map(item => ({
            label: item.name, value: item.id.toString()
        }))
    }, [RUNNER_AGENT.runners])

    const fetchRunners = React.useCallback(async () => {
        await dispatch(fetchRunnerAgents({
            p: 1,
            page_size: DataTableConfig.MAX_PAGE_SIZE,
            search: debouncedQuery
        }))
    }, [debouncedQuery])

    React.useEffect(() => {
        fetchRunners()
    }, [debouncedQuery])
    const initialValues = React.useMemo(() => {
        return {
            id: props.project.id,
            runner_id: "",
        }
    }, [props.project])

    const form = useForm({
        enhanceGetInputProps: () => ({ disabled: PROJECT_HOOKS.isLoadingForRunning }),
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            runner_id: (value) => (value == "" ? "Runner need to be specified" : null),
        },
    });
    const onSubmit = React.useCallback(async (values) => {
        const res = await dispatch(executeProject(values))
        if (res.meta.requestStatus == "rejected") {
            dispatch(onShowNotification({
                content: "Cannot run project , try again later !",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user role"
            }))
        } else {
            dispatch(onShowNotification({
                content: "Project is queued in the agent , check it out 🥳",
                level: "SUCCESS",
                render: "NOTIFICATION",
                type: "user role"
            }))
            await dispatch(setSelectedProjectLogs(res.payload))
            props.onSubmit()
            navigate(PATH_APP.general.dashboard.projectLog.replaceAll(":id", res.payload.id))
        }
    }, [])

    const submit = React.useCallback(() => {
        form.validate()
        if (form.isValid()) {
            onSubmit({ ...form.values })
        }
    }, [form])

    return (
        <BaseAppModal
            {...props}
            withCancelButton
            title="Run Test"
            onCancel={() => props.onCancel()}
            onSubmit={() => submit()}
            SubmitButtonLoading={PROJECT_HOOKS.isLoadingForRunning}
        >
            <Select
                label="Choose your agent"
                searchable
                data={runners}
                nothingFoundMessage="No runner found"
                onSearchChange={setQuery}
                {...form.getInputProps('runner_id')}
            />

        </BaseAppModal>
    )
}

export default RunProjectModal;
