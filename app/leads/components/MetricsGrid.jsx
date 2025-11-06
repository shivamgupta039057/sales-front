'use client';

import React from 'react';
import { Users, Box, BarChart3, Clock, ArrowUp, ArrowDown } from 'lucide-react';

const metrics = [
  {
    title: 'Total Leads',
    value: '250',
    trend: '+15% from last month',
    trendType: 'positive',
    icon: Users,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    iconShape: 'circle'
  },
  {
    title: 'Converted',
    value: '75',
    trend: '26.5% conversion rate',
    trendType: 'positive',
    icon: Box,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    iconShape: 'square'
  },
  {
    title: 'Follow-ups Today',
    value: '12',
    trend: '3 overdue',
    trendType: 'negative',
    icon: BarChart3,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    iconShape: 'circle'
  },
  {
    title: 'Revenue',
    value: '₹9.8L',
    trend: '+22% from last month',
    trendType: 'positive',
    icon: Clock,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    iconShape: 'circle'
  }
];

const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-[10px] shadow-sm border border-gray-100 p-4 sm:p-6 relative overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <div className={`${metric.iconBg} ${metric.iconShape === 'circle' ? 'rounded-full' : 'rounded-[10px]'} p-2 sm:p-3`}>
                <IconComponent className={`${metric.iconColor} w-5 h-5 sm:w-6 sm:h-6`} />
              </div>
            </div>
            <div className="pr-16 sm:pr-20">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{metric.value}</p>
              <div className="flex items-center gap-2">
                {metric.trendType === 'positive' ? (
                  <>
                    <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <span className="text-xs sm:text-sm text-green-600 font-medium">{metric.trend}</span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                    <span className="text-xs sm:text-sm text-red-600 font-medium">{metric.trend}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;


