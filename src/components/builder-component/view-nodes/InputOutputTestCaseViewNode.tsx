
import { Handle, Position } from "@xyflow/react";
import React from "react";
import CustomTestCaseNode from "./CustomTestCaseNode";


const InputOutputTestCaseViewNode: React.FC<any> = (props) => {
    return (
        <>
            <Handle
                type="target"
                id="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={props.isConnectable}
            />
            <CustomTestCaseNode {...props} />
            <Handle
                type="source"
                id="source"
                position={Position.Right}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={props.isConnectable}
            />
        </>
    )
}

export default InputOutputTestCaseViewNode;