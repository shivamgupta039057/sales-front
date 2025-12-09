import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Facebook, 
  MessageCircle, 
  Settings, 
  TrendingUp,
  Zap,
  Bell,
  Users,
  FileText,
  Star,
  Clock,
  Send
} from "lucide-react";

// Icon mapping function
const getIconComponent = (iconName) => {
  const iconProps = { size: 24, strokeWidth: 1.5 };
  const icons = {
    facebook: <Facebook {...iconProps} />,
    whatsapp: <MessageCircle {...iconProps} />,
    field: <FileText {...iconProps} />,
    status: <TrendingUp {...iconProps} />,
    api: <Zap {...iconProps} />,
    notification: <Bell {...iconProps} />,
    assignee: <Users {...iconProps} />,
    fields: <Settings {...iconProps} />,
    rating: <Star {...iconProps} />,
    "status-update": <TrendingUp {...iconProps} />,
    time: <Clock {...iconProps} />,
    "send-whatsapp": <Send {...iconProps} />,
    condition: <Settings {...iconProps} />,
  };
  return icons[iconName] || <Settings {...iconProps} />;
};

// AccordionItem Component
const AccordionItem = ({ title, subtitle, items, sectionKey, openSection, toggleSection, getIcon, onDragStart }) => {
  const isOpen = openSection === sectionKey;
  
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={() => toggleSection(sectionKey)}
        style={{
          width: "100%",
          padding: "12px 16px",
          background: "#fff",
          border: "1px solid #e6e6e6",
          borderRadius: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#111" }}>{title}</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{subtitle}</div>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      {isOpen && (
        <div className="palette-grid" style={{ 
          marginTop: 12, 
          paddingLeft: 4,
          paddingRight: 4,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          animation: "slideDown 0.2s ease-out"
        }}>
          {items.map((it) => (
            <div
              key={it.label}
              onDragStart={(e) => onDragStart(e, it)}
              draggable
              style={{
                padding: "12px 8px",
                borderRadius: 8,
                cursor: "grab",
                background: "#fff",
                border: "1px solid #e6e6e6",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                textAlign: "center",
                transition: "all 0.2s",
                minHeight: 90,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = it.color;
                e.currentTarget.style.boxShadow = `0 2px 8px ${it.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e6e6e6";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ color: it.color }}>
                {getIcon(it.icon)}
              </div>
              <div style={{ fontWeight: 500, fontSize: 11, color: "#374151", lineHeight: 1.3 }}>
                {it.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Sidebar palette for workflow builder with accordions.
 * 
 * Props:
 * - paletteItems: array<{ type: string, label: string, color: string, icon: string }>
 * - onDragStart: function (event, item)
 * - handleSaveWorkflow: function ()
 */
export default function WorkflowSidebar({ paletteItems, onDragStart, handleSaveWorkflow }) {
  const [openSection, setOpenSection] = useState("events");

  // Group items by type
  const triggers = paletteItems.filter(item => item.type === "trigger");
  const actions = paletteItems.filter(item => item.type === "action");
  const conditions = paletteItems.filter(item => item.type === "condition");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <style>{`
        @media (max-width: 768px) {
          .workflow-sidebar {
            width: 100% !important;
            height: auto !important;
            border-right: none !important;
            border-bottom: 1px solid #eee;
          }
          .palette-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .palette-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
      <div className="workflow-sidebar" style={{ width: 260, borderRight: "1px solid #eee", padding: 12, height: "100%", display: "flex", flexDirection: "column", background: "#fff" }}>
        <h4 style={{ margin: 0, marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Palette</h4>
        
        <div className="hide-scrollbar" style={{ 
          flex: 1, 
          overflowY: "auto"
        }}>
        <AccordionItem 
          title="Events"
          subtitle="When this happens"
          items={triggers}
          sectionKey="events"
          openSection={openSection}
          toggleSection={toggleSection}
          getIcon={getIconComponent}
          onDragStart={onDragStart}
        />
        
        <AccordionItem 
          title="Actions"
          subtitle="Do this..."
          items={actions}
          sectionKey="actions"
          openSection={openSection}
          toggleSection={toggleSection}
          getIcon={getIconComponent}
          onDragStart={onDragStart}
        />
        
        <AccordionItem 
          title="Lead Condition"
          subtitle="If..."
          items={conditions}
          sectionKey="conditions"
          openSection={openSection}
          toggleSection={toggleSection}
          getIcon={getIconComponent}
          onDragStart={onDragStart}
        />
      </div>

      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e6e6e6" }}>
        <button
          onClick={handleSaveWorkflow}
          style={{
            width: "100%",
            padding: "10px 16px",
            borderRadius: 6,
            background: "#111827",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Save workflow
        </button>

        <div style={{ marginTop: 12, fontSize: 12, color: "#666", lineHeight: 1.4 }}>
          Tip: drag a block and drop anywhere on the canvas.
        </div>
      </div>
      </div>
    </>
  );
}
