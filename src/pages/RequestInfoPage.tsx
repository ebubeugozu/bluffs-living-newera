import React, { useState } from 'react';
import { Mail, Phone, Calendar, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { PageId, InquirySubmission } from '../types';
import { PROPERTY_STATS } from '../data/communityData';

interface RequestInfoPageProps {
  onNavigate: (page: PageId) => void;
  onSubmitInquiry: (submission: InquirySubmission) => void;
}

export const RequestInfoPage: React.FC<RequestInfoPageProps> = ({
  onNavigate,
  onSubmitInquiry,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Homesite or leasing inquiry');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  
  // Anti-spam honeypot
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot check
    if (honeypot) {
      return;
    }

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please acknowledge the privacy consent to proceed.');
      return;
    }

    setIsSubmitting(true);

    const refNumber = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;

    const newSubmission: InquirySubmission = {
      id: refNumber,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || undefined,
      inquiryType,
      message: message.trim(),
      status: 'New',
    };

    setTimeout(() => {
      onSubmitInquiry(newSubmission);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedRef(refNumber);
    }, 700);
  };

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Inquiries & Private Visits
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Let's Start a Conversation.
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about The Bluffs at New Era? We'd be happy to help you learn more about the community and available opportunities.
          </p>
        </div>
      </section>

      {/* FORM & CONTACT DIRECTORY SPLIT */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* CONTACT INFO CARD */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-8 rounded-2xl border border-[#D9D0BF]/80 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#B28B5B] block mb-1">
                Direct Contact
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                Community Stewardship Office
              </h3>
              <p className="text-xs sm:text-sm text-[#303630]/80 mt-2 leading-relaxed">
                Whether you are exploring tiny-home living for the first time or seeking a specific homesite overlooking the river, our team is at your disposal.
              </p>
            </div>

            <div className="space-y-4 border-t border-[#D9D0BF]/50 pt-6 text-xs sm:text-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#A6B49A] block mb-1">
                  Official Communication Email
                </span>
                <a
                  href={`mailto:${PROPERTY_STATS.contactEmail}`}
                  className="font-semibold text-[#183B2B] hover:text-[#B28B5B] transition-colors underline underline-offset-2"
                >
                  {PROPERTY_STATS.contactEmail}
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#A6B49A] block mb-1">
                  Community Location
                </span>
                <span className="text-[#303630] block">
                  The Bluffs at New Era
                </span>
                <span className="text-[#303630]/75 block text-xs">
                  Linden, Perry County, Tennessee 37096
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#A6B49A] block mb-1">
                  Private Property Tours
                </span>
                <span className="text-[#303630]/85 block text-xs">
                  Scheduled by appointment Thursday through Sunday to preserve the quiet privacy of our active residents.
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#F7F4EC] rounded-lg border border-[#D9D0BF]/70 text-xs text-[#303630]/75 space-y-1">
              <strong className="text-[#183B2B] block">Prompt Correspondence:</strong>
              <p>Inquiries received through this form are logged securely and answered within one business day.</p>
            </div>
          </div>

          {/* INQUIRY FORM */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-8 sm:p-10 rounded-2xl border border-[#D9D0BF]/80 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#183B2B] border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                
                <h3 className="font-serif text-3xl font-semibold text-[#183B2B]">
                  Thank You for Reaching Out
                </h3>

                <p className="text-sm text-[#303630]/85 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been received and routed to our community team at <strong className="text-[#183B2B]">Info@bluffsnewera.com</strong>.
                </p>

                <div className="inline-block p-3 bg-[#F7F4EC] rounded-lg border border-[#D9D0BF] text-xs font-mono text-[#183B2B]">
                  Confirmation Reference: {submittedRef}
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                      setConsent(false);
                    }}
                    className="px-6 py-2.5 bg-[#183B2B] text-[#F7F4EC] text-xs font-semibold rounded hover:bg-[#10291F] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                    Send an Inquiry
                  </h3>
                  <p className="text-xs text-[#303630]/70 mt-1">
                    Fields marked with an asterisk (*) are required.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="user_confirm_token"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Jonathan Vance"
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
                      placeholder="jonathan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="(931) 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                      Inquiry Category *
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                    >
                      <option value="Homesite or leasing inquiry">Homesite or leasing inquiry</option>
                      <option value="Schedule a property tour">Schedule a property tour</option>
                      <option value="General information">General information</option>
                      <option value="Rental opportunity">Rental opportunity</option>
                      <option value="Community amenities">Community amenities</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#183B2B] uppercase tracking-wide block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you are looking for in a homesite, timeline, or any specific questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-md focus:outline-none focus:border-[#183B2B]"
                  />
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-[#D9D0BF] text-[#183B2B] focus:ring-0"
                  />
                  <label htmlFor="consent-checkbox" className="text-xs text-[#303630]/80 leading-snug">
                    I agree to be contacted by The Bluffs at New Era team regarding my inquiry. We respect your privacy and never sell or distribute your contact information.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
