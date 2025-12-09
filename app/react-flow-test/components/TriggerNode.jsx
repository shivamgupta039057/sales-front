import React from 'react';

export default function TriggerNode({ id, data }) {
  return (
    <div className="p-3 rounded-md bg-purple-600 text-white min-w-[220px]">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs uppercase">Event</div>
          <div className="font-medium">{data.label || 'Trigger'}</div>
        </div>
        <div className="text-sm opacity-80">{/* edit icon visible via double click, no button here */}</div>
      </div>

      <div className="mt-2 text-xs bg-white/10 p-1 rounded">
        <div>Status: <strong>{ data.settings?.value_label || 'Any' }</strong></div>
      </div>
    </div>
  );
}
