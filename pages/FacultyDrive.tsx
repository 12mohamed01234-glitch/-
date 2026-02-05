
import React, { useState } from 'react';
import { 
  Folder, 
  ChevronRight, 
  FileText, 
  Download, 
  Search, 
  Filter,
  CheckCircle,
  Clock
} from 'lucide-react';
import { FACULTIES } from '../constants';
import { Faculty, ResourceFile, Language } from '../types';

const MOCK_FILES: ResourceFile[] = [
  { id: '1', name: 'Engineering Physics I', nameAr: 'فيزياء هندسية 1', type: 'pdf', size: '3.2MB', date: 'Oct 12, 2024' },
  { id: '2', name: 'Mathematics 101 - Calculus', nameAr: 'رياضيات 1 - تفاضل وتكامل', type: 'pdf', size: '4.5MB', date: 'Oct 14, 2024' },
  { id: '3', name: 'Workshop Practice Manual', nameAr: 'دليل ورشة التدريب', type: 'pdf', size: '12MB', date: 'Oct 15, 2024' },
  { id: '4', name: 'Introduction to Mechatronics', nameAr: 'مقدمة في الميكاترونكس', type: 'pdf', size: '6.8MB', date: 'Oct 16, 2024' },
];

const FacultyDrive: React.FC<{ lang: Language }> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty>(FACULTIES[0]);
  const [selectedLevel, setSelectedLevel] = useState<string>('Preparatory Year');

  return (
    <div className={`p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12`}>
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase">{isRtl ? 'المكتبة الرقمية' : 'Digital Library'}</h1>
        <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm">{isRtl ? 'مركز المصادر الأكاديمية الموحد' : 'Unified Academic Resource Center'}</p>
      </div>

      <div className={`bg-white rounded-[3rem] overflow-hidden flex flex-col lg:flex-row min-h-[700px] shadow-sm border border-slate-200`}>
        {/* Sidebar Nav */}
        <div className={`w-full lg:w-80 bg-slate-50 border-x border-slate-200 p-8 flex flex-col gap-10 ${isRtl ? 'text-right' : 'text-left'}`}>
           <div className="space-y-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'تصفية حسب الكلية' : 'Filter by Faculty'}</p>
              <div className="space-y-2">
                {FACULTIES.map(f => (
                  <button 
                    key={f.id} 
                    onClick={() => setSelectedFaculty(f)}
                    className={`w-full p-4 rounded-2xl text-xs font-bold transition-all text-right flex items-center justify-between group ${selectedFaculty.id === f.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white'}`}
                  >
                    <span className={isRtl ? 'order-last' : ''}>{isRtl ? f.nameAr : f.name}</span>
                    <Folder size={14} className={selectedFaculty.id === f.id ? 'text-white' : 'text-slate-300 group-hover:text-emerald-500'} />
                  </button>
                ))}
              </div>
           </div>

           <div className="space-y-6 mt-auto">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'السنة الدراسية' : 'Academic Year'}</p>
              <div className="grid grid-cols-1 gap-2">
                {['Preparatory Year', 'First Year', 'Second Year', 'Third Year', 'Fourth Year'].map(lvl => (
                  <button 
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`w-full p-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-right ${selectedLevel === lvl ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-12 bg-white flex flex-col gap-10">
           <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6`}>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'المستندات المتاحة' : 'Available Documents'}</p>
                </div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight">{isRtl ? selectedFaculty.nameAr : selectedFaculty.name}</h3>
                <p className="text-emerald-600 font-black uppercase tracking-widest text-xs mt-2">{selectedLevel}</p>
              </div>
              <div className="relative group min-w-[300px]">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="text" placeholder={isRtl ? "بحث في الملفات..." : "Search in files..."} className="bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all w-full" />
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto pr-4">
              {MOCK_FILES.map((file) => (
                <div key={file.id} className="bg-white border border-slate-200 p-8 rounded-[2.5rem] flex items-center justify-between hover:shadow-xl hover:border-emerald-200 transition-all group cursor-pointer">
                   <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner border border-slate-100">
                        <Download size={22} />
                      </div>
                      <div className={isRtl ? 'text-right' : 'text-left'}>
                         <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight group-hover:text-emerald-700 transition-colors">{isRtl ? file.nameAr : file.name}</h4>
                         <div className={`flex items-center gap-3 mt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">PDF</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{file.size}</span>
                            <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{file.date}</span>
                         </div>
                      </div>
                   </div>
                   <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FileText size={18} />
                   </div>
                </div>
              ))}
              
              {/* Load More Placeholder */}
              <div className="lg:col-span-2 border-2 border-dashed border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300">
                 <Clock size={24} className="mb-2" />
                 <p className="text-[10px] font-black uppercase tracking-widest">More documents are being uploaded daily</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDrive;
