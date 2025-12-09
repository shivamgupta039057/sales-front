import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NodeEditorModal({ node, onClose, onSave }) {
  const [statuses, setStatuses] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [localData, setLocalData] = useState(node.data || { settings: {} });

  useEffect(() => {
    axios.get('/api/lead/statuses').then(r => setStatuses(r.data));
    axios.get('/api/templates').then(r => setTemplates(r.data));
  }, []);

  const save = () => {
    onSave(localData);
  };

  if (!node) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-3">{node.type === 'trigger' ? 'Trigger Settings' : 'Action Settings'}</h3>

        {node.type === 'trigger' && (
          <>
            <label className="block text-sm">Watch field</label>
            <select
              value={localData.settings?.field || 'status_id'}
              onChange={(e) => setLocalData({ ...localData, settings: { ...localData.settings, field: e.target.value } })}
              className="w-full border p-2 rounded mb-3"
            >
              <option value="status_id">Lead Status</option>
              <option value="assignedTo">Assignee</option>
              {/* more */}
            </select>

            <label className="block text-sm">When equals</label>
            <select
              value={localData.settings?.value || ''}
              onChange={(e) => {
                const selected = statuses.find(s => s.id === +e.target.value);
                setLocalData({
                  ...localData,
                  settings: { ...localData.settings, value: +e.target.value, value_label: selected?.name }
                });
              }}
              className="w-full border p-2 rounded mb-3"
            >
              <option value="">Any</option>
              {statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </>
        )}

        {node.type === 'action' && (
          <>
            <label className="block text-sm">Action</label>
            <select
              value={localData.action_type || localData.settings?.action_type || 'send_template'}
              onChange={(e) => setLocalData({ ...localData, action_type: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            >
              <option value="send_template">Send Template</option>
              <option value="notify">Notify</option>
              <option value="update_lead">Update Lead</option>
            </select>

            { (localData.action_type === 'send_template' || localData.settings?.action_type === 'send_template') && (
              <>
                <label className="block text-sm">Template</label>
                <select
                  value={localData.settings?.template_id || ''}
                  onChange={(e) => {
                    const sel = templates.find(t => t.id === +e.target.value);
                    setLocalData({ ...localData, settings: { ...localData.settings, template_id: +e.target.value, template_name: sel?.name }});
                  }}
                  className="w-full border p-2 rounded mb-3"
                >
                  <option value="">-- Choose Template --</option>
                  {templates.map(t => <option value={t.id} key={t.id}>{t.name}</option>)}
                </select>

                <label className="block text-sm">Image (optional)</label>
                <input type="text"
                  value={localData.settings?.image || ''}
                  onChange={(e) => setLocalData({ ...localData, settings: { ...localData.settings, image: e.target.value }})}
                  className="w-full border p-2 rounded mb-3"
                  placeholder="image path or URL"
                />
              </>
            )}
          </>
        )}

        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose} className="px-3 py-2 border rounded">Close</button>
          <button onClick={save} className="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
