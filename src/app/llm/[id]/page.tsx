"use client";

import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Connection,
  Background,
  Node,
  ReactFlowInstance,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  NodesPanel,
  DnDProvider,
  useDnD,
  ChatToggle,
  nodeTypes,
  SaveFlowButton,
} from "./components";

const initialNodes: Node[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ llmId }: { llmId: string }) => {
  // Can use llmId to save and load flow json in DB, MongoDB is a good choice for this project.
  console.log(llmId);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const { type } = useDnD();
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  return (
    <div className="dndflow h-full flex">
      <NodesPanel />
      <div className="reactflow-wrapper flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          onInit={setRfInstance}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <SaveFlowButton rfInstance={rfInstance} />
      <ChatToggle rfInstance={rfInstance} />
    </div>
  );
};
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow llmId={id} />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
