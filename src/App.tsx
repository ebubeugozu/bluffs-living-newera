import React, { useState, useEffect } from 'react';
import { PageId, InquirySubmission, ApplicationSubmission, PropertyItem } from './types';
import { PROPERTY_LISTINGS, COMMUNITY_GALLERY_PHOTOS } from './data/communityData';

// Shared Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminDrawer } from './components/AdminDrawer';
import { ResidentPortalModal } from './components/ResidentPortalModal';
import { GalleryLightbox, LightboxImageItem } from './components/GalleryLightbox';
import { PropertyQuickView } from './components/PropertyQuickView';

// Existing Pages
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

// New Pages
import { PropertiesBrowsePage } from './pages/PropertiesBrowsePage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ResidentServicesPage } from './pages/ResidentServicesPage';
import { ManagedRentalsPage } from './pages/ManagedRentalsPage';
import { LocationPage } from './pages/LocationPage';
import { TourSchedulePage } from './pages/TourSchedulePage';

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

const VALID_PAGES: PageId[] = [
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
  'properties',
  'resident-services',
  'rentals',
  'gallery',
  'location',
  'tour',
  'property-detail',
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('prop-lot-22');
  const [quickViewProperty, setQuickViewProperty] = useState<PropertyItem | null>(null);
  const [tourInitialTitle, setTourInitialTitle] = useState<string | undefined>(undefined);

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<LightboxImageItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Favorites State
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('bluffs_favorites');
      return stored ? JSON.parse(stored) : ['prop-lot-22'];
    } catch {
      return ['prop-lot-22'];
    }
  });

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

  useEffect(() => {
    try {
      localStorage.setItem('bluffs_favorites', JSON.stringify(favoriteIds));
    } catch {
      // ignore
    }
  }, [favoriteIds]);

  // URL Hash synchronization for clean bookmarkable URLs
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '');
      
      if (!rawHash) {
        setCurrentPage('home');
        return;
      }

      // Check if hash matches property detail route: property/:id
      if (rawHash.startsWith('property/')) {
        const propId = rawHash.replace('property/', '');
        if (propId) {
          setSelectedPropertyId(propId);
          setCurrentPage('property-detail');
          return;
        }
      }

      if (VALID_PAGES.includes(rawHash as PageId)) {
        setCurrentPage(rawHash as PageId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (page === 'property-detail') {
      window.location.hash = `property/${selectedPropertyId}`;
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewPropertyDetail = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentPage('property-detail');
    window.location.hash = `property/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewGallery = (property: PropertyItem) => {
    setLightboxImages(property.gallery);
    setLightboxIndex(0);
    setIsLightboxOpen(true);
  };

  const handleOpenLightbox = (images: LightboxImageItem[], initialIndex = 0) => {
    setLightboxImages(images);
    setLightboxIndex(initialIndex);
    setIsLightboxOpen(true);
  };

  const handleQuickView = (property: PropertyItem) => {
    setQuickViewProperty(property);
  };

  const handleScheduleTour = (propertyTitle?: string) => {
    setTourInitialTitle(propertyTitle);
    handleNavigate('tour');
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
      {/* STICKY HEADER WITH LOGICAL DROPDOWNS & ACTIVE CTA */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenResidentPortal={() => setIsResidentPortalOpen(true)}
        submissionCount={inquiries.length + applications.length}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onViewPropertyDetail={handleViewPropertyDetail}
            onViewGallery={handleViewGallery}
            onQuickView={handleQuickView}
            onScheduleTour={handleScheduleTour}
            favouriteIds={favoriteIds}
            onToggleFavourite={handleToggleFavorite}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentPage === 'map' && (
          <MapPage
            onNavigate={handleNavigate}
            onSelectProperty={handleViewPropertyDetail}
          />
        )}

        {currentPage === 'properties' && (
          <PropertiesBrowsePage
            onNavigate={handleNavigate}
            onViewPropertyDetail={handleViewPropertyDetail}
            onViewGallery={handleViewGallery}
            onQuickView={handleQuickView}
            onScheduleTour={handleScheduleTour}
            favouriteIds={favoriteIds}
            onToggleFavourite={handleToggleFavorite}
          />
        )}

        {currentPage === 'property-detail' && (
          <PropertyDetailPage
            propertyId={selectedPropertyId}
            onNavigate={handleNavigate}
            onSelectProperty={handleViewPropertyDetail}
            onViewGallery={handleOpenLightbox}
            onScheduleTour={handleScheduleTour}
            isFavourite={favoriteIds.includes(selectedPropertyId)}
            onToggleFavourite={handleToggleFavorite}
          />
        )}

        {currentPage === 'amenities' && <AmenitiesPage onNavigate={handleNavigate} />}

        {currentPage === 'resident-services' && (
          <ResidentServicesPage
            onNavigate={handleNavigate}
            onScheduleTour={() => handleScheduleTour('Resident Services')}
          />
        )}

        {currentPage === 'rentals' && (
          <ManagedRentalsPage
            onNavigate={handleNavigate}
            onScheduleTour={() => handleScheduleTour('Managed Rentals')}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            onNavigate={handleNavigate}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentPage === 'location' && (
          <LocationPage
            onNavigate={handleNavigate}
            onScheduleTour={() => handleScheduleTour('Location Inquiry')}
          />
        )}

        {currentPage === 'conservation' && <ConservationPage onNavigate={handleNavigate} />}

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

        {currentPage === 'tour' && (
          <TourSchedulePage
            onNavigate={handleNavigate}
            onSubmitInquiry={handleAddInquiry}
            initialPropertyTitle={tourInitialTitle}
          />
        )}
      </main>

      {/* FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenResidentPortal={() => setIsResidentPortalOpen(true)}
      />

      {/* PROPERTY QUICK VIEW MODAL */}
      <PropertyQuickView
        property={quickViewProperty}
        isOpen={!!quickViewProperty}
        onClose={() => setQuickViewProperty(null)}
        onOpenGallery={handleViewGallery}
        onViewFullProperty={(id) => {
          setQuickViewProperty(null);
          handleViewPropertyDetail(id);
        }}
        onEnquire={(prop) => {
          setQuickViewProperty(null);
          handleScheduleTour(prop.title);
        }}
        isFavourite={quickViewProperty ? favoriteIds.includes(quickViewProperty.id) : false}
        onToggleFavourite={handleToggleFavorite}
      />

      {/* FULLSCREEN RESPONSIVE GALLERY LIGHTBOX */}
      <GalleryLightbox
        isOpen={isLightboxOpen}
        images={lightboxImages}
        initialIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
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
