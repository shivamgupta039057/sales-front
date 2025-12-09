import React, { useRef, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

/**
 * CustomTriggerNode
 * A reusable design/component based on your "TriggerNode" card design,
 * suitable for use 2-3 (or more) times with custom label/sub/etc.
 *
 * Props:
 * - label    (string): Main title (Event name)
 * - sub      (string): Sub label (status/lead type/field, etc.)
 * - color    (string): Optional background color for the purple header
 * - onClone  (function): Called when "Clone" is clicked
 * - onDelete (function): Called when "Delete" is clicked
 * - menuOpenExternally (bool): Optionally control menu externally
 * ...other reactflow props (esp. for use in nodeTypes)
 */
export function CustomTriggerNode({
  label,
  sub,
  color = "#6d28d9",
  onClone,
  onDelete,
  onEdit,
  menuOpenExternally,
  data,
  ...rest
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Allow parent to optionally control menu state
  useEffect(() => {
    if (typeof menuOpenExternally === "boolean") setMenuOpen(menuOpenExternally);
  }, [menuOpenExternally]);

  // Close menu if clicked outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleCloneInternal = () => {
    setMenuOpen(false);
    if (onClone) onClone();
    if (data?.onClone) data.onClone(data);
  };
  const handleDeleteInternal = () => {
    setMenuOpen(false);
    if (onDelete) onDelete();
    if (data?.onDelete) data.onDelete(data);
  };
  const handleEditInternal = () => {
    setMenuOpen(false);
    if (onEdit) onEdit();
    if (data?.onEdit) data.onEdit(data);
  };

  return (
    <div className="w-full max-w-md" {...rest}>
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-visible">
        {/* Purple Header */}
        <div
          className="px-6 py-4 relative"
          style={{ background: color, color: "#fff" }}
        >
          {/* EVENT Label */}
          <div className="absolute top-0 left-0 bg-purple-800 px-4 py-1 text-white text-xs font-semibold">
            EVENT
          </div>
          {/* Title and Menu */}
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-white text-2xl font-semibold">
              {label}
            </h2>
            <div className="relative" ref={menuRef}>
              <button
                className="text-white hover:bg-purple-600 rounded p-1"
                onClick={() => setMenuOpen((open) => !open)}
                type="button"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg"
                  style={{ minWidth: 120, zIndex: 9999 }}
                >
                  <button
                    onClick={handleEditInternal}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={handleCloneInternal}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Clone
                  </button>
                  <button
                    onClick={handleDeleteInternal}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* White Content Area */}
        <div className="bg-white px-6 py-8">
          <div className="flex items-center justify-between">
            {/* Lead Status with Icon */}
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M5 4v16l7-4 7 4V4" />
              </svg>
              {sub && <span className="text-gray-700 text-xl font-normal">{sub} </span>}
            </div>
            {/* Toggle/Settings Icon */}
            {/* If used inside ReactFlow, provide Handle */}
            {typeof Handle !== "undefined" && (
              <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{
                  right: 30,
                  top: "74%",
                  transform: "translateY(-50%)",
                  background: "#fff",
                  width: 18,
                  height: 18,
                  border: "3px solid #8b5cf6",
                  borderRadius: "50%",
                  boxSizing: "border-box"
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

