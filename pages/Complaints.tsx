
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Send, 
  Lock, 
  ShieldAlert, 
  CheckCircle,
  FileQuestion,
  Building2,
  BookMarked
} from 'lucide-react';
import { FACULTIES } from '../constants';

const Complaints: React.FC = () => {
  const [category, setCategory] = useState<'academic' | 'admin' | 'facilities' | null>(null);
  const [facultyId, setFacultyId] = useState('');
  const [complaint, setComplaint] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCategory(null);
      setFacultyId('');
      setComplaint('');
    }, 4000);
  };

  if (submitted) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold text-white">Institutional Filing Complete</h2>
        <p className="text-slate-400 mt-2 max-w-md mx-auto">
          Your complaint has been logged with the university administration. It will be reviewed with strict confidentiality and no personal identifiers.
        </p>
        <p className="text-xs text-blue-500 font-bold mt-6 tracking-widest uppercase">TICKET REFERENCE: ZNU-CMP-{Math.floor(Math.random() * 10000)}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert size={32} />
        </div>
        <h1 className="text-4xl font-bold text-white">Complaints & Advocacy Center</h1>
        <p className="text-slate-400 mt-2">Speak up securely. Your voice matters to the development of our institution.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Rules & Info */}
        <div className="space-y-6">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-white font-bold mb-4">
              <Lock size={18} className="text-emerald-500" />
              <h3>Privacy Protocols</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <div className="min-w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5"></div>
                No identity tracking.
              </li>
              <li className="flex gap-2">
                <div className="min-w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5"></div>
                Encrypted submission.
              </li>
              <li className="flex gap-2">
                <div className="min-w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5"></div>
                Direct to Oversight Commitee.
              </li>
            </ul>
          </div>

          <div className="bg-red-900/10 border border-red-900/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-red-500 font-bold mb-3">
              <AlertTriangle size={18} />
              <h3>Warning</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              False reporting or malicious intent impacts real administrative resources. Please use this portal responsibly for genuine institutional issues.
            </p>
          </div>
        </div>

        {/* Right Column: Submission Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-[#111827] border border-slate-800 rounded-3xl p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest block">Complaint Category</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'academic', label: 'Academic', icon: <BookMarked size={18} /> },
                  { id: 'admin', label: 'Admin', icon: <Building2 size={18} /> },
                  { id: 'facilities', label: 'Facilities', icon: <FileQuestion size={18} /> },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id as any)}
                    className={`p-4 border rounded-2xl flex flex-col items-center gap-2 transition-all ${
                      category === cat.id 
                        ? 'bg-blue-600/10 border-blue-500 text-blue-400' 
                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-400'
                    }`}
                  >
                    {cat.icon}
                    <span className="text-xs font-bold">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest block">Associated Faculty (Optional)</label>
              <select 
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-blue-500 transition-all"
              >
                <option value="">General University Issue</option>
                {FACULTIES.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest block">Details of Complaint</label>
              <textarea 
                rows={6}
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="Provide as much detail as possible to help us investigate the issue..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-slate-200 outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
              <Send size={18} />
              <span>Submit Secure Report</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
