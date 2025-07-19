import { Handle, Position } from "@xyflow/react";
import React from "react";
import CustomNode from "./CustomNode";



const CustomInputNode: React.FC<any> = (props) => {

    return (
        <>
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

export default CustomInputNode;