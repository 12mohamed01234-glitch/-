
import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  Search,
  ChevronRight
} from 'lucide-react';
import { FACULTIES, PROFESSORS } from '../constants';
import { Faculty, Professor } from '../types';

const StaffEvaluation: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedProf, setSelectedProf] = useState<Professor | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
    // Reset after success
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setComment('');
      setSelectedProf(null);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-600/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-white">Evaluation Received</h2>
        <p className="text-slate-400 mt-2 max-w-md mx-auto">
          Your feedback has been recorded anonymously. Thank you for helping us maintain institutional excellence at ZNU.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setSelectedProf(null); }}
          className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all"
        >
          Return to Selection
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto p-8 lg:p-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-slate-900 uppercase">Teaching Staff Evaluation</h1>
        <p className="text-slate-400 mt-2 font-bold uppercase tracking-widest text-xs">Quality assurance portal for academic performance improvement.</p>
      </div>

      <div className="bg-blue-600/5 border border-blue-500/10 rounded-[2.5rem] p-8 mb-10 flex items-start gap-6">
        <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/20">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">Institutional Integrity & Privacy</h3>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            This evaluation is <span className="text-emerald-600 font-black">100% anonymous</span>. No student identification, location data, or university IDs are stored with this feedback. Responses are aggregated periodically to protect individual privacy.
          </p>
        </div>
      </div>

      {!selectedProf ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACULTIES.map((faculty) => (
              <button
                key={faculty.id}
                onClick={() => setSelectedFaculty(faculty)}
                className={`p-8 rounded-[2rem] border transition-all text-left group ${
                  selectedFaculty?.id === faculty.id 
                    ? 'bg-emerald-600 border-emerald-500 shadow-xl shadow-emerald-600/20 text-white' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500'
                }`}
              >
                <h4 className="font-black uppercase tracking-tight text-lg">{faculty.name}</h4>
                <p className={`text-[10px] font-black uppercase tracking-widest mt-2 ${selectedFaculty?.id === faculty.id ? 'text-white/70' : 'text-slate-400'}`}>{faculty.code}</p>
              </button>
            ))}
          </div>

          {selectedFaculty && (
            <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden animate-in slide-in-from-top-4 duration-500 shadow-sm">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-black text-slate-900 uppercase tracking-tight">Staff in {selectedFaculty.name}</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3">
                  <Search size={14} className="text-slate-400" />
                  <input type="text" placeholder="Search staff..." className="bg-transparent text-xs font-bold border-none outline-none text-slate-900" />
                </div>
              </div>
              <div className="divide-y divide-slate-50">
                {PROFESSORS.filter(p => p.facultyId === selectedFaculty.id).map((prof) => (
                  <button 
                    key={prof.id}
                    onClick={() => setSelectedProf(prof)}
                    className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all text-left group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{prof.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{prof.title}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-[3.5rem] overflow-hidden animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
          <div className="p-10 bg-slate-50/50 border-b border-slate-100 flex items-center gap-8">
            <button 
              onClick={() => setSelectedProf(null)}
              className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-emerald-600 transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-6">
              <img src={selectedProf.image} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md" alt="" />
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedProf.name}</h2>
                <p className="text-emerald-600 font-black uppercase tracking-widest text-xs mt-1">{selectedProf.title} • {selectedProf.department}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-12 space-y-12">
            <div className="space-y-6 text-center">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">Overall Academic Performance</label>
              <div className="flex justify-center gap-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform active:scale-90"
                  >
                    <Star 
                      size={56} 
                      className={`${
                        rating >= star ? 'fill-amber-400 text-amber-400 drop-shadow-lg' : 'text-slate-100 hover:text-slate-200'
                      } transition-all duration-300`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select a star rating based on your course experience.</p>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">Constructive Feedback (Optional)</label>
              <textarea 
                rows={6}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts on teaching methodology, materials, or student support..."
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-slate-900 focus:border-emerald-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 font-bold text-sm"
              />
            </div>

            <div className="flex items-center gap-6 pt-6">
              <button 
                type="submit"
                disabled={rating === 0}
                className={`flex-1 py-5 rounded-2xl font-black uppercase tracking-widest transition-all text-sm ${
                  rating > 0 ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/20' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                Submit Evaluation
              </button>
              <button 
                type="button"
                onClick={() => setSelectedProf(null)}
                className="px-10 py-5 rounded-2xl font-black text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all text-sm uppercase tracking-widest"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const ArrowLeft = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

export default StaffEvaluation;
