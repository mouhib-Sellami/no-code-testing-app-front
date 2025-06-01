import MonitorInputNode from "@/components/builder-component/view-nodes/MonitorInputNode";
import MonitorInputOutputNode from "@/components/builder-component/view-nodes/MonitorInputOutputNode";
import MonitorOutputNode from "@/components/builder-component/view-nodes/MonitorOutputNode";


const MonitorNodeTypes = {
    "app-input-output": MonitorInputOutputNode,
    "app-input": MonitorInputNode,
    "app-output": MonitorOutputNode,
};

export default MonitorNodeTypes