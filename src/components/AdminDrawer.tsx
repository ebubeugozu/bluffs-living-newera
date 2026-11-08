import React, { useState } from 'react';
import { X, Download, Trash2, Search, Mail, Phone, Calendar, UserCheck, ShieldCheck, Filter } from 'lucide-react';
import { InquirySubmission, ApplicationSubmission } from '../types';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: InquirySubmission[];
  applications: ApplicationSubmission[];
  onDeleteInquiry: (id: string) => void;
  onDeleteApplication: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: InquirySubmission['status']) => void;
  onUpdateAppStatus: (id: string, status: ApplicationSubmission['status']) => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  inquiries,
  applications,
  onDeleteInquiry,
  onDeleteApplication,
  onUpdateInquiryStatus,
  onUpdateAppStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'applications'>('inquiries');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filtered lists
  const filteredInquiries = inquiries.filter(
    (i) =>
      i.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.inquiryType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApplications = applications.filter(
    (a) =>
      a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.currentCityState.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CSV Export functions
  const exportInquiriesCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Inquiry Type', 'Status', 'Message'];
    const rows = inquiries.map((i) => [
      `"${i.id}"`,
      `"${i.createdAt}"`,
      `"${i.fullName.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone || ''}"`,
      `"${i.inquiryType}"`,
      `"${i.status}"`,
      `"${i.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `the_bluffs_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportApplicationsCSV = () => {
    if (applications.length === 0) return;
    const headers = [
      'ID',
      'Date',
      'Full Name',
      'Email',
      'Phone',
      'Contact Method',
      'Location',
      'Interest Type',
      'Preferred Homesite',
      'Timeframe',
      'Occupants',
      'Status',
      'Notes',
    ];
    const rows = applications.map((a) => [
      `"${a.id}"`,
      `"${a.createdAt}"`,
      `"${a.fullName.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.phone}"`,
      `"${a.preferredContact}"`,
      `"${a.currentCityState}"`,
      `"${a.interestType}"`,
      `"${a.preferredHomesite}"`,
      `"${a.timeframe}"`,
      `"${a.occupants}"`,
      `"${a.status}"`,
      `"${(a.additionalInfo || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `the_bluffs_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl h-full bg-[#183B2B] text-[#F7F4EC] border-l border-[#A6B49A]/30 flex flex-col shadow-2xl">
        
        {/* HEADER */}
        <div className="p-6 border-b border-[#A6B49A]/20 flex items-center justify-between bg-[#10291F]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#B28B5B]/20 text-[#B28B5B] rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F7F4EC]">
                Community Administration Hub
              </h2>
              <p className="text-xs text-[#A6B49A]">
                Secure submission log for Info@bluffsnewera.com · Linden, TN
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#A6B49A] hover:text-[#FFFFFF] rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* TABS & SEARCH CONTROLS */}
        <div className="p-4 bg-[#143224] border-b border-[#A6B49A]/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('inquiries');
                setSelectedRecordId(null);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#F7F4EC] text-[#183B2B]'
                  : 'bg-[#10291F] text-[#D9D0BF] hover:text-[#FFFFFF]'
              }`}
            >
              Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('applications');
                setSelectedRecordId(null);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-[#F7F4EC] text-[#183B2B]'
                  : 'bg-[#10291F] text-[#D9D0BF] hover:text-[#FFFFFF]'
              }`}
            >
              Resident Applications ({applications.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-[#A6B49A]" />
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-[#10291F] border border-[#A6B49A]/30 rounded-md text-[#F7F4EC] placeholder-[#A6B49A] focus:outline-none focus:border-[#B28B5B]"
              />
            </div>

            <button
              onClick={activeTab === 'inquiries' ? exportInquiriesCSV : exportApplicationsCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* CONTENT LIST & DETAIL SPLIT */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* LIST VIEW */}
          <div className="w-full md:w-1/2 overflow-y-auto divide-y divide-[#A6B49A]/15 border-r border-[#A6B49A]/20">
            {activeTab === 'inquiries' ? (
              filteredInquiries.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#A6B49A]">
                  No inquiries found. Submissions from the Request Information page appear here automatically.
                </div>
              ) : (
                filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedRecordId(inq.id)}
                    className={`p-4 hover:bg-[#10291F]/60 cursor-pointer transition-colors ${
                      selectedRecordId === inq.id ? 'bg-[#10291F] border-l-4 border-[#B28B5B]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-[#F7F4EC] truncate">
                        {inq.fullName}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded text-[#10291F] bg-[#A6B49A] font-semibold">
                        {inq.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#A6B49A] mb-1">{inq.inquiryType}</div>
                    <p className="text-xs text-[#D9D0BF]/80 line-clamp-2">{inq.message}</p>
                    <div className="mt-2 text-[10px] text-[#A6B49A]/60 flex items-center justify-between">
                      <span>{inq.email}</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )
            ) : filteredApplications.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#A6B49A]">
                No applications on file. Submissions from the Apply page appear here automatically.
              </div>
            ) : (
              filteredApplications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedRecordId(app.id)}
                  className={`p-4 hover:bg-[#10291F]/60 cursor-pointer transition-colors ${
                    selectedRecordId === app.id ? 'bg-[#10291F] border-l-4 border-[#B28B5B]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-[#F7F4EC] truncate">
                      {app.fullName}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded text-[#10291F] bg-[#B28B5B] font-semibold">
                      {app.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#A6B49A] mb-1">
                    {app.interestType} · {app.currentCityState}
                  </div>
                  <div className="text-xs text-[#D9D0BF]/80">
                    Desired: {app.timeframe} · {app.occupants} occupants
                  </div>
                  <div className="mt-2 text-[10px] text-[#A6B49A]/60 flex items-center justify-between">
                    <span>{app.email}</span>
                    <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DETAIL VIEW */}
          <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-[#10291F]/40 flex flex-col justify-between">
            {selectedRecordId ? (
              activeTab === 'inquiries' ? (
                (() => {
                  const item = inquiries.find((i) => i.id === selectedRecordId);
                  if (!item) return null;
                  return (
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#A6B49A] block mb-1">
                          INQUIRY REF: {item.id}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-[#F7F4EC]">
                          {item.fullName}
                        </h3>
                        <div className="text-xs text-[#B28B5B] mt-0.5">
                          Received: {new Date(item.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="bg-[#183B2B] p-4 rounded-lg space-y-2 border border-[#A6B49A]/20 text-xs">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-[#A6B49A]" />
                          <a href={`mailto:${item.email}`} className="text-[#F7F4EC] hover:underline">
                            {item.email}
                          </a>
                        </div>
                        {item.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-[#A6B49A]" />
                            <a href={`tel:${item.phone}`} className="text-[#F7F4EC] hover:underline">
                              {item.phone}
                            </a>
                          </div>
                        )}
                        <div className="pt-2 border-t border-[#A6B49A]/15">
                          <span className="text-[#A6B49A]">Topic:</span>{' '}
                          <span className="text-[#F7F4EC] font-semibold">{item.inquiryType}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#A6B49A] mb-2 font-semibold">
                          Inquiry Message
                        </h4>
                        <div className="p-4 bg-[#183B2B] rounded-lg text-sm text-[#F7F4EC] whitespace-pre-wrap border border-[#A6B49A]/20">
                          {item.message}
                        </div>
                      </div>

                      {/* Status changer */}
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#A6B49A] block mb-2 font-semibold">
                          Follow-up Status
                        </label>
                        <select
                          value={item.status}
                          onChange={(e) => onUpdateInquiryStatus(item.id, e.target.value as InquirySubmission['status'])}
                          className="w-full p-2 bg-[#183B2B] border border-[#A6B49A]/30 rounded text-xs text-[#F7F4EC] focus:outline-none focus:border-[#B28B5B]"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted via Email</option>
                          <option value="Tour Scheduled">Tour Scheduled at The Bluffs</option>
                        </select>
                      </div>

                      <div className="pt-6 border-t border-[#A6B49A]/20 flex justify-end">
                        <button
                          onClick={() => {
                            onDeleteInquiry(item.id);
                            setSelectedRecordId(null);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors"
                        >
                          <Trash2 size={14} />
                          <span>Delete Record</span>
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                (() => {
                  const item = applications.find((a) => a.id === selectedRecordId);
                  if (!item) return null;
                  return (
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#A6B49A] block mb-1">
                          APP REF: {item.id}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-[#F7F4EC]">
                          {item.fullName}
                        </h3>
                        <div className="text-xs text-[#B28B5B] mt-0.5">
                          Submitted: {new Date(item.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="bg-[#183B2B] p-4 rounded-lg space-y-2 border border-[#A6B49A]/20 text-xs">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-[#A6B49A]" />
                          <span className="text-[#F7F4EC]">{item.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-[#A6B49A]" />
                          <span className="text-[#F7F4EC]">{item.phone}</span>
                          <span className="text-[10px] text-[#A6B49A]">({item.preferredContact})</span>
                        </div>
                        <div>
                          <span className="text-[#A6B49A]">Current Residence:</span>{' '}
                          <span className="text-[#F7F4EC]">{item.currentCityState}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#183B2B] p-3 rounded border border-[#A6B49A]/15">
                          <span className="text-[#A6B49A] block text-[10px] uppercase">Interest</span>
                          <span className="text-[#F7F4EC] font-medium">{item.interestType}</span>
                        </div>
                        <div className="bg-[#183B2B] p-3 rounded border border-[#A6B49A]/15">
                          <span className="text-[#A6B49A] block text-[10px] uppercase">Homesite</span>
                          <span className="text-[#F7F4EC] font-medium">{item.preferredHomesite}</span>
                        </div>
                        <div className="bg-[#183B2B] p-3 rounded border border-[#A6B49A]/15">
                          <span className="text-[#A6B49A] block text-[10px] uppercase">Timeframe</span>
                          <span className="text-[#F7F4EC] font-medium">{item.timeframe}</span>
                        </div>
                        <div className="bg-[#183B2B] p-3 rounded border border-[#A6B49A]/15">
                          <span className="text-[#A6B49A] block text-[10px] uppercase">Occupants</span>
                          <span className="text-[#F7F4EC] font-medium">{item.occupants}</span>
                        </div>
                      </div>

                      {item.additionalInfo && (
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-[#A6B49A] mb-1 font-semibold">
                            Applicant Background & Notes
                          </h4>
                          <div className="p-3 bg-[#183B2B] rounded text-xs text-[#F7F4EC] whitespace-pre-wrap border border-[#A6B49A]/20">
                            {item.additionalInfo}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#A6B49A] block mb-2 font-semibold">
                          Review Status
                        </label>
                        <select
                          value={item.status}
                          onChange={(e) => onUpdateAppStatus(item.id, e.target.value as ApplicationSubmission['status'])}
                          className="w-full p-2 bg-[#183B2B] border border-[#A6B49A]/30 rounded text-xs text-[#F7F4EC] focus:outline-none focus:border-[#B28B5B]"
                        >
                          <option value="Under Review">Under Review</option>
                          <option value="Interview Set">Interview Scheduled</option>
                          <option value="Waitlisted">Waitlisted for Next Phase</option>
                          <option value="Approved">Approved for Homesite Lease</option>
                        </select>
                      </div>

                      <div className="pt-6 border-t border-[#A6B49A]/20 flex justify-end">
                        <button
                          onClick={() => {
                            onDeleteApplication(item.id);
                            setSelectedRecordId(null);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors"
                        >
                          <Trash2 size={14} />
                          <span>Delete Application</span>
                        </button>
                      </div>
                    </div>
                  );
                })()
              )
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#A6B49A] p-8">
                <UserCheck size={36} className="text-[#A6B49A]/40 mb-3" />
                <p className="text-sm font-medium">Select a submission from the list to review details</p>
                <p className="text-xs text-[#A6B49A]/70 mt-1 max-w-xs">
                  Review applicant notes, update follow-up milestones, or export records to CSV.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
