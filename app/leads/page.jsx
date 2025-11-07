"use client";
import LeadsPage from '@/components/leads/Leads'
import React, { useState } from 'react'
import TableTopBar from './components/TableTopBar';
import DataTable from './components/DataTable';
import LeadViewModal from './components/LeadViewModal';
import LeadAddModal from './components/LeadAddModal';
import ReassignLeadsModal from './components/ReassignLeadsModal';
import LeadStages from './components/LeadStages';
import FiltersBar from './components/FiltersBar';

const page = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [isLeadAddOpen, setIsLeadAddOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);
  return (
    <div className="p-5">
              <FiltersBar onCreate={() => setIsLeadAddOpen(true)} />
            <TableTopBar todayCount={5} overdueCount={5} onBulkActionChange={(val)=>{ if (val==='reassign') setReassignOpen(true); }} />
                <DataTable
                  columns={[
                    { key: 'name', header: 'Name', sortable: true },
                    { key: 'status', header: 'Status', sortable: true },
                    { key: 'rating', header: 'Rating', sortable: true, align: 'right' },
                    { key: 'assignee', header: 'Assignee' },
                    { key: 'createdOn', header: 'Created On', sortable: true },
                  ]}
                  rows={[
                    { id: '1', name: 'Mahendra Yadav', status: 'Just Curious', rating: 25, assignee: '--', createdOn: '5d Ago' },
                    { id: '2', name: 'Mahendra Yadav', status: 'Just Curious', rating: 25, assignee: '--', createdOn: '5d Ago' },
                    { id: '3', name: 'Mahendra Yadav', status: 'Lost', rating: 60, assignee: '--', createdOn: '5d Ago' },
                    { id: '4', name: 'Mahendra Yadav', status: 'Not Response', rating: 99, assignee: '--', createdOn: '5d Ago' },
                    { id: '5', name: 'Mahendra Yadav', status: 'Lost', rating: 99, assignee: '--', createdOn: '5d Ago' },
                    { id: '6', name: 'Mahendra Yadav', status: 'Just Curious', rating: 99, assignee: '--', createdOn: '5d Ago' },
                    { id: '7', name: 'Mahendra Yadav', status: 'Lost', rating: 99, assignee: '--', createdOn: '5d Ago' },
                    { id: '8', name: 'Mahendra Yadav', status: 'Just Curious', rating: 99, assignee: '--', createdOn: '5d Ago' },
                    { id: '9', name: 'Mahendra Yadav', status: 'Lost', rating: 99, assignee: '--', createdOn: '5d Ago' },
                    { id: '10', name: 'Mahendra Yadav', status: 'Just Curious', rating: 99, assignee: '--', createdOn: '5d Ago' },
                  ]}
                  pageSize={10}
                  onRowClick={(row) => setSelectedLead(row)}
                />  
               
               <LeadViewModal open={!!selectedLead} onClose={() => setSelectedLead(null)} lead={selectedLead} />  
                <LeadAddModal open={isLeadAddOpen} onClose={() => setIsLeadAddOpen(false)} onSave={(data)=>{  }} /> 
                <ReassignLeadsModal
                  open={reassignOpen}
                  onClose={()=>setReassignOpen(false)}
                  staff={[
                    { id:'1', initials:'RK', name:'Rajendra Kumar', role:'Admin', percent:50 },
                    { id:'2', initials:'RK', name:'Rajendra Kumar', role:'Admin', percent:50 },
                    { id:'3', initials:'RK', name:'Rajendra Kumar', role:'Admin', percent:50 },
                    { id:'4', initials:'RK', name:'Rajendra Kumar', role:'Admin', percent:50 },
                    { id:'5', initials:'RK', name:'Rajendra Kumar', role:'Admin', percent:50 },
                    { id:'6', initials:'RK', name:'Rajendra Kumar', role:'Admin', percent:50 },
                  ]}
                  onAssign={()=>setReassignOpen(false)}
                /> 
               <LeadStages/> 
    </div>
  )
}

export default page