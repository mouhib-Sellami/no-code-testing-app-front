import { Handle, Position } from "@xyflow/react";
import React from "react";
import CustomNode from "./CustomNode";



const MonitorOutputNode: React.FC<any> = (props) => {
    console.log(props);
    
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
        </>
    )
}

export default MonitorOutputNode;