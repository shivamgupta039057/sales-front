'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  Edit3,
  ChevronDown,
  ChevronRight,
  Shield,
  Info,
  Layers,
  Search,
  Filter,
  Phone,
  Hash,
  Type,
  UserRound,
  Globe,
  Zap,
  Paperclip,
  IndianRupee,
  FileText,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';

const Switch = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
      disabled
        ? 'bg-gray-200 cursor-not-allowed'
        : checked
          ? 'bg-[#5D5BD0]'
          : 'bg-gray-300'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
        checked ? 'translate-x-4' : 'translate-x-1'
      }`}
    />
  </button>
);

const FieldIcon = ({ type }) => {
  const iconProps = { className: 'w-3.5 h-3.5 text-[#7A7A85]' };
  if (type === 'phone') return <Phone {...iconProps} />;
  if (type === 'number') return <Hash {...iconProps} />;
  if (type === 'user') return <UserRound {...iconProps} />;
  return <Type {...iconProps} />;
};

const PermissionCheckbox = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`h-5 w-5 rounded border transition ${
      checked
        ? 'bg-[#5D2EFF]/10 border-[#5D2EFF] text-[#5D2EFF]'
        : 'bg-white border-[#D7D7E3]'
    } flex items-center justify-center`}
  >
    {checked && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.704 5.29a1 1 0 010 1.414l-7.07 7.071a1 1 0 01-1.415 0l-3.536-3.536a1 1 0 011.414-1.414L8.93 11.95l6.364-6.363a1 1 0 011.41-.297z"
          clipRule="evenodd"
        />
      </svg>
    )}
  </button>
);

const FilterDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = ['All', 'Allowed', 'Restricted'];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 text-xs font-medium text-[#5D2EFF]"
      >
        <Filter className="w-3 h-3" />
        {value}
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-md border border-[#E4E4EA] bg-white shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              className={`flex w-full items-center gap-2 px-3 py-2 text-xs text-left ${
                option === value
                  ? 'text-[#5D2EFF] bg-[#F7F4FF]'
                  : 'text-[#202224] hover:bg-gray-50'
              }`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              <Filter className="w-3 h-3" />
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarDropdown = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative mt-2" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#111322] bg-white border border-[#E4E4EA] rounded-[8px] hover:bg-gray-50 transition-colors"
      >
        <span>{value}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#7A7A85]" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-[8px] border border-[#E4E4EA] bg-white shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              className={`flex w-full items-center gap-2 px-3 py-2 text-xs text-left ${
                option === value
                  ? 'text-[#5D2EFF] bg-[#F7F4FF]'
                  : 'text-[#202224] hover:bg-gray-50'
              }`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const InlineDropdown = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#5D2EFF]"
      >
        {value}
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md border border-[#E4E4EA] bg-white shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              className={`flex w-full items-center gap-2 px-3 py-2 text-xs text-left ${
                option === value
                  ? 'text-[#5D2EFF] bg-[#F7F4FF]'
                  : 'text-[#202224] hover:bg-gray-50'
              }`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DropdownField = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-[#202224]">{label}</span>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#5D2EFF]"
        >
          {value}
          <ChevronDown className="w-3 h-3" />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 rounded-md border border-[#E4E4EA] bg-white shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option}
                className={`flex w-full items-center gap-2 px-3 py-2 text-xs text-left ${
                  option === value
                    ? 'text-[#5D2EFF] bg-[#F7F4FF]'
                    : 'text-[#202224] hover:bg-gray-50'
                }`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LeadFieldsMatrix = ({
  manualAddEnabled,
  bulkEditEnabled,
  onToggleManualAdd,
  onToggleBulkEdit,
  fieldSearch,
  setFieldSearch,
  columnFilters,
  onFilterChange,
  fieldPermissions,
  toggleFieldPermission,
  fields
}) => {
  const permissionKeys = ['view', 'edit', 'import', 'export'];

  const filteredFields = fields.filter((field) => {
    const matchesSearch = field.label
      .toLowerCase()
      .includes(fieldSearch.toLowerCase());

    if (!matchesSearch) return false;

    const perms = fieldPermissions[field.id];
    return permissionKeys.every((key) => {
      const filter = columnFilters[key];
      if (filter === 'All') return true;
      if (filter === 'Allowed') return perms[key];
      if (filter === 'Restricted') return !perms[key];
      return true;
    });
  });

  const columnMeta = permissionKeys.reduce((acc, key) => {
    const totalAllowed = fields.reduce(
      (count, field) => (fieldPermissions[field.id][key] ? count + 1 : count),
      0
    );
    const status =
      totalAllowed === fields.length
        ? 'All'
        : totalAllowed === 0
        ? 'None'
        : 'Partial';

    acc[key] = {
      count: totalAllowed,
      status
    };
    return acc;
  }, {});

  return (
    <div className="px-4 sm:px-6 py-4 space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#202224]">
            Manually add lead
          </span>
          <Switch checked={manualAddEnabled} onChange={onToggleManualAdd} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#202224]">Bulk Edit</span>
          <Switch checked={bulkEditEnabled} onChange={onToggleBulkEdit} />
        </div>
      </div>

      <div className="rounded-full border border-[#E4E4EA] px-4 py-2 flex items-center gap-2 bg-white">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="search"
          value={fieldSearch}
          onChange={(e) => setFieldSearch(e.target.value)}
          placeholder="Search fields"
          className="text-sm w-full focus:outline-none bg-transparent"
        />
      </div>

      <div className="overflow-x-auto rounded-[14px] border border-[#E4E4EA]">
        <table className="min-w-full bg-white text-xs">
          <thead>
            <tr className="text-xs text-[#7A7A85]">
              <th className="px-4 py-3 text-left font-semibold">Fields</th>
              {permissionKeys.map((key) => (
                <th key={key} className="px-4 py-3 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="font-semibold text-[#202224] flex items-center gap-2">
                        <input
                          type="checkbox"
                          readOnly
                          checked={false}
                          className="hidden"
                        />
                        <span className="capitalize">{key}</span>
                        <span className="text-[11px] font-medium text-[#6C6F80]">
                          ({columnMeta[key].count})
                        </span>
                      </p>
                      <p
                        className={`text-[11px] font-semibold ${
                          columnMeta[key].status === 'None'
                            ? 'text-[#E84E58]'
                            : columnMeta[key].status === 'All'
                            ? 'text-[#22A06B]'
                            : 'text-[#9F7AEA]'
                        }`}
                      >
                        {columnMeta[key].status}
                      </p>
                    </div>
                    <FilterDropdown
                      value={columnFilters[key]}
                      onChange={(option) => onFilterChange(key, option)}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredFields.map((field) => (
              <tr
                key={field.id}
                className="border-t border-[#F2F2F5] text-[#202224]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-[#F5F5FA] flex items-center justify-center">
                      <FieldIcon type={field.type} />
                    </div>
                    <span className="font-medium">{field.label}</span>
                  </div>
                </td>
                {permissionKeys.map((key) => (
                  <td key={key} className="px-4 py-3">
                    <PermissionCheckbox
                      checked={fieldPermissions[field.id][key]}
                      onChange={() => toggleFieldPermission(field.id, key)}
                    />
                  </td>
                ))}
              </tr>
            ))}

            {filteredFields.length === 0 && (
              <tr>
                <td
                  colSpan={permissionKeys.length + 1}
                  className="px-4 py-6 text-center text-[#7A7A85]"
                >
                  No fields match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ActionIcon = ({ type }) => {
  const iconProps = { className: 'w-3.5 h-3.5 text-[#7A7A85]' };
  if (type === 'globe') return <Globe {...iconProps} />;
  if (type === 'lightning') return <Zap {...iconProps} />;
  if (type === 'paperclip') return <Paperclip {...iconProps} />;
  if (type === 'rupee') return <IndianRupee {...iconProps} />;
  if (type === 'file') return <FileText {...iconProps} />;
  return <FileText {...iconProps} />;
};

const ActionsMatrix = ({
  actionSearch,
  setActionSearch,
  columnFilters,
  onFilterChange,
  actionPermissions,
  toggleActionPermission,
  actions,
  showConfidential,
  setShowConfidential,
  currentPage,
  setCurrentPage,
  itemsPerPage = 5
}) => {
  const permissionKeys = ['view', 'edit', 'create', 'import', 'export'];

  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(actionSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredActions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedActions = filteredActions.slice(startIndex, endIndex);

  const getColumnMeta = (key) => {
    const total = filteredActions.length;
    const allowed = filteredActions.filter(
      (action) => actionPermissions[action.id][key]
    ).length;
    const restricted = total - allowed;

    let status = 'None';
    if (allowed === total && total > 0) status = 'All';
    else if (allowed > 0) status = 'Partial';

    let count = total;
    if (columnFilters[key] === 'Allowed') count = allowed;
    else if (columnFilters[key] === 'Restricted') count = restricted;

    return { count, status, allowed, restricted };
  };

  const columnMeta = permissionKeys.reduce((acc, key) => {
    acc[key] = getColumnMeta(key);
    return acc;
  }, {});

  const getFilteredActionsForColumn = (key) => {
    if (columnFilters[key] === 'All') return paginatedActions;
    if (columnFilters[key] === 'Allowed')
      return paginatedActions.filter(
        (action) => actionPermissions[action.id][key]
      );
    return paginatedActions.filter(
      (action) => !actionPermissions[action.id][key]
    );
  };

  const toggleColumnAll = (key) => {
    const allChecked = paginatedActions.every(
      (action) => actionPermissions[action.id][key]
    );
    paginatedActions.forEach((action) => {
      if (actionPermissions[action.id][key] !== !allChecked) {
        toggleActionPermission(action.id, key);
      }
    });
  };

  return (
    <div className="p-4 sm:p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Search className="w-4 h-4 text-[#7A7A85]" />
        <input
          type="text"
          value={actionSearch}
          onChange={(e) => setActionSearch(e.target.value)}
          placeholder="Search"
          className="text-xs w-full focus:outline-none bg-transparent"
        />
      </div>

      <div className="overflow-x-auto rounded-[14px] border border-[#E4E4EA]">
        <table className="min-w-full bg-white text-xs">
          <thead>
            <tr className="text-xs text-[#7A7A85]">
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
              {permissionKeys.map((key) => (
                <th key={key} className="px-4 py-3 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="font-semibold text-[#202224] flex items-center gap-2">
                        <PermissionCheckbox
                          checked={paginatedActions.every(
                            (action) => actionPermissions[action.id][key]
                          )}
                          onChange={() => toggleColumnAll(key)}
                        />
                        <span className="capitalize">{key}</span>
                        <span className="text-[11px] font-medium text-[#6C6F80]">
                          ({columnMeta[key].count})
                        </span>
                      </p>
                      <p
                        className={`text-[11px] font-semibold ${
                          columnMeta[key].status === 'None'
                            ? 'text-[#E84E58]'
                            : columnMeta[key].status === 'All'
                            ? 'text-[#22A06B]'
                            : 'text-[#9F7AEA]'
                        }`}
                      >
                        {columnMeta[key].status}
                      </p>
                    </div>
                    <FilterDropdown
                      value={columnFilters[key]}
                      onChange={(option) => onFilterChange(key, option)}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedActions.map((action) => (
              <tr
                key={action.id}
                className="border-t border-[#F2F2F5] text-[#202224]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-[#F5F5FA] flex items-center justify-center">
                      <ActionIcon type={action.iconType} />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </div>
                </td>
                {permissionKeys.map((key) => (
                  <td key={key} className="px-4 py-3">
                    <PermissionCheckbox
                      checked={actionPermissions[action.id][key]}
                      onChange={() => toggleActionPermission(action.id, key)}
                    />
                  </td>
                ))}
              </tr>
            ))}

            {paginatedActions.length === 0 && (
              <tr>
                <td
                  colSpan={permissionKeys.length + 1}
                  className="px-4 py-6 text-center text-[#7A7A85]"
                >
                  No actions match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#7A7A85]">
            Show fields that are marked as confidential
          </span>
          <Switch
            checked={showConfidential}
            onChange={setShowConfidential}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 text-[#7A7A85]" />
          </button>
          <span className="text-xs text-[#7A7A85]">
            {startIndex + 1} - {Math.min(endIndex, filteredActions.length)} of{' '}
            {filteredActions.length}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="w-4 h-4 text-[#7A7A85]" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchControls = ({
  allowedOn,
  setAllowedOn,
  allowedEdit,
  setAllowedEdit,
  searchType,
  setSearchType
}) => {
  const allowedOnOptions = ['All Visible', 'Default Visible'];
  const allowedEditOptions = ['Default Editable', 'All Editable'];
  const searchTypeOptions = ['Phrase Match', 'Exact Match'];

  return (
    <div className="px-4 sm:px-6 py-4 space-y-4">
      <DropdownField
        label="Allowed to search on"
        value={allowedOn}
        options={allowedOnOptions}
        onChange={setAllowedOn}
      />
      <DropdownField
        label="Allowed to edit"
        value={allowedEdit}
        options={allowedEditOptions}
        onChange={setAllowedEdit}
      />
      <DropdownField
        label="Search Type"
        value={searchType}
        options={searchTypeOptions}
        onChange={setSearchType}
      />
    </div>
  );
};

const AccordionSection = ({
  section,
  isExpanded,
  toggleExpanded,
  switches,
  setSwitch
}) => (
  <div className="rounded-[14px] border border-[#E4E4EA] bg-white shadow-sm">
    <button
      onClick={() => toggleExpanded(section.id)}
      className="w-full flex items-center justify-between px-4 sm:px-5 py-3 text-left"
    >
      <div>
        <p className="text-sm font-medium text-[#202224]">{section.title}</p>
        {section.description && (
          <p className="text-xs text-[#6C727F] mt-0.5">{section.description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {section.action && (
          <button
            type="button"
            className="text-xs font-semibold text-[#5D2EFF] hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              section.action?.onClick?.();
            }}
          >
            {section.action.label}
          </button>
        )}
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </div>
    </button>

    {isExpanded && (
      <div className="border-t border-[#E4E4EA] divide-y divide-[#F2F2F5]">
        {section.renderContent ? (
          section.renderContent({ switches, setSwitch })
        ) : (
          section.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 sm:px-5 py-3"
            >
              <div>
                <p className="text-sm text-[#202224]">{item.label}</p>
                {item.subLabel && (
                  <p className="text-xs text-[#7A7A85] mt-0.5">
                    {item.subLabel}
                  </p>
                )}
              </div>
              <Switch
                checked={switches[item.id]}
                onChange={(value) => setSwitch(item.id, value)}
                disabled={item.disabled}
              />
            </div>
          ))
        )}
      </div>
    )}
  </div>
);

const LEAD_FIELDS = [
  {
    id: 'alternateNumber',
    label: 'Alternate Number',
    type: 'phone',
    permissions: { view: false, edit: false, import: false, export: false }
  },
  {
    id: 'city',
    label: 'City',
    type: 'text',
    permissions: { view: true, edit: false, import: false, export: false }
  },
  {
    id: 'expectedScore',
    label: 'Expected Score',
    type: 'number',
    permissions: { view: true, edit: false, import: false, export: false }
  },
  {
    id: 'attemptsNeet',
    label: 'How Many attempt in NEET',
    type: 'number',
    permissions: { view: true, edit: false, import: false, export: false }
  },
  {
    id: 'interestedCourse',
    label: 'Interested Course',
    type: 'text',
    permissions: { view: true, edit: false, import: false, export: false }
  },
  {
    id: 'name',
    label: 'Name',
    type: 'user',
    permissions: { view: true, edit: false, import: false, export: false }
  },
  {
    id: 'specialComment',
    label: 'Special Comment',
    type: 'text',
    permissions: { view: true, edit: false, import: false, export: false }
  },
  {
    id: 'state',
    label: 'State',
    type: 'text',
    permissions: { view: true, edit: false, import: false, export: false }
  },
  {
    id: 'studentCategory',
    label: 'Student Category',
    type: 'text',
    permissions: { view: true, edit: false, import: false, export: false }
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Number',
    type: 'phone',
    permissions: { view: false, edit: false, import: false, export: false }
  }
];

const ACTIONS = [
  {
    id: 'autoUpdate',
    label: 'Auto Update Lead Action',
    iconType: 'globe',
    permissions: { view: false, edit: false, create: false, import: false, export: false }
  },
  {
    id: 'customAPI',
    label: 'Custom API',
    iconType: 'lightning',
    permissions: { view: false, edit: false, create: false, import: false, export: false }
  },
  {
    id: 'file',
    label: 'File',
    iconType: 'paperclip',
    permissions: { view: false, edit: false, create: false, import: false, export: false }
  },
  {
    id: 'payment',
    label: 'Payment',
    iconType: 'rupee',
    permissions: { view: false, edit: false, create: false, import: false, export: false }
  },
  {
    id: 'userNote',
    label: 'User Note',
    iconType: 'file',
    permissions: { view: false, edit: false, create: false, import: false, export: false }
  }
];

const PermissionTemplateOffcanvas = ({ open, template, onClose }) => {
  const [expanded, setExpanded] = useState({
    admin: false,
    create: true,
    update: false,
    actions: false,
    mergeLeads: false,
    search: false
  });
  const [switches, setSwitches] = useState({
    manageStages: false,
    deleteLead: false,
    manageFields: false,
    accessDuplicates: false,
    mergeLeads: false,
    fromWhatsapp: false,
    fromPhone: false,
    quickSearch: true,
    advancedFilters: true,
    adminAccess: false,
    manuallyAddLead: true,
    bulkEdit: false
  });
  const [fieldSearch, setFieldSearch] = useState('');
  const [columnFilters, setColumnFilters] = useState({
    view: 'All',
    edit: 'All',
    import: 'All',
    export: 'All'
  });
  const [fieldPermissions, setFieldPermissions] = useState(() =>
    LEAD_FIELDS.reduce((acc, field) => {
      acc[field.id] = { ...field.permissions };
      return acc;
    }, {})
  );
  const [actionSearch, setActionSearch] = useState('');
  const [actionColumnFilters, setActionColumnFilters] = useState({
    view: 'All',
    edit: 'All',
    create: 'All',
    import: 'All',
    export: 'All'
  });
  const [actionPermissions, setActionPermissions] = useState(() =>
    ACTIONS.reduce((acc, action) => {
      acc[action.id] = { ...action.permissions };
      return acc;
    }, {})
  );
  const [showConfidential, setShowConfidential] = useState(false);
  const [actionCurrentPage, setActionCurrentPage] = useState(1);
  const [searchAllowedOn, setSearchAllowedOn] = useState('All Visible');
  const [searchAllowedEdit, setSearchAllowedEdit] = useState('Default Editable');
  const [searchType, setSearchType] = useState('Phrase Match');
  const [accessAccordionExpanded, setAccessAccordionExpanded] = useState(false);
  const [viewAccordionExpanded, setViewAccordionExpanded] = useState(false);
  const [selectedAccessItem, setSelectedAccessItem] = useState('Leads');
  const [teamAccessExpanded, setTeamAccessExpanded] = useState(false);
  const [teamSwitches, setTeamSwitches] = useState({
    canViewTeamPage: false,
    edit: false,
    addNew: false,
    delete: false,
    import: false,
    export: false
  });
  const [teamMemberVisibility, setTeamMemberVisibility] = useState('All');
  const [permissionsAccessExpanded, setPermissionsAccessExpanded] = useState(false);
  const [permissionsSwitches, setPermissionsSwitches] = useState({
    view: false,
    edit: false
  });

  useEffect(() => {
    if (!open) {
      setExpanded({
        admin: false,
        create: true,
        update: false,
        actions: false,
        mergeLeads: false,
        search: false
      });
      setActionSearch('');
      setActionCurrentPage(1);
      setShowConfidential(false);
      setSearchAllowedOn('All Visible');
      setSearchAllowedEdit('Default Editable');
      setSearchType('Phrase Match');
      setAccessAccordionExpanded(false);
      setViewAccordionExpanded(false);
      setSelectedAccessItem('Leads');
      setTeamAccessExpanded(false);
      setTeamSwitches({
        canViewTeamPage: false,
        edit: false,
        addNew: false,
        delete: false,
        import: false,
        export: false
      });
      setTeamMemberVisibility('All');
      setPermissionsAccessExpanded(false);
      setPermissionsSwitches({
        view: false,
        edit: false
      });
      return;
    }
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.removeEventListener('keydown', onEsc);
    };
  }, [open, onClose]);

  const toggleFieldPermission = (fieldId, permissionKey) => {
    setFieldPermissions((prev) => ({
      ...prev,
      [fieldId]: {
        ...prev[fieldId],
        [permissionKey]: !prev[fieldId][permissionKey]
      }
    }));
  };

  const toggleActionPermission = (actionId, permissionKey) => {
    setActionPermissions((prev) => ({
      ...prev,
      [actionId]: {
        ...prev[actionId],
        [permissionKey]: !prev[actionId][permissionKey]
      }
    }));
  };

  const sections = [
      {
        group: 'admin',
        id: 'admin',
        title: 'Admin Access',
        description: 'Critical permissions reserved for workspace owners.',
        items: [
          { id: 'manageStages', label: 'Create/manage lead stages' },
          { id: 'deleteLead', label: 'Delete lead' },
          { id: 'manageFields', label: 'Manage lead fields' },
          {
            id: 'accessDuplicates',
            label: 'Access all lead duplicates in this workspace'
          }
        ]
      },
      {
        group: 'user',
        id: 'create',
        title: 'Create leads from Whatsapp and Phone Calls',
        description: 'Control how new enquiries enter your pipeline.',
        items: [
          { id: 'fromWhatsapp', label: 'From Whatsapp' },
          { id: 'fromPhone', label: 'From Phone calls' }
        ]
      },
      {
        group: 'user',
        id: 'update',
        title: 'Add or update leads/modify fields',
        description: 'Allow edits on key lead properties.',
        action: { label: 'Setup lead view' },
        items: [
          {
            id: 'advancedFilters',
            label: 'Advanced filters',
            subLabel: 'Give access to smart lists and saved views'
          }
        ],
        renderContent: () => (
          <LeadFieldsMatrix
            manualAddEnabled={switches.manuallyAddLead}
            bulkEditEnabled={switches.bulkEdit}
            onToggleManualAdd={(value) => setSwitch('manuallyAddLead', value)}
            onToggleBulkEdit={(value) => setSwitch('bulkEdit', value)}
            fieldSearch={fieldSearch}
            setFieldSearch={setFieldSearch}
            columnFilters={columnFilters}
            onFilterChange={(key, option) =>
              setColumnFilters((prev) => ({ ...prev, [key]: option }))
            }
            fieldPermissions={fieldPermissions}
            toggleFieldPermission={toggleFieldPermission}
            fields={LEAD_FIELDS}
          />
        )
      },
      {
        group: 'user',
        id: 'actions',
        title: 'Actions',
        description: 'Access to bulk and critical actions.',
        renderContent: () => (
          <ActionsMatrix
            actionSearch={actionSearch}
            setActionSearch={setActionSearch}
            columnFilters={actionColumnFilters}
            onFilterChange={(key, option) =>
              setActionColumnFilters((prev) => ({ ...prev, [key]: option }))
            }
            actionPermissions={actionPermissions}
            toggleActionPermission={toggleActionPermission}
            actions={ACTIONS}
            showConfidential={showConfidential}
            setShowConfidential={setShowConfidential}
            currentPage={actionCurrentPage}
            setCurrentPage={setActionCurrentPage}
          />
        )
      },
      {
        group: 'user',
        id: 'mergeLeads',
        title: 'Merge leads',
        items: [
          { id: 'mergeLeads', label: 'Merge leads' }
        ]
      },
      {
        group: 'user',
        id: 'search',
        title: 'Search',
        description: 'Configure smart search presets.',
        renderContent: () => (
          <SearchControls
            allowedOn={searchAllowedOn}
            setAllowedOn={setSearchAllowedOn}
            allowedEdit={searchAllowedEdit}
            setAllowedEdit={setSearchAllowedEdit}
            searchType={searchType}
            setSearchType={setSearchType}
          />
        )
      }
    ];

  const toggleExpanded = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const setSwitch = (id, value) =>
    setSwitches((prev) => ({
      ...prev,
      [id]: value
    }));

  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute inset-y-0 right-0 w-full max-w-5xl bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-72 border-r border-[#EFEFF6] bg-[#F7F7FB] flex flex-col">
            <div className="p-6 border-b border-[#EFEFF6]">
              <p className="text-xs uppercase tracking-wide text-[#7A7A85]">
                Permission template
              </p>
              <div className="flex items-start justify-between gap-2 mt-2">
                <h2 className="text-xl font-semibold text-[#1F1F2C] leading-snug">
                  {template?.name || 'Permission Template'}
                </h2>
                <button className="p-1 rounded-md hover:bg-white">
                  <Edit3 className="w-4 h-4 text-[#5D2EFF]" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <button
                  onClick={() => setAccessAccordionExpanded(!accessAccordionExpanded)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#5D5BD0]" />
                    <p className="text-sm font-semibold text-[#111322]">
                      Access
                    </p>
                  </div>
                  {accessAccordionExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[#7A7A85]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#7A7A85]" />
                  )}
                </button>
                <p className="text-xs text-[#7A7A85] mt-1 ml-6">
                  Control features and data visibility.
                </p>
                {accessAccordionExpanded && (
                  <div className="mt-2 ml-6 space-y-1">
                    <button 
                      onClick={() => setSelectedAccessItem('Leads')}
                      className={`block w-full text-left text-sm py-1.5 px-2 hover:bg-gray-50 rounded-md transition-colors ${
                        selectedAccessItem === 'Leads' ? 'bg-[#F7F4FF] text-[#5D2EFF]' : 'text-[#111322]'
                      }`}
                    >
                      Leads
                    </button>
                    <button 
                      onClick={() => setSelectedAccessItem('Salesform')}
                      className={`block w-full text-left text-sm py-1.5 px-2 hover:bg-gray-50 rounded-md transition-colors ${
                        selectedAccessItem === 'Salesform' ? 'bg-[#F7F4FF] text-[#5D2EFF]' : 'text-[#111322]'
                      }`}
                    >
                      Salesform
                    </button>
                    <button 
                      onClick={() => setSelectedAccessItem('Team')}
                      className={`block w-full text-left text-sm py-1.5 px-2 hover:bg-gray-50 rounded-md transition-colors ${
                        selectedAccessItem === 'Team' ? 'bg-[#F7F4FF] text-[#5D2EFF]' : 'text-[#111322]'
                      }`}
                    >
                      Team
                    </button>
                    <button 
                      onClick={() => setSelectedAccessItem('Permissions')}
                      className={`block w-full text-left text-sm py-1.5 px-2 hover:bg-gray-50 rounded-md transition-colors ${
                        selectedAccessItem === 'Permissions' ? 'bg-[#F7F4FF] text-[#5D2EFF]' : 'text-[#111322]'
                      }`}
                    >
                      Permissions
                    </button>
                    <button 
                      onClick={() => setSelectedAccessItem('Calling')}
                      className={`block w-full text-left text-sm py-1.5 px-2 hover:bg-gray-50 rounded-md transition-colors ${
                        selectedAccessItem === 'Calling' ? 'bg-[#F7F4FF] text-[#5D2EFF]' : 'text-[#111322]'
                      }`}
                    >
                      Calling
                    </button>
                    <button 
                      onClick={() => setSelectedAccessItem('Reports')}
                      className={`block w-full text-left text-sm py-1.5 px-2 hover:bg-gray-50 rounded-md transition-colors ${
                        selectedAccessItem === 'Reports' ? 'bg-[#F7F4FF] text-[#5D2EFF]' : 'text-[#111322]'
                      }`}
                    >
                      Reports
                    </button>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() => setViewAccordionExpanded(!viewAccordionExpanded)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#5D5BD0]" />
                    <p className="text-sm font-semibold text-[#111322]">
                      View
                    </p>
                  </div>
                  {viewAccordionExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[#7A7A85]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#7A7A85]" />
                  )}
                </button>
                <p className="text-xs text-[#7A7A85] mt-1 ml-6">
                  Define layout and widgets.
                </p>
                {viewAccordionExpanded && (
                  <div className="mt-2 ml-6 space-y-1">
                    <button className="block w-full text-left text-sm text-[#111322] py-1.5 px-2 hover:bg-gray-50 rounded-md transition-colors">
                      Leads
                    </button>
                    <button className="block w-full text-left text-sm text-[#111322] py-1.5 px-2 hover:bg-gray-50 rounded-md transition-colors">
                      Dashboard
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto border-t border-[#EFEFF6] p-4 flex items-center gap-2 text-xs text-[#7A7A85]">
              <Info className="w-4 h-4" />
              Templates help reuse permission logic across roles.
            </div>
          </aside>

          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFEFF6]">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#7A7A85]">
                  Edit permissions
                </p>
                <h3 className="text-2xl font-semibold text-[#111322]">
                  {selectedAccessItem}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FBFBFD]">
              {selectedAccessItem === 'Team' ? (
                <div className="space-y-6">
                  {/* Can view team page */}
                  <div className="rounded-[14px] border border-[#E4E4EA] bg-white shadow-sm">
                    <div className="flex items-center justify-between px-4 sm:px-5 py-3">
                      <span className="text-sm text-[#202224]">Can view team page</span>
                      <Switch
                        checked={teamSwitches.canViewTeamPage}
                        onChange={(value) => setTeamSwitches(prev => ({ ...prev, canViewTeamPage: value }))}
                      />
                    </div>
                  </div>

                  {/* Team Access Accordion */}
                  <div className="rounded-[14px] border border-[#E4E4EA] bg-white shadow-sm">
                    <button
                      onClick={() => setTeamAccessExpanded(!teamAccessExpanded)}
                      className="w-full flex items-center justify-between px-4 sm:px-5 py-3 text-left"
                    >
                      <p className="text-sm font-medium text-[#202224]">Team Access</p>
                      {teamAccessExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    {teamAccessExpanded && (
                      <div className="border-t border-[#E4E4EA] divide-y divide-[#F2F2F5]">
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3">
                          <span className="text-sm text-[#202224]">Edit</span>
                          <Switch
                            checked={teamSwitches.edit}
                            onChange={(value) => setTeamSwitches(prev => ({ ...prev, edit: value }))}
                          />
                        </div>
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3">
                          <span className="text-sm text-[#202224]">Add new</span>
                          <Switch
                            checked={teamSwitches.addNew}
                            onChange={(value) => setTeamSwitches(prev => ({ ...prev, addNew: value }))}
                          />
                        </div>
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3">
                          <span className="text-sm text-[#202224]">Delete</span>
                          <Switch
                            checked={teamSwitches.delete}
                            onChange={(value) => setTeamSwitches(prev => ({ ...prev, delete: value }))}
                          />
                        </div>
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3">
                          <span className="text-sm text-[#202224]">Import</span>
                          <Switch
                            checked={teamSwitches.import}
                            onChange={(value) => setTeamSwitches(prev => ({ ...prev, import: value }))}
                          />
                        </div>
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3">
                          <span className="text-sm text-[#202224]">Export</span>
                          <Switch
                            checked={teamSwitches.export}
                            onChange={(value) => setTeamSwitches(prev => ({ ...prev, export: value }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Team Member Visibility */}
                  <div className="rounded-[14px] border border-[#E4E4EA] bg-white shadow-sm">
                    <div className="flex items-center justify-between px-4 sm:px-5 py-3">
                      <span className="text-sm font-semibold text-[#202224]">Team Member Visibility</span>
                      <InlineDropdown
                        value={teamMemberVisibility}
                        onChange={setTeamMemberVisibility}
                        options={['All', 'Assigned Only', 'None']}
                      />
                    </div>
                  </div>
                </div>
              ) : selectedAccessItem === 'Permissions' ? (
                <div className="space-y-6">
                  {/* Access Accordion */}
                  <div className="rounded-[14px] border border-[#E4E4EA] bg-white shadow-sm">
                    <button
                      onClick={() => setPermissionsAccessExpanded(!permissionsAccessExpanded)}
                      className="w-full flex items-center justify-between px-4 sm:px-5 py-3 text-left"
                    >
                      <p className="text-sm font-medium text-[#202224]">Access</p>
                      {permissionsAccessExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    {permissionsAccessExpanded && (
                      <div className="border-t border-[#E4E4EA] divide-y divide-[#F2F2F5]">
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3">
                          <span className="text-sm text-[#202224]">View</span>
                          <Switch
                            checked={permissionsSwitches.view}
                            onChange={(value) => setPermissionsSwitches(prev => ({ ...prev, view: value }))}
                          />
                        </div>
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3">
                          <span className="text-sm text-[#202224]">Edit</span>
                          <Switch
                            checked={permissionsSwitches.edit}
                            onChange={(value) => setPermissionsSwitches(prev => ({ ...prev, edit: value }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {sections
                    .filter((section) => section.group === 'admin')
                    .length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-[#202224] mb-4">
                          Admin Access
                        </p>
                        <div className="space-y-4 mb-6">
                          {sections
                            .filter((section) => section.group === 'admin')
                            .map((section) => (
                              <AccordionSection
                                key={section.id}
                                section={section}
                                isExpanded={expanded[section.id]}
                                toggleExpanded={toggleExpanded}
                                switches={switches}
                                setSwitch={setSwitch}
                              />
                            ))}
                        </div>
                      </div>
                    )}

                  <div>
                    <p className="text-sm font-semibold text-[#202224] mb-4">
                      User Access
                    </p>
                    <div className="space-y-4">
                      {sections
                        .filter((section) => section.group === 'user')
                        .map((section) => (
                          <AccordionSection
                            key={section.id}
                            section={section}
                            isExpanded={expanded[section.id]}
                            toggleExpanded={toggleExpanded}
                            switches={switches}
                            setSwitch={setSwitch}
                          />
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#EFEFF6] px-6 py-4 bg-white">
              <div className="text-xs text-[#7A7A85]">
                Changes auto-save to this template.
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-[10px] border border-[#D7D7E3] text-sm font-medium text-[#111322]"
                >
                  Close
                </button>
                <button className="px-5 py-2 rounded-[10px] bg-[#5D5BD0] text-white text-sm font-semibold shadow-sm">
                  Save template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionTemplateOffcanvas;


