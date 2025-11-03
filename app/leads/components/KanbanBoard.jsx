'use client';

import React from 'react';
import { Phone, MapPin, Calendar, User, Edit, CreditCard, MoreVertical } from 'lucide-react';

const LeadCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 border border-gray-200">
      <h3 className="font-bold text-sm md:text-base text-gray-900 mb-2 md:mb-3">Rohit Verma</h3>
      <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
        <div className="flex items-center gap-1.5 md:gap-2">
          <Phone className="w-3 h-3 md:w-4 md:h-4" />
          <span className="break-all">+91 9876543216</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
          <span>Madhya Pradesh</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
          <span>10 July 2025</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3">
        <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-gray-200 text-gray-700">15420</span>
        <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-gray-200 text-gray-700">NEET UG</span>
        <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-yellow-300 text-yellow-800">New</span>
      </div>
      <div className="flex justify-around items-center mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-100">
        <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
        <Edit className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
        <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
        <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
        <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
        <MoreVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
      </div>
    </div>
  );
};

const Column = ({ title, headerClass, children }) => (
  <div className="flex-shrink-0 w-[280px] sm:w-80">
    <div className={`${headerClass} rounded-t-lg p-2 md:p-3`}>
      <h2 className="font-semibold text-xs md:text-sm">{title}</h2>
    </div>
    <div className="bg-gray-50 rounded-b-lg p-2 md:p-3 space-y-2 md:space-y-3 min-h-[300px] md:min-h-[400px]">
      {children}
    </div>
  </div>
);

const KanbanBoard = () => {
  return (
    <div className="overflow-x-auto scrollable-items pb-4 -mx-2 sm:-mx-4 px-2 sm:px-4">
      <div className="flex gap-3 md:gap-4 min-w-max">
        <Column title="New, Contact Attempted, On Hold" headerClass="bg-yellow-100 text-yellow-800">
          {[1,2,3].map((i) => (
            <LeadCard key={`new-${i}`} />
          ))}
        </Column>
        <Column title="Contacted, Interested, Follow-Up, In Discussion" headerClass="bg-teal-100 text-teal-800">
          {[1,2].map((i) => (
            <LeadCard key={`contacted-${i}`} />
          ))}
        </Column>
        <Column title="Converted Lead" headerClass="bg-blue-100 text-blue-800">
          {[1,2].map((i) => (
            <LeadCard key={`converted-${i}`} />
          ))}
        </Column>
      </div>
    </div>
  );
};

export default KanbanBoard;



