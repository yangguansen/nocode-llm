import { memo } from "react";

import { Handle, Position, useHandleConnections } from "@xyflow/react";
import { useReactFlow, NodeProps } from "@xyflow/react";

const SystemRoleNode = (props: NodeProps) => {
  const { id } = props;
  const { updateNodeData } = useReactFlow();
  const connections = useHandleConnections({
    type: "target",
  });

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <p className="text-sm">System Role</p>

      <label>Prompt</label>

      <br />

      <input
        className="border border-slate-500 rounded pl-2"
        type="text"
        onBlur={(event) => {
          updateNodeData(id, { value: event.target.value });
        }}
      />

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={connections.length === 0}
      />
    </div>
  );
};

export const memorizeSystemRoleNode = memo(SystemRoleNode);
