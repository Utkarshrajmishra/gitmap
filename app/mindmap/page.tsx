"use client"
import { CommitContext } from "@/context/CommitContext";
import { useContext } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

const Mindmap = () => {
  const { branches } = useContext(CommitContext);
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  branches.forEach((branch, branchIndex) => {
    // Add branch node
    const branchNodeId = `branch-${branch.name}-${branchIndex}`;
    nodes.push({
      id: branchNodeId,
      data: { label: branch.name },
      position: { x: 100, y: branchIndex * 200 },
      style: {
        backgroundColor: "#4e152f",
        color: "white",
        border: "1px solid #5c2c42",
        padding: "8px 16px",
        borderRadius: "0.5rem",
        fontSize: "1rem",
      },
    });

    // Add commit nodes for this branch
    branch.commits.forEach((commit, commitIndex) => {
      const commitNodeId = `${branchNodeId}-commit-${commitIndex}`;
      nodes.push({
        id: commitNodeId,
        data: {
          label: (
            <div className="p-2">
              <div className="font-medium truncate max-w-[200px]">
                {commit.message}
              </div>
              <div className="text-xs text-zinc-200">{commit.author}</div>
              <div className="text-xs text-zinc-200">
                {new Date(commit.date).toLocaleDateString()}
              </div>
            </div>
          ),
        },
        position: { x: 300 + commitIndex * 200, y: branchIndex * 200 },
        style:{backgroundColor: "#4e152f",
        color: "white",
        border: "1px solid #5c2c42",
        padding: "8px 16px",
        borderRadius: "0.5rem",
        fontSize: "1rem",
        }
      });

      if (commitIndex > 0) {
        const prevCommitNodeId = `${branchNodeId}-commit-${commitIndex - 1}`;
        edges.push({
          id: `edge-${prevCommitNodeId}-${commitNodeId}`,
          source: prevCommitNodeId,
          target: commitNodeId,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#a56884" },
        });
      }

      if (commitIndex === 0) {
        edges.push({
          id: `edge-${branchNodeId}-${commitNodeId}`,
          source: branchNodeId,
          target: commitNodeId,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#a56884" },
        });
      }
    });
  });

  return (
    <div className="bg-gradient-to-b from-neutral-900 to-black h-screen overflow-hidden">
      <div className="w-full h-screen bg-neutral-900 rounded-lg shadow-inner">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          className="bg-gradient-to-b from-custom-4 to-black"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Mindmap;