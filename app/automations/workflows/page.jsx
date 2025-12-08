'use client';

import React, { useState } from 'react';
import WorkflowsHeader from './components/WorkflowsHeader';
import WorkflowsTabs from './components/WorkflowsTabs';
import WorkflowsFilters from './components/WorkflowsFilters';
import WorkflowsTable from './components/WorkflowsTable';
import WorkflowNameModal from './components/WorkflowNameModal';
import DeleteWorkflowModal from './components/DeleteWorkflowModal';
import SelectEventOffcanvas from './components/SelectEventOffcanvas';

export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState('published');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [eventTypeFilter, setEventTypeFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState(null);
  const [workflowToCopy, setWorkflowToCopy] = useState(null);
  const [isCopyMode, setIsCopyMode] = useState(false);
  const [isEventOffcanvasOpen, setIsEventOffcanvasOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample data - replace with actual data fetching
  const [workflows, setWorkflows] = useState([
    {
      id: '1',
      name: 'whatsapp messge autoflow',
      eventType: 'WhatsApp Lead Creation',
      eventIcon: 'whatsapp',
      status: true,
      statusUpdatedOn: '1M ago',
      statusUpdatedBy: { name: 'VIBUTI', logo: 'V' },
      isDraft: false
    },
    {
      id: '2',
      name: 'Facebook leads',
      eventType: 'Facebook Lead Creation',
      eventIcon: 'facebook',
      status: true,
      statusUpdatedOn: '10M ago',
      statusUpdatedBy: { name: 'VIBUTI', logo: 'V' },
      isDraft: false
    },
    {
      id: '3',
      name: 'office visited',
      eventType: 'Lead Status Change +1',
      eventIcon: 'document',
      status: true,
      statusUpdatedOn: '2y ago',
      statusUpdatedBy: { name: 'VIBUTI', logo: 'V' },
      isDraft: false
    },
    {
      id: '4',
      name: 'zoom session chat',
      eventType: 'WhatsApp Replied',
      eventIcon: 'whatsapp',
      status: true,
      statusUpdatedOn: '1M ago',
      statusUpdatedBy: { name: 'VIBUTI', logo: 'V' },
      isDraft: false
    },
    {
      id: '5',
      name: 'One to one',
      eventType: 'WhatsApp Replied',
      eventIcon: 'whatsapp',
      status: true,
      statusUpdatedOn: '1M ago',
      statusUpdatedBy: { name: 'VIBUTI', logo: 'V' },
      isDraft: false
    },
    {
      id: '6',
      name: 'Manual entry',
      eventType: 'Lead Creation',
      eventIcon: 'gear',
      status: true,
      statusUpdatedOn: '1M ago',
      statusUpdatedBy: { name: 'VIBUTI', logo: 'V' },
      isDraft: false
    },
    {
      id: '7',
      name: 'Calling Flow',
      eventType: 'Lead Creation',
      eventIcon: 'phone',
      status: true,
      statusUpdatedOn: '1M ago',
      statusUpdatedBy: { name: 'VIBUTI', logo: 'V' },
      isDraft: true
    }
  ]);

  // Handle status toggle
  const handleStatusToggle = (id) => {
    setWorkflows(prevWorkflows =>
      prevWorkflows.map(workflow =>
        workflow.id === id
          ? { ...workflow, status: !workflow.status }
          : workflow
      )
    );
  };

  // Filter workflows based on active tab, search, and filters
  const filteredWorkflows = workflows.filter(workflow => {
    const matchesTab = activeTab === 'published' ? !workflow.isDraft : workflow.isDraft;
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'On' ? workflow.status : !workflow.status);
    const matchesEventType = eventTypeFilter === 'All' || workflow.eventType.includes(eventTypeFilter);
    
    return matchesTab && matchesSearch && matchesStatus && matchesEventType;
  });

  return (
    <div className="p-3 md:p-5 bg-[#F5F6FA] min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <WorkflowsHeader onCreateWorkflow={() => {
          setIsCopyMode(false);
          setWorkflowToCopy(null);
          setIsEventOffcanvasOpen(true);
        }} />
        
        <div className="mt-6 bg-white rounded-[10px] shadow-sm">
          <WorkflowsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="p-3 md:p-5">
            <WorkflowsFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              eventTypeFilter={eventTypeFilter}
              onEventTypeFilterChange={setEventTypeFilter}
            />
            
            <div className="mt-4 mb-4">
              <p className="text-sm text-gray-600">
                {filteredWorkflows.length} matching flowcharts found
              </p>
            </div>
            
            <WorkflowsTable 
              workflows={filteredWorkflows}
              activeTab={activeTab}
              onStatusToggle={handleStatusToggle}
              onCopy={(workflow) => {
                setIsCopyMode(true);
                setWorkflowToCopy(workflow);
                setIsModalOpen(true);
              }}
              onDelete={(workflow) => {
                setWorkflowToDelete(workflow);
                setDeleteModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Workflow Name Modal */}
      <WorkflowNameModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsCopyMode(false);
          setWorkflowToCopy(null);
        }}
        onSave={(name) => {
          if (isCopyMode && workflowToCopy) {
            // Copy workflow logic
            const newWorkflow = {
              ...workflowToCopy,
              id: Date.now().toString(),
              name: name,
              status: false, // New copy starts as OFF
              statusUpdatedOn: 'Just now',
              isDraft: workflowToCopy.isDraft
            };
            setWorkflows(prevWorkflows => [...prevWorkflows, newWorkflow]);
            console.log('Copied workflow:', name);
          } else {
            // Create new workflow logic
            console.log('Creating workflow:', name);
            // Add your workflow creation logic here
          }
          setIsModalOpen(false);
          setIsCopyMode(false);
          setWorkflowToCopy(null);
        }}
        initialName={isCopyMode && workflowToCopy ? `${workflowToCopy.name}-clone` : ''}
        buttonText={isCopyMode ? 'Copy' : 'Create'}
      />

      {/* Delete Workflow Modal */}
      <DeleteWorkflowModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setWorkflowToDelete(null);
        }}
        onConfirm={() => {
          if (workflowToDelete) {
            setWorkflows(prevWorkflows => 
              prevWorkflows.filter(workflow => workflow.id !== workflowToDelete.id)
            );
            setDeleteModalOpen(false);
            setWorkflowToDelete(null);
          }
        }}
        workflowName={workflowToDelete?.name || ''}
      />

      {/* Select Event Offcanvas */}
      <SelectEventOffcanvas
        open={isEventOffcanvasOpen}
        onClose={() => {
          setIsEventOffcanvasOpen(false);
          setSelectedEvent(null);
        }}
        onNext={(event) => {
          setSelectedEvent(event);
          setIsEventOffcanvasOpen(false);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
}

