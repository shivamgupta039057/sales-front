'use client';

import React, { useMemo, useState } from 'react';

const DataTable = ({ columns = [], rows = [], pageSize = 10, className = '', onRowClick }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va == null && vb == null) return 0;
      if (va == null) return sortDir === 'asc' ? -1 : 1;
      if (vb == null) return sortDir === 'asc' ? 1 : -1;
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * rowsPerPage;
  const pageRows = sortedRows.slice(pageStart, pageStart + rowsPerPage);

  const allVisibleSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));

  const toggleRow = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const toggleAllVisible = () => {
    const next = new Set(selected);
    if (allVisibleSelected) {
      pageRows.forEach((r) => next.delete(r.id));
    } else {
      pageRows.forEach((r) => next.add(r.id));
    }
    setSelected(next);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-x-auto border border-gray-200 rounded-[10px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#E4E6ED]">
            <tr>
              <th className="px-3 py-3 text-left text-xs md:text-[14px] font-bold text-[#464F60] uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#9333EA] focus:outline-none"
                  checked={allVisibleSelected}
                  onChange={toggleAllVisible}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`px-3 py-3 ${col.align === 'right' ? 'text-right' : 'text-left'} text-xs md:text-[14px] font-medium text-[#464F60] uppercase tracking-wider select-none ${col.sortable ? 'cursor-pointer' : ''}`}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                >
                  <div className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : ''}`}>
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-gray-400 text-[10px]">
                        {sortKey === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {pageRows.map((row, idx) => (
              <tr
                key={row.id}
                className={`${idx % 2 === 1 ? 'bg-[#F1F3FA]' : ''} ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#9333EA] focus:outline-none"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                  />
                </td>
                {columns.map((col) => {
                  const base = `px-3 py-3 text-xs md:text-sm text-[#4880FF] whitespace-nowrap ${col.align === 'right' ? 'text-right' : 'text-left'}`;
                  let content;
                  if (col.render) {
                    content = col.render(row[col.key], row);
                  } else if (col.key === 'name') {
                    content = (
                      <a href="#" className="text-blue-600 hover:underline">
                        {row[col.key]}
                      </a>
                    );
                  } else if (col.key === 'status') {
                    const v = String(row[col.key] ?? '').trim();
                    const style = v === 'Just Curious'
                      ? 'bg-green-50 text-green-700'
                      : v === 'Lost'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-orange-50 text-orange-700';
                    content = (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${style}`}>{v || '--'}</span>
                    );
                  } else if (col.key === 'rating') {
                    content = `${row[col.key]}%`;
                  } else {
                    content = row[col.key];
                  }
                  return (
                    <td key={col.key} className={base}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-center text-sm text-gray-500" colSpan={columns.length + 1}>
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-3">
        {/* Left: range summary */}
        <div className="text-xs text-gray-600">
          {Math.min(pageStart + 1, sortedRows.length)}-{Math.min(pageStart + rowsPerPage, sortedRows.length)} of {sortedRows.length}
        </div>

        {/* Right: rows per page + pager */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Rows per page:</span>
            <div className="relative">
              <select
                className="appearance-none border border-gray-300 rounded-md pl-2 pr-7 py-1 text-xs bg-white"
                value={rowsPerPage}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setRowsPerPage(v);
                  setPage(1);
                }}
              >
                {[10, 25, 50].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">▾</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="h-8 min-w-8 px-2 inline-flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            <div className="text-xs text-gray-600 min-w-[44px] text-center">
              {currentPage}/{totalPages}
            </div>
            <button
              className="h-8 min-w-8 px-2 inline-flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;


