import React, { useState } from 'react';
import { X, Lock, FileText, CheckCircle2, Shield, KeyRound, ExternalLink, Info } from 'lucide-react';

interface ResidentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResidentPortalModal: React.FC<ResidentPortalModalProps> = ({ isOpen, onClose }) => {
  const [residentEmail, setResidentEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDemoView, setIsDemoView] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#10291F] text-[#F7F4EC] rounded-2xl border border-[#A6B49A]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-6 bg-[#183B2B] border-b border-[#A6B49A]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#B28B5B]/20 text-[#B28B5B] rounded-lg">
              <Lock size={22} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F7F4EC]">
                Resident Portal & Document Vault
              </h2>
              <p className="text-xs text-[#A6B49A]">
                The Bluffs at New Era · Architecture & Future Integration
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

        {/* BODY */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* ARCHITECTURE NOTICE */}
          <div className="p-4 bg-[#183B2B]/60 rounded-xl border border-[#B28B5B]/30 flex items-start gap-3">
            <Info size={20} className="text-[#B28B5B] shrink-0 mt-0.5" />
            <div className="text-xs text-[#D9D0BF] leading-relaxed">
              <span className="font-semibold text-[#F7F4EC] block mb-1">
                Development Status: Phase 2 Portal Integration
              </span>
              In accordance with security best practices, the resident document vault is architected for encrypted individual access. The DocuSign API integration will activate following community lease finalization to protect private resident legal records.
            </div>
          </div>

          {!isDemoView ? (
            /* SECURE LOGIN DEMO FORM */
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#F7F4EC]">
                Resident Authentication Gateway
              </h3>
              <p className="text-xs text-[#A6B49A]">
                Active residents will sign in using their registered email to view executed pad leases, maintenance tickets, and utility sub-meter records.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#A6B49A] block mb-1 font-semibold">
                    Resident Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="resident@example.com"
                    value={residentEmail}
                    onChange={(e) => setResidentEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#183B2B] border border-[#A6B49A]/30 rounded-md text-xs text-[#F7F4EC] focus:outline-none focus:border-[#B28B5B]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#A6B49A] block mb-1 font-semibold">
                    Portal Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-[#183B2B] border border-[#A6B49A]/30 rounded-md text-xs text-[#F7F4EC] focus:outline-none focus:border-[#B28B5B]"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[#A6B49A]">Two-Factor Auth Enforced</span>
                  <button
                    onClick={() => setIsDemoView(true)}
                    className="text-[#B28B5B] hover:underline font-semibold cursor-pointer"
                  >
                    Preview Resident Dashboard Layout →
                  </button>
                </div>

                <button
                  onClick={() => setIsDemoView(true)}
                  className="w-full py-2.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer mt-2"
                >
                  Enter Resident Demonstration
                </button>
              </div>
            </div>
          ) : (
            /* PREVIEW OF WHAT LOGGED IN RESIDENT SEES */
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#F7F4EC]">
                    Welcome, Resident (Lot #07 · Ridgeview)
                  </h3>
                  <p className="text-xs text-[#A6B49A]">The Bluffs at New Era · Signed Lease: Active</p>
                </div>
                <button
                  onClick={() => setIsDemoView(false)}
                  className="text-xs text-[#B28B5B] hover:underline"
                >
                  Back to Gateway
                </button>
              </div>

              {/* DOCUMENTS LIST */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#A6B49A] font-semibold block">
                  Private Document Vault (Encrypted Storage)
                </span>

                {[
                  {
                    name: '2026_04_Executed_Homesite_Lease_Lot07.pdf',
                    type: 'DocuSign Executed Agreement',
                    date: 'April 14, 2026',
                    status: 'Signed & Certified',
                  },
                  {
                    name: 'The_Bluffs_Community_Guidelines_Covenants.pdf',
                    type: 'Resident Handbook & Dark Sky Rules',
                    date: 'March 2026',
                    status: 'Active Guidelines',
                  },
                  {
                    name: 'Utilities_Connection_Schematic_50A_Water.pdf',
                    type: 'Technical Site Specification',
                    date: 'March 2026',
                    status: 'Reference Guide',
                  },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#183B2B] rounded-lg border border-[#A6B49A]/20 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-[#B28B5B] shrink-0" />
                      <div>
                        <div className="font-semibold text-[#F7F4EC] truncate max-w-xs">{doc.name}</div>
                        <div className="text-[10px] text-[#A6B49A]">{doc.type} · {doc.date}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#10291F] text-[#A6B49A] whitespace-nowrap">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* INTEGRATION ARCHITECTURE HIGHLIGHTS */}
              <div className="pt-4 border-t border-[#A6B49A]/20 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#183B2B]/40 rounded border border-[#A6B49A]/10">
                  <div className="flex items-center gap-1.5 text-[#B28B5B] font-semibold mb-1">
                    <CheckCircle2 size={14} />
                    <span>DocuSign Webhook</span>
                  </div>
                  <p className="text-[11px] text-[#D9D0BF]">
                    Automated document dispatch upon application approval; signatures vault directly into private resident records.
                  </p>
                </div>
                <div className="p-3 bg-[#183B2B]/40 rounded border border-[#A6B49A]/10">
                  <div className="flex items-center gap-1.5 text-[#B28B5B] font-semibold mb-1">
                    <Shield size={14} />
                    <span>Role-Based Access</span>
                  </div>
                  <p className="text-[11px] text-[#D9D0BF]">
                    Zero public file URLs; each lease document is strictly authenticated to verified resident credentials.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-4 bg-[#143224] border-t border-[#A6B49A]/20 flex items-center justify-between text-xs text-[#A6B49A]">
          <span>Security Questions: Info@bluffsnewera.com</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] rounded transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
