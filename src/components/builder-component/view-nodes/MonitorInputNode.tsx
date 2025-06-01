import { Handle, Position } from "@xyflow/react";
import React from "react";
import CustomNode from "./CustomNode";



const MonitorInputNode: React.FC<any> = (props) => {

    return (
        <>
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

export default MonitorInputNode;