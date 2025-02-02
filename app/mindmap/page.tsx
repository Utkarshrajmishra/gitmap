"use client"
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

const Mindmap = () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
  
  return (
    <div className="bg-gradient-to-b from-neutral-900 to-black h-screen overflow-hidden">
      <div className="w-full h-screen bg-neutral-900 rounded-lg shadow-inner">
        <ReactFlow nodes={nodes} edges={edges} fitView className="bg-neutral-900">
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Mindmap;
