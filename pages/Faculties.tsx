
import React from 'react';
import { 
  ArrowRight, 
  Monitor,
  Heart,
  Cpu,
  Calculator,
  UserCheck,
  Stethoscope,
  Pill
} from 'lucide-react';
import { FACULTIES } from '../constants';

const FacultyIcon = ({ id }: { id: string }) => {
  switch (id) {
    case 'med': return <Stethoscope size={32} />;
    case 'eng': return <Cpu size={32} />;
    case 'pharma': return <Pill size={32} />;
    case 'cs': return <Monitor size={32} />;
    case 'comm': return <Calculator size={32} />;
    case 'dent': return <UserCheck size={32} />;
    default: return <Cpu size={32} />;
  }
};

const Faculties: React.FC = () => {
  return (
    <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {FACULTIES.map((faculty) => (
          <div 
            key={faculty.id} 
            className="group relative bg-white border border-slate-200 rounded-[3rem] p-12 transition-all hover:scale-105 hover:shadow-2xl hover:border-emerald-300 flex flex-col items-center text-center space-y-8 shadow-sm"
          >
            <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner group-hover:rotate-6">
               <FacultyIcon id={faculty.id} />
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-black text-slate-900 leading-tight">
                {faculty.name}
              </h3>
              <p className="text-emerald-600 font-black uppercase tracking-widest text-xs px-4 py-1 bg-emerald-50 rounded-full inline-block">
                {faculty.nameAr}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed font-medium mt-4">
                {faculty.descriptionAr}
              </p>
            </div>

            <button className="flex items-center gap-3 text-xs font-black text-emerald-600 hover:text-emerald-800 transition-colors uppercase tracking-widest pt-4 mt-auto group/btn">
              <span className="p-2 bg-emerald-50 rounded-xl group-hover/btn:bg-emerald-100 transition-colors">
                <ArrowRight size={16} />
              </span>
              <span>View Programs & Admission</span>
            </button>
            
            <div className="absolute top-6 right-8 text-[40px] font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
              {faculty.code}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculties;
