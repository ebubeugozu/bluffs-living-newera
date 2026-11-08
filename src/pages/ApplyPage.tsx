import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { PageId, ApplicationSubmission } from '../types';

interface ApplyPageProps {
  onNavigate: (page: PageId) => void;
  onSubmitApplication: (submission: ApplicationSubmission) => void;
}

export const ApplyPage: React.FC<ApplyPageProps> = ({
  onNavigate,
  onSubmitApplication,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'Email' | 'Phone' | 'Text'>('Email');
  const [currentCityState, setCurrentCityState] = useState('');
  const [interestType, setInterestType] = useState('Tiny Home Pad Lease');
  const [preferredHomesite, setPreferredHomesite] = useState('Ridgeview Wooded Homesite (Lots 1–10)');
  const [timeframe, setTimeframe] = useState('1 to 3 Months');
  const [occupants, setOccupants] = useState('1 – 2 Adults');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [consent, setConsent] = useState(false);

  // Anti-spam honeypot
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (honeypot) return;

    if (!fullName.trim() || !email.trim() || !phone.trim() || !currentCityState.trim()) {
      setErrorMessage('Please fill in all required contact and location fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please review and check the applicant agreement before submitting.');
      return;
    }

    setIsSubmitting(true);

    const refCode = `APP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newApp: ApplicationSubmission = {
      id: refCode,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      preferredContact,
      currentCityState: currentCityState.trim(),
      interestType,
      preferredHomesite,
      timeframe,
      occupants,
      additionalInfo: additionalInfo.trim() || undefined,
      status: 'Under Review',
    };

    setTimeout(() => {
      onSubmitApplication(newApp);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setApplicationRef(refCode);
    }, 800);
  };

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Resident Application
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Take the Next Step.
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Interested in making The Bluffs your next home? Start the application process by sharing a little information with our team.
          </p>
        </div>
      </section>

      {/* APPLICATION SECTION */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Policy Note */}
        <div className="mb-8 p-4 bg-[#FFFFFF] rounded-xl border border-[#D9D0BF]/80 flex items-start gap-3 text-xs leading-relaxed text-[#303630]/85">
          <Info size={18} className="text-[#B28B5B] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#183B2B] block mb-0.5">Application Transparency Policy:</strong>
            Submitting this application expresses your interest and initiates personal review by our community director. There are no application fees or financial commitments at this step, and submission does not guarantee homesite availability or acceptance.
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-2xl border border-[#D9D0BF]/80 shadow-sm">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#183B2B] border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-[#B28B5B] block">
                APPLICATION REF: {applicationRef}
              </span>

              <h3 className="font-serif text-3xl font-semibold text-[#183B2B]">
                Application Successfully Submitted
              </h3>

              <p className="text-sm text-[#303630]/80 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#183B2B]">{fullName}</strong>. Your preliminary application has been encrypted and recorded in our community system.
              </p>

              <div className="p-4 bg-[#F7F4EC] rounded-xl border border-[#D9D0BF] max-w-md mx-auto text-xs text-[#303630]/80 space-y-1 text-left">
                <div className="font-semibold text-[#183B2B] mb-1">What to expect next:</div>
                <p>1. Our community team reviews your homesite preferences and timeline.</p>
                <p>2. We will contact you via {preferredContact.toLowerCase()} to schedule a discovery conversation or private land walk.</p>
                <p>3. Upon mutual approval, a formal lease agreement will be dispatched securely via our upcoming Resident Portal.</p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate('map')}
                  className="px-6 py-2.5 bg-[#183B2B] text-[#F7F4EC] text-xs font-semibold rounded hover:bg-[#10291F] transition-colors"
                >
                  Return to Interactive Map
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
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot */}
              <input
                type="text"
                name="verification_id"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* SECTION 1: APPLICANT IDENTITY */}
              <div className="space-y-4">
                <div className="border-b border-[#D9D0BF]/50 pb-2">
                  <h3 className="font-serif text-xl font-semibold text-[#183B2B]">
                    1. Applicant Identification
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Eleanor Campbell"
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
                      placeholder="eleanor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(931) 555-0144"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Preferred Contact *
                    </label>
                    <select
                      value={preferredContact}
                      onChange={(e) => setPreferredContact(e.target.value as 'Email' | 'Phone' | 'Text')}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    >
                      <option value="Email">Email</option>
                      <option value="Phone">Phone Call</option>
                      <option value="Text">Text Message (SMS)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Current City & State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Franklin, TN"
                      value={currentCityState}
                      onChange={(e) => setCurrentCityState(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: HOMESITE PREFERENCES */}
              <div className="space-y-4">
                <div className="border-b border-[#D9D0BF]/50 pb-2">
                  <h3 className="font-serif text-xl font-semibold text-[#183B2B]">
                    2. Homesite & Living Intentions
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Nature of Interest *
                    </label>
                    <select
                      value={interestType}
                      onChange={(e) => setInterestType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    >
                      <option value="Tiny Home Pad Lease (Primary Residence)">Tiny Home Pad Lease (Primary Residence)</option>
                      <option value="Tiny Home Pad Lease (Seasonal Retreat)">Tiny Home Pad Lease (Seasonal Retreat)</option>
                      <option value="Rental Opportunity Inquiry">Rental Opportunity Inquiry</option>
                      <option value="Future Phase Waitlist">Future Phase Waitlist</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Preferred Homesite Setting *
                    </label>
                    <select
                      value={preferredHomesite}
                      onChange={(e) => setPreferredHomesite(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    >
                      <option value="Ridgeview Wooded Homesite (Lots 1–10)">Ridgeview Wooded Homesite (Lots 1–10)</option>
                      <option value="Forest Meadow Homesite (Lots 11–20)">Forest Meadow Homesite (Lots 11–20)</option>
                      <option value="River Bluff Premium Homesite (Lots 21–28)">River Bluff Premium Homesite (Lots 21–28)</option>
                      <option value="No Preference / Open to Guidance">No Preference / Open to Guidance</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Desired Move-In Timeframe *
                    </label>
                    <select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    >
                      <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
                      <option value="1 to 3 Months">1 to 3 Months</option>
                      <option value="3 to 6 Months">3 to 6 Months</option>
                      <option value="6 to 12 Months">6 to 12 Months</option>
                      <option value="Flexible / Planning Ahead">Flexible / Planning Ahead</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Number of Intended Occupants *
                    </label>
                    <select
                      value={occupants}
                      onChange={(e) => setOccupants(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    >
                      <option value="1 Adult">1 Adult</option>
                      <option value="2 Adults">2 Adults</option>
                      <option value="2 Adults + Child">2 Adults + Child</option>
                      <option value="Other Living Arrangement">Other Living Arrangement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                    Tell Us About Your Living Vision & Questions (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share any details about your tiny home builder or model, pets, lifestyle, or specific questions about The Bluffs..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                  />
                </div>
              </div>

              {/* CONSENT & AGREEMENT */}
              <div className="pt-2 border-t border-[#D9D0BF]/50">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="apply-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-[#D9D0BF] text-[#183B2B] focus:ring-0"
                  />
                  <label htmlFor="apply-consent" className="text-xs text-[#303630]/80 leading-snug">
                    I understand that submitting this preliminary application does not constitute a binding lease agreement or guarantee homesite acceptance. I authorize The Bluffs at New Era team to contact me regarding my interest. All applicant information is kept strictly private.
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application for Review'}
                </button>
              </div>

            </form>
          )}
        </div>
      </section>

    </div>
  );
};
