'use client';

import React from 'react';
import LeadManagement from '../LeadManagement/LeadManagement';

const LeadsPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-20">
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <section className="h-full flex-1 flex flex-col overflow-hidden p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-sm p-3 md:p-6 overflow-y-auto scrollable-items">
              <LeadManagement />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LeadsPage;
