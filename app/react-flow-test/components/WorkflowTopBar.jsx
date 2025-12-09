import React from "react";
import { ArrowLeft, Trash2 } from "lucide-react";

/**
 * TopBar component for workflow builder
 * 
 * Props:
 * - workflowName: string - Name of the workflow
 * - workflowType: string - Type of workflow (e.g., "Lead Activity")
 * - status: string - Status (e.g., "Draft", "Published")
 * - errorCount: number - Number of errors
 * - onBack: function - Back button handler
 * - onPublish: function - Publish button handler
 * - onDelete: function - Delete button handler
 */
export default function WorkflowTopBar({
  workflowName = "Untitled Workflow",
  workflowType = "Lead Activity",
  status = "Draft",
  errorCount = 0,
  onBack = () => {},
  onPublish = () => {},
  onDelete = () => {},
}) {
  return (
    <div
      style={{
        width: "100%",
        height: 64,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <ArrowLeft size={20} color="#374151" />
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              {workflowName}
            </h1>
            <span
              style={{
                fontSize: 13,
                color: "#6b7280",
                padding: "2px 8px",
                background: "#f3f4f6",
                borderRadius: 4,
              }}
            >
              {status}
            </span>
            {errorCount > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#dc2626",
                  fontSize: 13,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M8 4v4.5M8 11h.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{errorCount} Error{errorCount > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>
            Workflow Type: {workflowType}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onPublish}
          disabled={errorCount > 0}
          style={{
            padding: "10px 24px",
            background: errorCount > 0 ? "#e0e7ff" : "#6366f1",
            color: errorCount > 0 ? "#a5b4fc" : "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 600,
            cursor: errorCount > 0 ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            opacity: errorCount > 0 ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (errorCount === 0) {
              e.currentTarget.style.background = "#4f46e5";
            }
          }}
          onMouseLeave={(e) => {
            if (errorCount === 0) {
              e.currentTarget.style.background = "#6366f1";
            }
          }}
        >
          Publish
        </button>

        <button
          onClick={onDelete}
          style={{
            padding: 8,
            background: "transparent",
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fee2e2";
            e.currentTarget.style.borderColor = "#fecaca";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        >
          <Trash2 size={18} color="#ef4444" />
        </button>
      </div>
    </div>
  );
}
