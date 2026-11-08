export type PageId =
  | 'home'
  | 'about'
  | 'map'
  | 'properties'
  | 'property-detail'
  | 'amenities'
  | 'resident-services'
  | 'rentals'
  | 'gallery'
  | 'location'
  | 'transportation'
  | 'conservation'
  | 'eagle-cam'
  | 'events'
  | 'pitch-deck'
  | 'request-info'
  | 'apply'
  | 'tour';

export interface PropertyItem {
  id: string;
  lotNumber: string;
  title: string;
  propertyType: 'homesite' | 'turnkey-home' | 'riverfront-premium';
  transactionType: 'lease' | 'purchase' | 'rent-to-own';
  status: 'Available' | 'Under Contract' | 'Reserved';
  priceDisplay: string;
  monthlyLease?: string;
  purchasePrice?: string;
  lotSizeSqFt: number;
  homeSqFt?: number;
  bedrooms?: number;
  bathrooms?: number;
  setting: 'River Bluff View' | 'Hardwood Ridge' | 'Wooded Meadow' | 'Direct Riverfront';
  orientation: 'Sunset River View' | 'Sunrise Ridge' | 'Southern Exposure';
  elevation: string;
  heroImage: string;
  gallery: string[];
  features: string[];
  shortDesc: string;
  fullDescription: string;
  utilitiesReady: string[];
  mapCoordinates: { x: number; y: number };
  dimensions: string;
  similarPropertyIds?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface PropertyFilters {
  propertyType: string;
  transactionType: string;
  setting: string;
  priceRange: string;
  minLotSize: string;
  status: string;
  searchQuery: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'River & Bluffs' | 'Homes & Architecture' | 'Nature & Trails' | 'Community Amenities' | 'Wildlife';
  caption: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface MapPointOfInterest {
  id: string;
  name: string;
  category: 'homesite' | 'river' | 'nature' | 'amenity' | 'stewardship';
  x: number; // percentage on map 0-100
  y: number; // percentage on map 0-100
  shortDesc: string;
  longDesc: string;
  elevation?: string;
  features: string[];
  status?: 'Available' | 'Reserved' | 'Active Community Feature' | 'Preserved';
  imagePlaceholderTitle?: string;
  propertyId?: string; // Links to PropertyItem if homesite
}

export interface AmenityItem {
  id: string;
  title: string;
  category: 'utilities' | 'services' | 'nature' | 'optional' | 'emergency';
  summary: string;
  details: string[];
  included: boolean; // false if optional/proposed
  badge?: string;
  iconName?: string;
  image?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  status: 'Upcoming' | 'Past';
  attendeeCount: number;
  image?: string;
}

export interface DestinationDistance {
  name: string;
  category: 'town' | 'airport' | 'medical' | 'recreation' | 'services';
  distanceMiles: number;
  driveTimeMins: number;
  description: string;
  directionsUrl?: string;
  routeHighlights?: string;
}

export interface PitchDeckSlide {
  slideNumber: number;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  highlightMetric?: {
    value: string;
    label: string;
  };
  narrative: string;
  image?: string;
}

export interface InquirySubmission {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone?: string;
  inquiryType: string;
  propertyOfInterest?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Tour Scheduled';
}

export interface ApplicationSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'Email' | 'Phone' | 'Text';
  currentCityState: string;
  interestType: string;
  preferredHomesite: string;
  timeframe: string;
  occupants: string;
  additionalInfo?: string;
  status: 'Under Review' | 'Interview Set' | 'Waitlisted' | 'Approved';
}
