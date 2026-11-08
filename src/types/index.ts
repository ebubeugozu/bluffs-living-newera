export type PageId =
  | 'home'
  | 'about'
  | 'conservation'
  | 'map'
  | 'amenities'
  | 'eagle-cam'
  | 'events'
  | 'transportation'
  | 'pitch-deck'
  | 'request-info'
  | 'apply';

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
}

export interface AmenityItem {
  id: string;
  title: string;
  category: 'utilities' | 'services' | 'nature' | 'optional' | 'emergency';
  summary: string;
  details: string[];
  included: boolean; // false if optional/proposed
  badge?: string;
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
}

export interface DestinationDistance {
  name: string;
  category: 'town' | 'airport' | 'medical' | 'recreation' | 'services';
  distanceMiles: number;
  driveTimeMins: number;
  description: string;
  directionsUrl?: string;
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
}

export interface InquirySubmission {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone?: string;
  inquiryType: string;
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
