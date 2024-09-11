import React from "react";
import { useDnD } from "./DnDContext";

export const NodesPanel = () => {
  const { setType } = useDnD();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-[300px] shadow-lg shadow-gray-200/50 p-4">
      <div className="description text-sm text-slate-500">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input p-[20px] text-center rounded bg-slate-100 cursor-grab mt-2"
        onDragStart={(event) => onDragStart(event, "model")}
        draggable
      >
        LLM Model
      </div>
      <div
        className="dndnode p-[20px] text-center rounded bg-slate-100 cursor-grab mt-2"
        onDragStart={(event) => onDragStart(event, "systemRole")}
        draggable
      >
        System Role
      </div>
    </div>
  );
};
