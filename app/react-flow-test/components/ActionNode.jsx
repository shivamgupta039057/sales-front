export default function ActionNode({ data }) {
    return (
      <div className="p-3 rounded-md bg-blue-600 text-white min-w-[220px]">
        <div className="text-xs uppercase">Action</div>
        <div className="font-medium">{data.label || 'Action'}</div>
        <div className="mt-2 text-xs bg-white/10 p-1 rounded">
          Template: <strong>{data.settings?.template_name || '—'}</strong>
        </div>
      </div>
    );
  }
  