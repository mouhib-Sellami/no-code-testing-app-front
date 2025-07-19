import DependenceOnEdge from "@/components/builder-component/Edges/DependenceOnEdge";
import RunAfterEdge from "@/components/builder-component/Edges/RunAfterEdge";

const TestEdgeTypes = {
    "PRECONDITION": DependenceOnEdge,
    "RUN_AFTER": RunAfterEdge,
};

export default TestEdgeTypes;