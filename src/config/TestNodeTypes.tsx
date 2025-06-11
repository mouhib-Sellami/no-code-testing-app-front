import TestInputNode from "@/components/builder-component/test-nodes/TestInputNode";
import TestInputOutputNode from "@/components/builder-component/test-nodes/TestInputOutputNode";


const TestNodeTypes = {
    // "app-input-output": CustomInputOutputNode,
    "app-PRECONDITION": TestInputNode,
    "app-RUN_AFTER": TestInputOutputNode,
};

export default TestNodeTypes;