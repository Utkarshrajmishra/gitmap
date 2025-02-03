"use client";
import React, { useContext, useEffect, useState } from "react";
import { CommitContext } from "@/context/CommitContext";
import ReactFlow, { Background, Controls, Edge, Node } from "reactflow";
import "reactflow/dist/style.css";

const Mindmap = () => {
  const { branches } = useContext(CommitContext);
  const [windowWidth, setWindowWidth] = useState(0); // Start with 0 to avoid SSR issues

  useEffect(() => {
    // Ensure window is defined before accessing it
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive node styling
  const nodeStyle = (width: number, isBranch: boolean = false) => ({
    backgroundColor: "#4e152f",
    color: "white",
    border: "1px solid #5c2c42",
    padding: width < 640 ? "6px 10px" : "8px 16px",
    borderRadius: "0.5rem",
    fontSize: width < 640 ? (isBranch ? "0.875rem" : "0.75rem") : "1rem",
    maxWidth: width < 640 ? "180px" : "250px",
  });

  // Responsive positioning function
  const getNodePosition = (branchIndex: number, commitIndex: number) => {
    if (windowWidth < 640) {
      return {
        x: commitIndex * 150,
        y: branchIndex * 250,
      };
    }
    return {
      x: 300 + commitIndex * 200,
      y: branchIndex * 200,
    };
  };

  if (windowWidth === 0) return <div>Loading...</div>; // Prevent rendering until window is available

  // Node and edge generation
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  branches.forEach((branch, branchIndex) => {
    const branchNodeId = `branch-${branch.name}-${branchIndex}`;
    nodes.push({
      id: branchNodeId,
      data: { label: branch.name },
      position: getNodePosition(branchIndex, 0),
      style: nodeStyle(windowWidth, true),
    });

    branch.commits.forEach((commit, commitIndex) => {
      const commitNodeId = `${branchNodeId}-commit-${commitIndex}`;
      nodes.push({
        id: commitNodeId,
        data: {
          label: (
            <div className="p-1">
              <div
                className={`${
                  windowWidth < 640 ? "text-sm" : "text-base"
                } font-medium truncate`}
              >
                {commit.message}
              </div>
              <div
                className={`${
                  windowWidth < 640 ? "text-[10px]" : "text-xs"
                } text-zinc-200`}
              >
                {commit.author}
              </div>
              <div
                className={`${
                  windowWidth < 640 ? "text-[10px]" : "text-xs"
                } text-zinc-200`}
              >
                {new Date(commit.date).toLocaleDateString()}
              </div>
            </div>
          ),
        },
        position: getNodePosition(branchIndex, commitIndex),
        style: nodeStyle(windowWidth),
      });

      if (commitIndex > 0) {
        const prevCommitNodeId = `${branchNodeId}-commit-${commitIndex - 1}`;
        edges.push({
          id: `edge-${prevCommitNodeId}-${commitNodeId}`,
          source: prevCommitNodeId,
          target: commitNodeId,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#a56884", strokeWidth: windowWidth < 640 ? 1 : 2 },
        });
      }

      if (commitIndex === 0) {
        edges.push({
          id: `edge-${branchNodeId}-${commitNodeId}`,
          source: branchNodeId,
          target: commitNodeId,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#a56884", strokeWidth: windowWidth < 640 ? 1 : 2 },
        });
      }
    });
  });

  return (
    <div
      className={`bg-gradient-to-b from-neutral-900 to-black h-screen overflow-hidden ${
        windowWidth < 640 ? "p-2" : ""
      }`}
    >
      <div
        className={`w-full h-screen bg-neutral-900 rounded-lg shadow-inner ${
          windowWidth < 640 ? "p-0" : ""
        }`}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          proOptions={{ hideAttribution: true }}
          minZoom={0.2}
          maxZoom={2}
          nodesDraggable={true}
          zoomOnScroll={false}
          zoomOnPinch={true}
          panOnScroll={true}
          className="bg-gradient-to-b from-custom-4 to-black"
        >
          <Background />
          <Controls position="bottom-right" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Mindmap;
