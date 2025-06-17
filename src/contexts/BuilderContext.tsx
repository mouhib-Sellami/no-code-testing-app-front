import useProjects from "@/hooks/useProjects";
import useProjectTests from "@/hooks/useProjectTests";
import useProviders from "@/hooks/useProviders";
import { resetProjectsComponent } from "@/redux/slices/projectComponentsSlice/projectComponentSlice";
import { createEdge, createProjectComponent, deleteProjectComponent, getEdges } from "@/redux/slices/projectComponentsSlice/projectComponentSliceBaseServices";
import { resetSelectedProject, resetSelectedProjectComponent } from "@/redux/slices/projectSlice/projectSlice";
import { restProjectTestCases } from "@/redux/slices/projectSlice/ProjectTestCaseSlice";
import { getTestCaseComponents } from "@/redux/slices/projectSlice/projectTestCaseSliceBaseServices";
import { fetchProvidersDetails } from "@/redux/slices/providerSlice/providerSlice";
import { dispatch } from "@/redux/store";
import { Node } from "@/types/app-types/Nodes";
import { Project } from "@/types/models/Project";
import { CreateEdge, ProjectComponent } from "@/types/models/ProjectComponent";
import { ProviderDetails } from "@/types/models/Provider";
import React, { PropsWithChildren } from "react";

type BuilderContextProps = {
    selectedProject: Project | null
    selectedProvider: ProviderDetails | null
    createNewProjectComponent: (component_id: number, extraData?: any) => Promise<{ component: ProjectComponent } | null>;
    rebuildProject: (enableLoader?: boolean) => Promise<{ nodes: Array<Node>, edges: any }> | null
    deleteComponent: (id: number) => void | null
    createNewEdge: (values: CreateEdge) => void | null
    components: Array<ProjectComponent>
    resetBuilder: () => void | null
    isSyncing: boolean,
    isBuilding: boolean,
    updateProjectSyncing: (v: boolean) => void | null
}

const BuilderContext = React.createContext<Partial<BuilderContextProps>>({
    selectedProject: null,
    selectedProvider: null,
    createNewProjectComponent: (_: number, __?: any) => null,
    rebuildProject: () => null,
    deleteComponent: (_: number) => null,
    createNewEdge: (_: CreateEdge) => null,
    components: [],
    resetBuilder: () => null,
    isSyncing: false,
    isBuilding: false,
    updateProjectSyncing: (_: boolean) => null
})

const BuilderProvider = (props: PropsWithChildren) => {
    const { selectedProject } = useProjects();
    const { components, selectedTest } = useProjectTests();
    const { selectedProvider } = useProviders();
    const [isSyncing, setIsSyncing] = React.useState(false);
    const [isBuilding, setIsBuilding] = React.useState(false);

    const updateProjectSyncing = React.useCallback((v: boolean) => {
        if (v == false) {
            setTimeout(() => { setIsSyncing(v) }, 500)
        } else {
            setIsSyncing(v)
        }
    }, [])

    const getProviderDetails = React.useCallback(async () => {
        if (!selectedProject)
            return
        if (!selectedProject || !selectedProject.provider.id)
            return
        await dispatch(fetchProvidersDetails(selectedProject.provider.id))
    }, [selectedProject])

    const getProjectComponents_ = React.useCallback(async () => {

        if (!selectedProject) {
            console.log("no project selected");

            return
        }

        if (!selectedTest) {
            console.log("no test selected");
            return
        }
        if (!selectedProject || !selectedProject.provider.id || !selectedTest) {
            console.log("here");

            return
        }
        await dispatch(getTestCaseComponents(selectedTest.id))
    }, [selectedProject, selectedTest])

    const getProjectEdges_ = React.useCallback(async () => {
        if (!selectedProject)
            return []
        if (!selectedTest)
            return []
        if (!selectedProject || !selectedProject.provider.id)
            return []
        const res = await dispatch(getEdges(selectedTest.id))
        if (res.meta.requestStatus == "fulfilled")
            return res.payload
        return []
    }, [selectedProject, selectedTest])

    React.useEffect(() => {
        getProviderDetails()
        getProjectComponents_()
    }, [selectedProject, selectedTest])

    const onSave = React.useCallback(() => { }, [])
    const onRestore = React.useCallback(() => { }, [])

    const rebuildProject = React.useCallback(async (enableLoader?: boolean): Promise<{ nodes: Array<Node>, edges: any }> => {
        if (enableLoader)
            setIsBuilding(true)
        const nodes = components.map(elm => {
            return {
                id: elm.id.toString(),
                data: { label: elm.name, component: elm },
                position: elm.builder_config?.position,
                type: `app-${elm.type}`
            }
        })
        const res = await getProjectEdges_()
        const edges = res.map(elm => {
            if (elm.dependency_type == "RUN_AFTER") {
                return {
                    id: elm.id,
                    source: elm.source_component.toString(),
                    sourceHandle: "run_after_source",
                    target: elm.target_component.toString(),
                    targetHandle: "run_after_target",
                    type: elm.dependency_type,
                }
            }
            return {
                id: elm.id,
                source: elm.source_component.toString(),
                sourceHandle: "source",
                target: elm.target_component.toString(),
                targetHandle: "target",
                type: elm.dependency_type,
            }
        })
        if (enableLoader)
            setTimeout(() => setIsBuilding(false), 1000)

        return {
            nodes: nodes, edges: edges
        } as { nodes: Array<Node>, edges: any }
    }, [components])


    const createNewProjectComponent = React.useCallback(async (component_id: number, extra_data: any): Promise<{ component: ProjectComponent } | null> => {
        if (!selectedProject)
            return
        if (!selectedTest)
            return
        const res = await dispatch(createProjectComponent({
            component_id,
            project_id: selectedProject.id,
            test_case_id: selectedTest.id,
            extra_data
        }))
        return res.payload as { component: ProjectComponent }
    }, [selectedProject, selectedTest])

    const deleteComponent = React.useCallback(async (id: number) => {
        const res = await dispatch(deleteProjectComponent(id))
        if (res.meta.requestStatus == "fulfilled") {
            getProjectComponents_()
        }
    }, [selectedProject, selectedTest])

    const createNewEdge = React.useCallback(async (values: CreateEdge) => {
        await dispatch(createEdge(values))
    }, [])

    const resetBuilder = React.useCallback(() => {
        // dispatch(resetProjectsComponent())
        // dispatch(resetSelectedProject())
        // dispatch(resetSelectedProjectComponent())
        dispatch(restProjectTestCases())
    }, [])

    return (
        <BuilderContext.Provider value={{
            selectedProject,
            selectedProvider,
            components,
            isSyncing,
            isBuilding,
            createNewProjectComponent,
            rebuildProject,
            deleteComponent,
            createNewEdge,
            resetBuilder,
            updateProjectSyncing
        }}>
            {props.children}
        </BuilderContext.Provider>
    )
};
const BuilderConsumer = BuilderContext.Consumer
export { BuilderContext, BuilderProvider, BuilderConsumer };