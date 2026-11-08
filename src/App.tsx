import React, { useState, useEffect } from 'react';
import { PageId, InquirySubmission, ApplicationSubmission } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminDrawer } from './components/AdminDrawer';
import { ResidentPortalModal } from './components/ResidentPortalModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ConservationPage } from './pages/ConservationPage';
import { MapPage } from './pages/MapPage';
import { AmenitiesPage } from './pages/AmenitiesPage';
import { EagleCamPage } from './pages/EagleCamPage';
import { EventsPage } from './pages/EventsPage';
import { TransportationPage } from './pages/TransportationPage';
import { PitchDeckPage } from './pages/PitchDeckPage';
import { RequestInfoPage } from './pages/RequestInfoPage';
import { ApplyPage } from './pages/ApplyPage';

const INITIAL_INQUIRIES: InquirySubmission[] = [
  {
    id: 'INQ-482910',
    createdAt: '2026-11-05T14:22:00.000Z',
    fullName: 'Robert & Clara Sterling',
    email: 'rsterling@example.com',
    phone: '(615) 555-0182',
    inquiryType: 'Homesite or leasing inquiry',
    message: 'We are looking to downsize from our Nashville home to a custom tiny home overlooking the Tennessee River. We would love to schedule a walk along the western ridge pads.',
    status: 'Tour Scheduled',
  },
  {
    id: 'INQ-719302',
    createdAt: '2026-11-06T09:40:00.000Z',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '(931) 555-0211',
    inquiryType: 'Schedule a property tour',
    message: 'Interested in touring the community garden and organic coop area this coming Saturday. Does the community allow bee hive sponsorships?',
    status: 'Contacted',
  },
];

const INITIAL_APPLICATIONS: ApplicationSubmission[] = [
  {
    id: 'APP-938201',
    createdAt: '2026-11-04T16:15:00.000Z',
    fullName: 'Marcus Vance',
    email: 'mvance@example.com',
    phone: '(423) 555-0177',
    preferredContact: 'Email',
    currentCityState: 'Knoxville, TN',
    interestType: 'Tiny Home Pad Lease (Primary Residence)',
    preferredHomesite: 'Ridgeview Wooded Homesite (Lots 1–10)',
    timeframe: '1 to 3 Months',
    occupants: '1 Adult',
    additionalInfo: '34-ft certified RVIA luxury tiny home built by Timbercraft Tiny Homes in Alabama. Full remote software engineer seeking quiet forest setting with fiber connectivity.',
    status: 'Under Review',
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isResidentPortalOpen, setIsResidentPortalOpen] = useState(false);

  // Inquiries persistent state
  const [inquiries, setInquiries] = useState<InquirySubmission[]>(() => {
    try {
      const stored = localStorage.getItem('bluffs_inquiries');
      return stored ? JSON.parse(stored) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // Applications persistent state
  const [applications, setApplications] = useState<ApplicationSubmission[]>(() => {
    try {
      const stored = localStorage.getItem('bluffs_applications');
      return stored ? JSON.parse(stored) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  // Save to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem('bluffs_inquiries', JSON.stringify(inquiries));
    } catch {
      // ignore
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('bluffs_applications', JSON.stringify(applications));
    } catch {
      // ignore
    }
  }, [applications]);

  // URL Hash synchronization for clean bookmarkable URLs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'about',
        'conservation',
        'map',
        'amenities',
        'eagle-cam',
        'events',
        'transportation',
        'pitch-deck',
        'request-info',
        'apply',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const handleAddInquiry = (newInquiry: InquirySubmission) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleAddApplication = (newApp: ApplicationSubmission) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUpdateInquiryStatus = (id: string, status: InquirySubmission['status']) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  };

  const handleUpdateAppStatus = (id: string, status: ApplicationSubmission['status']) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EC] text-[#303630]">
      {/* STICKY HEADER */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenResidentPortal={() => setIsResidentPortalOpen(true)}
        submissionCount={inquiries.length + applications.length}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'conservation' && <ConservationPage onNavigate={handleNavigate} />}
        {currentPage === 'map' && <MapPage onNavigate={handleNavigate} />}
        {currentPage === 'amenities' && <AmenitiesPage onNavigate={handleNavigate} />}
        {currentPage === 'eagle-cam' && <EagleCamPage onNavigate={handleNavigate} />}
        {currentPage === 'events' && <EventsPage onNavigate={handleNavigate} />}
        {currentPage === 'transportation' && <TransportationPage onNavigate={handleNavigate} />}
        {currentPage === 'pitch-deck' && <PitchDeckPage onNavigate={handleNavigate} />}
        {currentPage === 'request-info' && (
          <RequestInfoPage onNavigate={handleNavigate} onSubmitInquiry={handleAddInquiry} />
        )}
        {currentPage === 'apply' && (
          <ApplyPage onNavigate={handleNavigate} onSubmitApplication={handleAddApplication} />
        )}
      </main>

      {/* FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenResidentPortal={() => setIsResidentPortalOpen(true)}
      />

      {/* ADMIN SUBMISSIONS REVIEW DRAWER */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        inquiries={inquiries}
        applications={applications}
        onDeleteInquiry={handleDeleteInquiry}
        onDeleteApplication={handleDeleteApplication}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onUpdateAppStatus={handleUpdateAppStatus}
      />

      {/* RESIDENT PORTAL MODAL */}
      <ResidentPortalModal
        isOpen={isResidentPortalOpen}
        onClose={() => setIsResidentPortalOpen(false)}
      />
    </div>
  );
}
