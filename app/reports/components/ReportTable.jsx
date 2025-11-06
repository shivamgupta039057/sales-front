'use client';

import React from 'react';
import { Download } from 'lucide-react';

const data = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  name: i % 3 === 0 ? 'Leads-Report-(15, 30)-27' : 'Leads-Report',
  status: i % 2 === 0 ? 'COMPLETED' : 'Pending',
  completedOn: '8:42 PM Wed, 27 Aug 25',
  createdBy: 'Anshul',
}));

const StatusBadge = ({ status }) => {
  if (status === 'COMPLETED') {
    return <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">COMPLETED</span>;
  }
  return <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-medium">Pending</span>;
};

const ReportTable = () => {
  return (
    <div className="w-full overflow-x-auto border border-gray-200 rounded-[10px]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Completed On</th>
            <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Created By</th>
            <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((row, idx) => (
            <tr key={row.id} className={idx % 2 === 1 ? 'bg-gray-50' : ''}>
              <td className="px-4 py-3 text-sm text-blue-600"><a href="#" className="hover:underline">{row.name}</a></td>
              <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.completedOn}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.createdBy}</td>
              <td className="px-4 py-3"><button className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-gray-100" title="Download"><Download className="w-4 h-4 text-gray-700" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-xs text-gray-600">1-10 of 97</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Rows per page:</span>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-md pl-2 pr-7 py-1 text-xs bg-white">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">▾</span>
            </div>
          </div>
          <div className="text-xs text-gray-600">1/10</div>
          <div className="flex items-center gap-1">
            <button className="h-8 min-w-8 px-2 inline-flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50">‹</button>
            <button className="h-8 min-w-8 px-2 inline-flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;


