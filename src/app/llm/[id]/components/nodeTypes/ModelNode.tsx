import { memo } from "react";

import { Handle, Position } from "@xyflow/react";
import { useReactFlow, NodeProps } from "@xyflow/react";

const ModelNode = (props: NodeProps) => {
  const { id } = props;
  const { updateNodeData } = useReactFlow();

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <p className="text-sm">Select LLM Model</p>

      <select
        name="model"
        onChange={(event) => {
          updateNodeData(id, { value: event.target.value });
        }}
      >
        <option value="Groq">Groq</option>
        <option value="unavailable">unavailable</option>
      </select>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 10, background: "#555" }}
        isConnectable={true}
      />
    </div>
  );
};

export const memorizeModelNode = memo(ModelNode);
