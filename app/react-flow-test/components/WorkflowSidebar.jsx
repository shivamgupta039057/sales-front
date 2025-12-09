import React from "react";

/**
 * Sidebar palette for workflow builder.
 * 
 * Props:
 * - paletteItems: array<{ label: string, color: string }>
 * - onDragStart: function (event, item)
 * - handleSaveWorkflow: function ()
 */
export default function WorkflowSidebar({ paletteItems, onDragStart, handleSaveWorkflow }) {
  return (
    <div style={{ width: 260, borderRight: "1px solid #eee", padding: 12 }}>
      <h4 style={{ margin: 0, marginBottom: 8 }}>Palette</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {paletteItems.map((it) => (
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
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <button
          onClick={handleSaveWorkflow}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            background: "#111827",
            color: "#fff",
            border: "none",
          }}
        >
          Save workflow
        </button>
      </div>

      <div style={{ marginTop: 18, fontSize: 13, color: "#666" }}>
        Tip: drag a block and drop anywhere on the canvas.
      </div>
    </div>
  );
}
