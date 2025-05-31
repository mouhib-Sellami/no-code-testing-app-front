import CustomInputNode from "@/components/builder-component/nodes/CustomInputNode";
import CustomInputOutputNode from "@/components/builder-component/nodes/CustomInputOutputNode";
import CustomOutputNode from "@/components/builder-component/nodes/CustomOutputNode";


const nodeTypes = {
    "app-input-output": CustomInputOutputNode,
    "app-input": CustomInputNode,
    "app-output": CustomOutputNode,
};

export default nodeTypes;