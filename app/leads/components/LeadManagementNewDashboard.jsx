'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Box, 
  RefreshCw, 
  Funnel, 
  RotateCcw, 
  Download, 
  Upload,
  ChevronDown,
  Filter,
  TrendingUp
} from 'lucide-react';

const LeadManagementNewDashboard = () => {
  const [salesRepsFilter, setSalesRepsFilter] = useState('Today');

  const salesRepsData = [
    { assign: 'Adela Parkson', calls: 'AB', duration: '25 min', revenue: 'xxx' },
    { assign: 'Adela Parkson', calls: 'AB', duration: '25 min', revenue: 'xxx' },
    { assign: 'Adela Parkson', calls: 'AB', duration: '25 min', revenue: 'xxx' },
    { assign: 'Adela Parkson', calls: 'AB', duration: '25 min', revenue: 'xxx' },
  ];

  const leadHistoryData = [
    { source: 'Facebook', totalLeads: 100, converted: 30, totalRevenue: 'xxx' },
    { source: 'Website', totalLeads: 200, converted: 50, totalRevenue: 'xxx' },
    { source: 'Google', totalLeads: 150, converted: 20, totalRevenue: 'xxx' },
    { source: 'Calls', totalLeads: 'AB', converted: '25 min', totalRevenue: 'xxx' },
  ];

  const statusWiseData = [
    { status: 'Just Curious', count: 100, share: '30%' },
    { status: 'Interested', count: 100, share: '30%' },
    { status: 'Deal Closed', count: 100, share: '30%' },
    { status: 'Lost', count: 100, share: '30%' },
    { status: 'MBBS Abroad', count: 100, share: '30%' },
  ];

  // Chart data points for Campaigning Status
  const chartData = [
    { month: 'SEP', value: 200 },
    { month: 'OCT', value: 250 },
    { month: 'NOV', value: 300 },
    { month: 'DEC', value: 420 },
    { month: 'JAN', value: 350 },
    { month: 'FEB', value: 400 },
    { month: 'MAR', value: 450 },
  ];

  const maxValue = 500;
  const chartHeight = 200;

  return (
    <div className="w-full space-y-6">
      {/* Header with Gradient Title */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-[10px] p-6 text-white">
        <h1 className="text-3xl font-bold">Lead Management</h1>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Leads Card */}
        <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">250</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">Total Leads</h3>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Today</span>
              <span className="font-medium text-gray-900">50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Week</span>
              <span className="font-medium text-gray-900">200</span>
            </div>
          </div>
        </div>

        {/* Total Converted Card */}
        <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-[10px] bg-yellow-100 flex items-center justify-center">
              <Box className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">75</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">Total Converted</h3>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Today</span>
              <span className="font-medium text-gray-900">50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Week</span>
              <span className="font-medium text-gray-900">200</span>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">₹9.8L</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">Total Revenue</h3>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Today</span>
              <span className="font-medium text-gray-900">₹0.8L</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Week</span>
              <span className="font-medium text-gray-900">₹9L</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <button className="p-2 rounded-[10px] hover:bg-gray-100 transition-colors">
            <Funnel className="w-5 h-5 text-gray-600" />
          </button>
          <div className="h-8 w-px bg-gray-300" />
          <input
            type="text"
            placeholder="Mobile Number"
            className="px-4 h-10 border border-[#D5D5D5] rounded-[10px] text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Student Name"
            className="px-4 h-10 border border-[#D5D5D5] rounded-[10px] text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
          />
          <div className="relative">
            <select className="px-4 h-10 pr-8 border border-[#D5D5D5] rounded-[10px] text-[13px] text-[#202224] focus:outline-none appearance-none bg-[#f5f9ff]">
              <option>Lead Status</option>
              <option>Active</option>
              <option>Converted</option>
              <option>Lost</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-[10px] flex items-center gap-2 transition-colors">
            <RotateCcw className="w-4 h-4" />
            Reset Filter
          </button>
          <div className="flex-1" />
          <button className="p-2 rounded-[10px] hover:bg-gray-100 transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-[10px] hover:bg-gray-100 transition-colors">
            <Upload className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Sales Reps Table */}
          <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Sales Reps.</h2>
              <div className="relative">
                <select
                  value={salesRepsFilter}
                  onChange={(e) => setSalesRepsFilter(e.target.value)}
                  className="px-3 h-10 pr-8 border border-[#D5D5D5] rounded-[10px] text-[13px] text-[#202224] focus:outline-none appearance-none bg-[#f5f9ff]"
                >
                  <option>Today</option>
                  <option>Week</option>
                  <option>Month</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Assign</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Calls</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Duration</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {salesRepsData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{row.assign}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{row.calls}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{row.duration}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{row.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Campaigning Status Chart */}
          <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Campaigning Status</h2>
            <div className="relative h-[240px]">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-[200px] flex flex-col justify-between text-xs text-gray-500 pr-2">
                {[500, 400, 300, 200, 100].map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
              
              {/* Chart area */}
              <div className="ml-8 relative h-[200px]">
                <svg className="w-full h-full" viewBox="0 0 420 200" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  {[500, 400, 300, 200, 100].map((value) => {
                    const y = 200 - (value / maxValue) * 200;
                    return (
                      <line
                        key={value}
                        x1="0"
                        y1={y}
                        x2="420"
                        y2={y}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    );
                  })}
                  
                  {/* Purple line (main data) */}
                  <polyline
                    points={chartData.map((d, idx) => {
                      const x = (idx * 60) + 30;
                      const y = 200 - (d.value / maxValue) * 200;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#9333EA"
                    strokeWidth="2"
                  />
                  
                  {/* Data points */}
                  {chartData.map((d, idx) => {
                    const x = (idx * 60) + 30;
                    const y = 200 - (d.value / maxValue) * 200;
                    return (
                      <g key={idx}>
                        <circle
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#9333EA"
                        />
                        {d.month === 'DEC' && (
                          <text
                            x={x}
                            y={y - 10}
                            textAnchor="middle"
                            fill="#9333EA"
                            fontSize="12"
                            fontWeight="500"
                          >
                            420
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-around mt-2">
                  {chartData.map((d, idx) => (
                    <span key={idx} className="text-xs text-gray-500">{d.month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Lead History Table */}
          <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Lead History</h2>
              <button className="p-1.5 rounded-[10px] hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Source</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Total Leads</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Converted</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {leadHistoryData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">{row.source}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{row.totalLeads}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{row.converted}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{row.totalRevenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Report Leads Status Wise Table */}
          <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Leads Status Wise</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Count</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">% Share</th>
                  </tr>
                </thead>
                <tbody>
                  {statusWiseData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                          <span>{row.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{row.count}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{row.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadManagementNewDashboard;

