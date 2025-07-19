
import { Handle, Position } from "@xyflow/react";
import React from "react";
import CustomNode from "./CustomNode";



const MonitorInputOutputNode: React.FC<any> = (props) => {

    return (
        <>
            <Handle
                type="target"
                id="target"
                position={Position.Top}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={props.isConnectable}
            />
            <CustomNode {...props} />
            <Handle
                type="source"
                id="source"
                position={Position.Bottom}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={props.isConnectable}
            />
        </>
    )
}

export default MonitorInputOutputNode;