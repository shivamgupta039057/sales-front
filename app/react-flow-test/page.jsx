"use client"
// WorkflowBuilder.jsx
import React, { useCallback, useRef, useState , useEffect } from "react";
import { CustomTriggerNode } from "./useCustomeDesign.jsx";
import WorkflowSidebar from "./components/WorkflowSidebar";
// import React, {  useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

/*
  WorkflowBuilder
  - Drag items on the left palette and drop on the canvas to create nodes.
  - Connect nodes with edges.
  - Double-click a node to open a small editor modal and update node label/data.
  - Save workflow with Save button (calls onSave prop).
*/

const paletteItems = [
  { type: "trigger", label: "On Facebook Lead", sub : "Facebook Lead" ,  color: "#4f38a2"  },
  { type: "trigger", label: "On WhatsApp Lead",sub : "WhatsApp Lead" , color: "#4f38a2" },
  { type: "trigger", label: "Lead Field Change",  sub : "Lead Field" , color: "#4f38a2" },
  { type: "trigger", label: "Lead Status Change",  sub : "Lead Status" , color: "#4f38a2" },
  { type: "action", label: "update Lead Field", color: "#2563eb" },
  { type: "action", label: "update Status Change", color: "#2563eb" },
  { type: "action", label: "Send Template", color: "#2563eb" },
  { type: "action", label: "Assign to Counselor", color: "#7c3aed" },
  { type: "condition", label: "If Lead Status is", color: "#f59e0b" },
];

const nodeStyle = (bg = "#fff") => ({
  padding: 10,
  borderRadius: 8,
  minWidth: 200,
  background: bg,
  color: "#fff",
  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  fontSize: 13,
  position: "relative"
});

// Node renderers WITH HANDLES for connecting edges



function TriggerNode({ data }) {
  // Pass relevant props to CustomTriggerNode.
  return (
    <CustomTriggerNode
      label={data?.label}
      sub={data?.sub}
      color={data?.color}
      onClone={data?.onClone ? () => data.onClone(data) : undefined}
      onDelete={data?.onDelete ? () => data.onDelete(data) : undefined}
      data={data}
    />
  );
}

function ActionNode({ data }) {
  return (
    // <div style={nodeStyle(data?.color || "#2563eb")}>
    //   <Handle type="target" position={Position.Left} id="a" style={{ background: "#fff", width: 10, height: 10 }} />
    //   <Handle type="source" position={Position.Right} id="b" style={{ background: "#fff", width: 10, height: 10 }} />
    //   <div style={{ fontSize: 11, opacity: 0.9 }}>ACTION</div>
    //   <div style={{ fontWeight: 700, marginTop: 6 }}>{data?.label || "Action"}</div>
    //   {data?.template && <div style={{ marginTop: 6, fontSize: 12 }}>{data.template}</div>}
    // </div>
    <CustomTriggerNode
    label={data?.label}
    sub={data?.sub}
    color={data?.color}
    onClone={data?.onClone ? () => data.onClone(data) : undefined}
    onDelete={data?.onDelete ? () => data.onDelete(data) : undefined}
    data={data}
  />
  );
}

function ConditionNode({ data }) {
  return (
    <div style={nodeStyle(data?.color || "#f59e0b")}>
      <Handle type="target" position={Position.Left} id="a" style={{ background: "#fff", width: 10, height: 10 }} />
      <Handle type="source" position={Position.Right} id="b" style={{ background: "#fff", width: 10, height: 10 }} />
      <div style={{ fontSize: 11, opacity: 0.9 }}>CONDITION</div>
      <div style={{ fontWeight: 700, marginTop: 6 }}>{data?.label || "Condition"}</div>
    </div>
  );
}

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
};

const generateId = (prefix = "node") => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

function NodeEditorModal({ node, onClose, onSave }) {
  const [label, setLabel] = useState(node?.data?.label || "");
  const [sub, setSub] = useState(node?.data?.sub || "");
  const [template, setTemplate] = useState(node?.data?.template || "");

  if (!node) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.35)", zIndex: 9999
    }}>
      <div style={{ width: 520, background: "#fff", borderRadius: 8, padding: 16 }}>
        <h3 style={{ margin: 0, marginBottom: 8 }}>{node.type === "trigger" ? "Trigger Settings" : node.type === "action" ? "Action Settings" : "Condition Settings"}</h3>
        <div style={{ display: "grid", gap: 8 }}>
          <label style={{ fontSize: 13 }}>Label</label>
          <input value={label} onChange={(e) => setLabel(e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />

          <label style={{ fontSize: 13 }}>Sub / Note (optional)</label>
          <input value={sub} onChange={(e) => setSub(e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />

          {node.type === "action" && (
            <>
              <label style={{ fontSize: 13 }}>Template (optional)</label>
              <input value={template} onChange={(e) => setTemplate(e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
            </>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          <button onClick={onClose} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ddd", background: "#fff" }}>Cancel</button>
          <button onClick={() => onSave({ label, sub, template })} style={{ padding: "8px 12px", borderRadius: 6, background: "#2563eb", color: "#fff", border: "none" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default function WorkflowBuilder({ initialGraph = { nodes: [], edges: [] }, onSave = async () => {} }) {
  // state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialGraph.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialGraph.edges || []);
  const [selectedNode, setSelectedNode] = useState(null);

  // reactflow instance ref (to convert drop pos)
  const reactFlowWrapper = useRef(null);
  const { project } = useReactFlow();

  // on connect
  // Fix: addEdge will work only if nodes have both a target and a source Handle.
  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge({
        ...params,
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
        },
      }, eds)
    );
  }, [setEdges]);

  // create node when dropped
  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = event.dataTransfer.getData("application/reactflow");
    if (!data) return;
    const parsed = JSON.parse(data);

    // position where dropped
    const position = project({
      x: event.clientX - reactFlowBounds.left - 100, // offset half width (approx)
      y: event.clientY - reactFlowBounds.top - 20,
    });

    const id = generateId(parsed.type);
    const newNode = {
      id,
      type: parsed.type,
      position,
      data: {
        label: parsed.label,
        color: parsed.color,
        sub: parsed.sub || "",
        template: parsed.template || "",
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [project, setNodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // palette drag start
  const onDragStart = (event, item) => {
    const payload = JSON.stringify(item);
    event.dataTransfer.setData("application/reactflow", payload);
    // optionally set drag image
  };

  // node double click to edit
  const onNodeDoubleClick = useCallback((evt, node) => {
    setSelectedNode(node);
  }, []);

  const handleNodeSave = (updatedData) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id ? { ...n, data: { ...n.data, ...updatedData } } : n
      )
    );
    setSelectedNode(null);
  };

  const handleSaveWorkflow = async () => {
    const payload = { nodes, edges };
    // call prop onSave or do fetch
    try {
      await onSave(payload);
      alert("Workflow saved (onSave called)");
    } catch (err) {
      console.error(err);
      alert("Save failed: " + (err?.message || "unknown"));
    }
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 10px)", gap: 12 }}>
      jkfjdkfk
      {/* Left palette */}
      <div style={{ width: 260, borderRight: "1px solid #eee", padding: 12 }}>
        {/* <h4 style={{ margin: 0, marginBottom: 8 }}>Palette</h4> */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <WorkflowSidebar
            paletteItems={paletteItems}
            onDragStart={onDragStart}
            handleSaveWorkflow={handleSaveWorkflow}
          />
          {/* Replace left palette with WorkflowSidebar component */}
         
        
          {/* {paletteItems.map((it) => (
            <div
              key={it.label}
              onDragStart={(e) => onDragStart(e, it)}
              draggable
              style={{
                padding: 10,
                borderRadius: 8,
                cursor: "grab",
                background: "#fff",
                border: "1px solid #e6e6e6",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 4, background: it.color }} />
              <div style={{ fontWeight: 600 }}>{it.label}</div>
            </div>
          ))} */}
        </div>

        {/* <div style={{ marginTop: 18 }}>
          <button onClick={handleSaveWorkflow} style={{ padding: "8px 12px", borderRadius: 6, background: "#111827", color: "#fff", border: "none" }}>
            Save workflow
          </button>
        </div>

        <div style={{ marginTop: 18, fontSize: 13, color: "#666" }}>
          Tip: drag a block and drop anywhere on the canvas.
        </div> */}
      </div>

      {/* Flow area */}
      <div style={{ flex: 1, position: "relative" }}>
        <div ref={reactFlowWrapper} style={{ width: "100%", height: "100%" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDoubleClick={onNodeDoubleClick}
            nodeTypes={nodeTypes}
            // fitView
          >
            <MiniMap />
            <Controls />
            <Background gap={16} />
          </ReactFlow>
        </div>
      </div>

      {/* Node editor modal */}
      {selectedNode && (
        <NodeEditorModal
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onSave={handleNodeSave}
        />
      )}
    </div>
  );
}

// Wrap usage with ReactFlowProvider in app root if necessary:
// <ReactFlowProvider>
//   <WorkflowBuilder onSave={(payload)=>console.log(payload)} />
// </ReactFlowProvider>
