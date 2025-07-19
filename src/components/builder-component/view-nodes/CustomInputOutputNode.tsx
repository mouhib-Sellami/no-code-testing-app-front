
import { Handle, Position } from "@xyflow/react";
import React from "react";
import CustomNode from "./CustomNode";



const CustomInputOutputNode: React.FC<any> = (props) => {


    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={props.isConnectable}
            />
            <CustomNode {...props} />
            <Handle
                type="source"
                position={Position.Bottom}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={props.isConnectable}
            />
        </>
    )
}

export default CustomInputOutputNode;