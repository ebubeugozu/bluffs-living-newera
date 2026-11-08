import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight, Info } from 'lucide-react';
import { PageId, InquirySubmission } from '../types';
import { PROPERTY_STATS } from '../data/communityData';

interface TourSchedulePageProps {
  onNavigate: (page: PageId) => void;
  onSubmitInquiry: (submission: InquirySubmission) => void;
  initialPropertyTitle?: string;
}

export const TourSchedulePage: React.FC<TourSchedulePageProps> = ({
  onNavigate,
  onSubmitInquiry,
  initialPropertyTitle = '',
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDay, setPreferredDay] = useState('Saturday');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [partySize, setPartySize] = useState('2 Guests');
  const [propertyTitle, setPropertyTitle] = useState(initialPropertyTitle || 'General 140-Acre Master Plan & Homesites');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tourRef, setTourRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name, email, and phone number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please acknowledge the tour reservation agreement.');
      return;
    }

    setIsSubmitting(true);

    const refNumber = `TOUR-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTourInquiry: InquirySubmission = {
      id: refNumber,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      inquiryType: 'Schedule a property tour',
      propertyOfInterest: propertyTitle,
      message: `PRIVATE TOUR REQUEST:
Preferred Day: ${preferredDay}
Preferred Time: ${preferredTime}
Party Size: ${partySize}
Interest: ${propertyTitle}
Visitor Notes: ${notes || 'None provided'}`,
      status: 'Tour Scheduled',
    };

    setTimeout(() => {
      onSubmitInquiry(newTourInquiry);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTourRef(refNumber);
    }, 700);
  };

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Private Appointments
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Schedule a Private Tour
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Walk the hardwood ridges, stand on the limestone bluffs overlooking the Tennessee River, and tour available homesites with our community director.
          </p>
        </div>
      </section>

      {/* FORM & VISITATION PROTOCOL */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* TOUR PREPARATION GUIDELINES */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-8 rounded-2xl border border-[#D9D0BF]/80 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B28B5B] block mb-1">
                Tour Protocol
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                What to Expect on Your Visit
              </h3>
              <p className="text-xs sm:text-sm text-[#303630]/80 mt-2 leading-relaxed">
                To protect the privacy and tranquility of active community residents, property visits are hosted by appointment only.
              </p>
            </div>

            <div className="space-y-4 border-t border-[#D9D0BF]/50 pt-5 text-xs">
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-[#B28B5B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#183B2B] block">Tour Days & Duration</strong>
                  <span className="text-[#303630]/75">Thursday through Sunday. Tours typically last 60 to 90 minutes.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#B28B5B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#183B2B] block">Meeting Location</strong>
                  <span className="text-[#303630]/75">Gated Stewardship Center, The Bluffs at New Era, Linden, TN.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Info size={16} className="text-[#B28B5B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#183B2B] block">Recommended Attire</strong>
                  <span className="text-[#303630]/75">Comfortable walking shoes or trail boots for forest and bluffline paths.</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F7F4EC] rounded-xl border border-[#D9D0BF]/60 text-xs text-[#303630]/80 space-y-1">
              <strong className="text-[#183B2B] block">Have Questions Before Booking?</strong>
              <p>Direct inquiries: <a href={`mailto:${PROPERTY_STATS.contactEmail}`} className="underline font-semibold">{PROPERTY_STATS.contactEmail}</a></p>
            </div>
          </div>

          {/* TOUR SCHEDULING FORM */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-8 sm:p-10 rounded-2xl border border-[#D9D0BF]/80 shadow-sm">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#183B2B] border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-[#B28B5B] block">
                  RESERVATION REFERENCE: {tourRef}
                </span>

                <h3 className="font-serif text-3xl font-semibold text-[#183B2B]">
                  Tour Request Received
                </h3>

                <p className="text-sm text-[#303630]/80 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#183B2B]">{fullName}</strong>. We have received your tour request for <strong className="text-[#183B2B]">{preferredDay} at {preferredTime}</strong>.
                </p>

                <div className="p-4 bg-[#F7F4EC] rounded-xl border border-[#D9D0BF] max-w-md mx-auto text-xs text-[#303630]/80 text-left space-y-1">
                  <strong className="text-[#183B2B] block">Next Step:</strong>
                  <p>Our community director will email you within 24 hours to confirm your reservation time and provide gate access directions.</p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => onNavigate('properties')}
                    className="px-6 py-2.5 bg-[#183B2B] text-[#F7F4EC] text-xs font-semibold rounded hover:bg-[#10291F] transition-colors"
                  >
                    Browse Homesites While You Wait
                  </button>
                  <button
                    onClick={() => onNavigate('home')}
                    className="px-6 py-2.5 border border-[#183B2B] text-[#183B2B] text-xs font-semibold rounded hover:bg-[#F7F4EC] transition-colors"
                  >
                    Back to Homepage
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                    Select Your Appointment Preferences
                  </h3>
                  <p className="text-xs text-[#303630]/70 mt-1">
                    Please provide your contact information and preferred day to tour.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Mark Robinson"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="mark@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(931) 555-0122"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Party Size
                    </label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 to 4 Guests">3 to 4 Guests</option>
                      <option value="Family / 5+">Family / 5+</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Preferred Day *
                    </label>
                    <select
                      value={preferredDay}
                      onChange={(e) => setPreferredDay(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    >
                      <option value="Saturday">Saturday (Most Popular)</option>
                      <option value="Sunday">Sunday</option>
                      <option value="Friday">Friday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Weekday Special Request">Weekday Special Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    >
                      <option value="10:00 AM">10:00 AM (Morning River Mist)</option>
                      <option value="1:00 PM">1:00 PM (Midday Forest Light)</option>
                      <option value="3:30 PM">3:30 PM (Late Afternoon / Sunset Walk)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                    Specific Homesite or Topic of Interest
                  </label>
                  <input
                    type="text"
                    value={propertyTitle}
                    onChange={(e) => setPropertyTitle(e.target.value)}
                    placeholder="e.g., Lot 22 River Bluff, Model tiny homes, or General tour"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                    Any Additional Notes or Travel Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Let us know if you will be traveling from out of state or have mobility requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="tour-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-[#D9D0BF] text-[#183B2B] focus:ring-0"
                  />
                  <label htmlFor="tour-consent" className="text-xs text-[#303630]/80 leading-snug">
                    I agree to be contacted by The Bluffs team to confirm my appointment. Tours are private and confidential.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Calendar size={15} />
                  <span>{isSubmitting ? 'Submitting Request...' : 'Confirm Private Tour Request'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
