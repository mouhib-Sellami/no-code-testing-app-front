import useProjects from "@/hooks/useProjects";
import useProviders from "@/hooks/useProviders";
import { resetProjectsComponent } from "@/redux/slices/projectComponentsSlice/projectComponentSlice";
import { createEdge, createProjectComponent, deleteProjectComponent, getEdges } from "@/redux/slices/projectComponentsSlice/projectComponentSliceBaseServices";
import { resetSelectedProject, resetSelectedProjectComponent } from "@/redux/slices/projectSlice/projectSlice";
import { getProjectComponents } from "@/redux/slices/projectSlice/projectSliceBaseServices";
import { fetchProvidersDetails } from "@/redux/slices/providerSlice/providerSlice";
import { dispatch } from "@/redux/store";
import { Node } from "@/types/app-types/Nodes";
import { Project } from "@/types/models/Project";
import { CreateEdge, ProjectComponent } from "@/types/models/ProjectComponent";
import { ProviderDetails } from "@/types/models/Provider";
import React, { PropsWithChildren } from "react";

type BuilderViewerContextProps = {
    selectedProject: Project | null
    selectedProvider: ProviderDetails | null
    createNewProjectComponent: (component_id: number, extraData?: any) => Promise<{ component: ProjectComponent } | null>;
    rebuildProject: (enableLoader?: boolean) => Promise<{ nodes: Array<Node>, edges: any }> | null
    deleteComponent: (id: number) => void | null
    createNewEdge: (values: CreateEdge) => void | null
    projectComponents: Array<ProjectComponent>
    resetBuilder: () => void | null
    isSyncing: boolean,
    isBuilding: boolean,
    updateProjectSyncing: (v: boolean) => void | null
}

const BuilderViewerContext = React.createContext<Partial<BuilderViewerContextProps>>({
    selectedProject: null,
    selectedProvider: null,
    createNewProjectComponent: (_: number, __?: any) => null,
    rebuildProject: () => null,
    deleteComponent: (_: number) => null,
    createNewEdge: (_: CreateEdge) => null,
    projectComponents: [],
    resetBuilder: () => null,
    isSyncing: false,
    isBuilding: false,
    updateProjectSyncing: (_: boolean) => null
})

const BuilderViewerProvider = (props: PropsWithChildren) => {
    const { selectedProject, projectComponents } = useProjects();
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

        if (!selectedProject)
            return
        if (!selectedProject || !selectedProject.provider.id)
            return
        await dispatch(getProjectComponents(selectedProject.id))
    }, [selectedProject])

    const getProjectEdges_ = React.useCallback(async () => {
        if (!selectedProject)
            return []
        if (!selectedProject || !selectedProject.provider.id)
            return []
        const res = await dispatch(getEdges(selectedProject.id))
        if (res.meta.requestStatus == "fulfilled")
            return res.payload
        return []
    }, [selectedProject])

    React.useEffect(() => {
        getProviderDetails()
        getProjectComponents_()
    }, [selectedProject])

    const rebuildProject = React.useCallback(async (enableLoader?: boolean): Promise<{ nodes: Array<Node>, edges: any }> => {
        if (enableLoader)
            setIsBuilding(true)
        const nodes = projectComponents.map(elm => {
            return {
                id: elm.id.toString(),
                data: { label: elm.name, component: elm },
                position: elm.builder_config?.position,
                type: `app-${elm.type}`
            }
        })
        const res = await getProjectEdges_()
        const edges = res.map(elm => {
            return {
                id: elm.id,
                source: elm.source_component.toString(),
                sourceHandle: null,
                target: elm.target_component.toString(),
                targetHandle: null,
                type: elm.dependency_type,
                animated: true
            }
        })
        if (enableLoader)
            setTimeout(() => setIsBuilding(false), 1000)

        return {
            nodes: nodes, edges: edges
        } as { nodes: Array<Node>, edges: any }
    }, [projectComponents])


    const createNewProjectComponent = React.useCallback(async (component_id: number, extra_data: any): Promise<{ component: ProjectComponent } | null> => {
        if (!selectedProject)
            return
        const res = await dispatch(createProjectComponent({
            component_id,
            project_id: selectedProject.id,
            extra_data
        }))
        return res.payload as { component: ProjectComponent }
    }, [selectedProject])

    const deleteComponent = React.useCallback(async (id: number) => {
        const res = await dispatch(deleteProjectComponent(id))
        if (res.meta.requestStatus == "fulfilled") {
            getProjectComponents_()
        }
    }, [selectedProject])

    const createNewEdge = React.useCallback(async (values: CreateEdge) => {
        await dispatch(createEdge(values))
    }, [])

    const resetBuilder = React.useCallback(() => {
        dispatch(resetProjectsComponent())
        dispatch(resetSelectedProject())
        dispatch(resetSelectedProjectComponent())
    }, [])

    return (
        <BuilderViewerContext.Provider value={{
            selectedProject,
            selectedProvider,
            projectComponents,
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
        </BuilderViewerContext.Provider>
    )
};
const BuilderConsumer = BuilderViewerContext.Consumer
export { BuilderViewerContext, BuilderViewerProvider, BuilderConsumer };