import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Check, X, Filter } from 'lucide-react';
import { PageId, EventItem } from '../types';
import { EVENTS_DATA } from '../data/communityData';

interface EventsPageProps {
  onNavigate: (page: PageId) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const [events, setEvents] = useState<EventItem[]>(EVENTS_DATA);
  const [filterSeason, setFilterSeason] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState<boolean>(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');

  // Add event form modal state (for client management)
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSeason, setNewSeason] = useState<EventItem['season']>('Spring');

  const filteredEvents = events.filter((ev) => {
    if (filterSeason === 'all') return true;
    return ev.season.toLowerCase() === filterSeason.toLowerCase();
  });

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail || !selectedEvent) return;
    
    // Increment attendee count
    setEvents((prev) =>
      prev.map((ev) => (ev.id === selectedEvent.id ? { ...ev, attendeeCount: ev.attendeeCount + 1 } : ev))
    );
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setSelectedEvent(null);
      setRsvpName('');
      setRsvpEmail('');
    }, 2500);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;

    const created: EventItem = {
      id: `ev-${Date.now()}`,
      title: newTitle,
      date: newDate,
      time: newTime || 'Time TBA',
      location: newLocation || 'The Bluffs at New Era',
      description: newDesc,
      season: newSeason,
      status: 'Upcoming',
      attendeeCount: 1,
    };

    setEvents([created, ...events]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDate('');
    setNewTime('');
    setNewLocation('');
    setNewDesc('');
  };

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Community Life & Gatherings
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Life at The Bluffs. Together.
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Discover community activities, river paddles, garden workdays, and seasonal blufftop celebrations.
          </p>
        </div>
      </section>

      {/* FILTER & MANAGEMENT STRIP */}
      <section className="py-6 border-b border-[#D9D0BF]/60 bg-[#FFFFFF] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Season filters */}
          <div className="flex items-center gap-1.5">
            {['all', 'Spring', 'Summer', 'Autumn'].map((season) => (
              <button
                key={season}
                onClick={() => setFilterSeason(season)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  filterSeason.toLowerCase() === season.toLowerCase()
                    ? 'bg-[#183B2B] text-[#F7F4EC]'
                    : 'bg-[#F7F4EC] text-[#303630] hover:bg-[#D9D0BF]/50'
                }`}
              >
                {season === 'all' ? 'All Gatherings' : season}
              </button>
            ))}
          </div>

          {/* Add Event Button for management */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] text-xs font-semibold rounded-md transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Community Event</span>
          </button>

        </div>
      </section>

      {/* EVENTS LISTING */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredEvents.length === 0 ? (
          <div className="bg-[#FFFFFF] p-12 rounded-xl border border-[#D9D0BF] text-center max-w-lg mx-auto space-y-3">
            <Calendar size={32} className="text-[#A6B49A] mx-auto" />
            <h3 className="font-serif text-xl font-semibold text-[#183B2B]">
              No Events Currently Scheduled
            </h3>
            <p className="text-xs text-[#303630]/70">
              Community gatherings and seasonal workshops are posted here as dates are confirmed. Please check back soon or inquire with our team.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#FFFFFF] rounded-xl border border-[#D9D0BF]/80 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B28B5B]">
                      {event.season} · {event.status}
                    </span>
                    <span className="text-xs text-[#A6B49A]">·</span>
                    <span className="text-xs text-[#303630]/70 flex items-center gap-1">
                      <Users size={12} className="text-[#183B2B]" />
                      <span>{event.attendeeCount} Community Attendees</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#303630]/80 leading-relaxed max-w-2xl">
                    {event.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#183B2B] font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#B28B5B]" />
                      <span>{event.date}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#B28B5B]" />
                      <span>{event.time}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#B28B5B]" />
                      <span>{event.location}</span>
                    </span>
                  </div>
                </div>

                <div className="shrink-0 self-start md:self-center">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="px-5 py-2.5 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors cursor-pointer"
                  >
                    RSVP to Attend
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* RSVP MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFFFFF] text-[#303630] rounded-xl max-w-md w-full p-6 shadow-2xl border border-[#D9D0BF] relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-[#A6B49A] hover:text-[#303630]"
            >
              <X size={18} />
            </button>

            {rsvpSuccess ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                  <Check size={24} />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#183B2B]">RSVP Confirmed!</h4>
                <p className="text-xs text-[#303630]/80">
                  We have added your reservation for <strong className="text-[#183B2B]">{selectedEvent.title}</strong>. A confirmation has been noted for our stewardship team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#B28B5B]">Community Gathering RSVP</span>
                  <h4 className="font-serif text-xl font-bold text-[#183B2B]">{selectedEvent.title}</h4>
                  <p className="text-xs text-[#303630]/70 mt-1">{selectedEvent.date} · {selectedEvent.location}</p>
                </div>

                <div>
                  <label className="text-xs uppercase font-semibold text-[#183B2B] block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="e.g., Sarah Jenkins"
                    className="w-full px-3 py-2 text-xs border border-[#D9D0BF] rounded focus:outline-none focus:border-[#183B2B]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-semibold text-[#183B2B] block mb-1">Your Email Address</label>
                  <input
                    type="email"
                    required
                    value={rsvpEmail}
                    onChange={(e) => setRsvpEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="w-full px-3 py-2 text-xs border border-[#D9D0BF] rounded focus:outline-none focus:border-[#183B2B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#183B2B] text-[#F7F4EC] hover:bg-[#10291F] font-semibold text-xs tracking-wider uppercase rounded transition-colors"
                >
                  Confirm My RSVP
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ADD EVENT MODAL (CMS) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFFFFF] text-[#303630] rounded-xl max-w-lg w-full p-6 shadow-2xl border border-[#D9D0BF] relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#A6B49A] hover:text-[#303630]"
            >
              <X size={18} />
            </button>

            <form onSubmit={handleCreateEvent} className="space-y-3">
              <h4 className="font-serif text-xl font-bold text-[#183B2B]">Add Community Calendar Event</h4>
              
              <div>
                <label className="text-xs font-semibold block mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Summer River Canoe Outing"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#D9D0BF] rounded focus:outline-none focus:border-[#183B2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Saturday, July 18, 2026"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D9D0BF] rounded"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 9:00 AM – 12:00 PM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D9D0BF] rounded"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Riverfront Launch or The Fire Circle"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#D9D0BF] rounded"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Season</label>
                <select
                  value={newSeason}
                  onChange={(e) => setNewSeason(e.target.value as EventItem['season'])}
                  className="w-full px-3 py-2 text-xs border border-[#D9D0BF] rounded"
                >
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Autumn">Autumn</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the activity, gear needed, and schedule..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#D9D0BF] rounded"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-[#303630] hover:bg-[#F7F4EC] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#183B2B] text-[#F7F4EC] text-xs font-semibold rounded hover:bg-[#10291F]"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
