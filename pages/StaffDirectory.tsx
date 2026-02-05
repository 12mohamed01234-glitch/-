
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  User, 
  Mail, 
  Calendar, 
  GraduationCap, 
  Star, 
  X, 
  ChevronRight, 
  BookOpen, 
  Building2,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { PROFESSORS, FACULTIES } from '../constants';
import { Professor, Language, Faculty } from '../types';

interface StaffDirectoryProps {
  lang: Language;
}

const StaffDirectory: React.FC<StaffDirectoryProps> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('all');
  const [selectedTitle, setSelectedTitle] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<Professor | null>(null);

  const filteredStaff = useMemo(() => {
    return PROFESSORS.filter((p) => {
      const nameMatch = isRtl 
        ? p.nameAr.toLowerCase().includes(searchQuery.toLowerCase())
        : p.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const facultyMatch = selectedFacultyId === 'all' || p.facultyId === selectedFacultyId;
      
      const titleMatch = selectedTitle === 'all' || p.title.toLowerCase().includes(selectedTitle.toLowerCase());

      return nameMatch && facultyMatch && titleMatch;
    });
  }, [searchQuery, selectedFacultyId, selectedTitle, isRtl]);

  const titles = ['Professor', 'Associate Professor', 'Lecturer', 'Assistant'];

  return (
    <div className={`p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12 ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
          {isRtl ? 'دليل هيئة التدريس' : 'Teaching Staff Directory'}
        </h1>
        <p className="text-emerald-600 font-bold tracking-[0.3em] uppercase text-sm">
          {isRtl ? 'النظام الرسمي للبحث عن المنسوبين الأكاديميين' : 'Official Academic Staff Search System'}
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1 group">
            <Search size={20} className={`absolute top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors ${isRtl ? 'right-6' : 'left-6'}`} />
            <input 
              type="text" 
              placeholder={isRtl ? "ابحث عن اسم الدكتور أو الأستاذ..." : "Search by doctor or professor name..."} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-16 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold ${isRtl ? 'text-right' : 'text-left'}`}
            />
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <select 
              value={selectedFacultyId}
              onChange={(e) => setSelectedFacultyId(e.target.value)}
              className={`bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 outline-none focus:border-emerald-500 transition-all ${isRtl ? 'text-right' : ''}`}
            >
              <option value="all">{isRtl ? 'كل الكليات' : 'All Faculties'}</option>
              {FACULTIES.map(f => <option key={f.id} value={f.id}>{isRtl ? f.nameAr : f.name}</option>)}
            </select>

            <select 
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              className={`bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 outline-none focus:border-emerald-500 transition-all ${isRtl ? 'text-right' : ''}`}
            >
              <option value="all">{isRtl ? 'كل الألقاب' : 'All Titles'}</option>
              {titles.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {filteredStaff.map((p) => (
          <div 
            key={p.id}
            onClick={() => setSelectedStaff(p)}
            className="group bg-white border border-slate-100 p-8 rounded-[3rem] transition-all hover:shadow-2xl hover:border-emerald-200 cursor-pointer flex flex-col items-center text-center space-y-6 shadow-sm relative overflow-hidden"
          >
            {/* Faculty Badge in background */}
            <div className="absolute top-4 right-6 text-[40px] font-black text-slate-50 opacity-100 transition-opacity">
              {FACULTIES.find(f => f.id === p.facultyId)?.code}
            </div>

            <div className="relative w-28 h-28">
              <div className="absolute inset-0 bg-emerald-500 opacity-10 blur-xl rounded-full scale-125 transition-transform group-hover:scale-150"></div>
              <img 
                src={p.image || `https://via.placeholder.com/150/10b981/ffffff?text=${p.name.charAt(0)}`} 
                alt={p.name} 
                className="w-full h-full object-cover rounded-[2rem] border-4 border-white shadow-lg relative z-10"
              />
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-xl font-black text-slate-900 leading-tight">
                {isRtl ? p.nameAr : p.name}
              </h3>
              <p className="text-emerald-600 font-black uppercase tracking-widest text-[9px] px-3 py-1 bg-emerald-50 rounded-full inline-block">
                {isRtl ? p.titleAr : p.title}
              </p>
            </div>

            <div className="w-full h-[1px] bg-slate-100"></div>

            <div className="space-y-1 w-full">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'الكلية والقسم' : 'Faculty & Dept'}</p>
              <p className="text-xs font-bold text-slate-700">{isRtl ? `${p.departmentAr || p.department}` : `${p.department}`}</p>
            </div>

            <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 group-hover:text-emerald-600 transition-colors uppercase tracking-widest pt-2 group-hover:translate-x-1 duration-300">
              <span>{isRtl ? 'عرض الملف الأكاديمي' : 'View Academic Profile'}</span>
              {isRtl ? <ChevronRight size={14} className="rotate-180" /> : <ChevronRight size={14} />}
            </button>
          </div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="py-20 text-center space-y-4 bg-slate-50 rounded-[3rem] border border-slate-100">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto text-slate-300 shadow-sm">
            <User size={40} />
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            {isRtl ? 'لم يتم العثور على نتائج تطابق بحثك' : 'No staff members found matching your search'}
          </p>
        </div>
      )}

      {/* Detailed Profile View Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
            onClick={() => setSelectedStaff(null)}
          ></div>
          
          <div className="relative bg-[#F8FAFC] w-full max-w-5xl h-full lg:h-auto max-h-[90vh] rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-500">
            {/* Profile Left Sidebar */}
            <div className="lg:w-96 bg-white border-x border-slate-200 p-10 flex flex-col items-center text-center gap-8">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-emerald-500/10 blur-[40px] rounded-full scale-110"></div>
                <img 
                  src={selectedStaff.image || `https://via.placeholder.com/200/10b981/ffffff?text=${selectedStaff.name.charAt(0)}`} 
                  alt={selectedStaff.name} 
                  className="w-full h-full object-cover rounded-[3rem] border-8 border-white shadow-2xl relative z-10"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">{isRtl ? selectedStaff.nameAr : selectedStaff.name}</h2>
                  <p className="text-emerald-600 font-black uppercase tracking-widest text-[10px]">{isRtl ? selectedStaff.titleAr : selectedStaff.title}</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <div className="flex text-amber-500">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={selectedStaff.rating >= s ? "currentColor" : "none"} />)}
                  </div>
                  <span className="text-xs font-black text-slate-400">{selectedStaff.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              <div className="w-full space-y-4 pt-8 border-t border-slate-100">
                <div className={`flex items-center gap-4 text-xs font-bold text-slate-600 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                  <Mail size={16} className="text-emerald-500" />
                  <span className="truncate">{selectedStaff.email}</span>
                </div>
                <div className={`flex items-center gap-4 text-xs font-bold text-slate-600 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                  <Building2 size={16} className="text-emerald-500" />
                  <span>{isRtl ? selectedStaff.departmentAr || selectedStaff.department : selectedStaff.department}</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedStaff(null)}
                className="mt-auto w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg"
              >
                {isRtl ? 'إغلاق الملف' : 'Close Profile'}
              </button>
            </div>

            {/* Profile Content Main Area */}
            <div className={`flex-1 overflow-y-auto p-12 lg:p-16 custom-scrollbar ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="space-y-12">
                {/* Biography Section */}
                <div className="space-y-6">
                  <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <User size={20} className="text-emerald-600" />
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{isRtl ? 'السيرة الذاتية المهنية' : 'Professional Biography'}</h3>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed text-base">
                    {isRtl ? selectedStaff.bioAr : selectedStaff.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Academic Specialization */}
                  <div className="space-y-6">
                    <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <GraduationCap size={20} className="text-emerald-600" />
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{isRtl ? 'التخصص الأكاديمي' : 'Academic Focus'}</h3>
                    </div>
                    <div className="bg-white border border-slate-200 p-6 rounded-3xl">
                      <p className="text-sm font-bold text-slate-700">{isRtl ? selectedStaff.specializationAr : selectedStaff.specialization}</p>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="space-y-6">
                    <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Clock size={20} className="text-emerald-600" />
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{isRtl ? 'الساعات المكتبية' : 'Office Hours'}</h3>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
                      <p className="text-xs font-black text-emerald-700 uppercase tracking-widest">{isRtl ? selectedStaff.officeHoursAr : selectedStaff.officeHours}</p>
                    </div>
                  </div>
                </div>

                {/* Courses Taught */}
                <div className="space-y-6">
                  <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <BookOpen size={20} className="text-emerald-600" />
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{isRtl ? 'المقررات الدراسية' : 'Courses Taught'}</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(isRtl ? selectedStaff.coursesAr : selectedStaff.courses)?.map((course, i) => (
                      <div key={i} className={`p-5 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 group hover:border-emerald-500 transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                          <CheckCircle size={18} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Institutional Note */}
                <div className="bg-slate-900 p-8 rounded-[2.5rem] flex items-center gap-6">
                   <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-500">
                     <Building2 size={24} />
                   </div>
                   <div className={isRtl ? 'text-right' : 'text-left'}>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">{isRtl ? 'بيانات مؤسسية' : 'Institutional Data'}</p>
                      <p className="text-xs font-bold text-slate-300">
                        {isRtl 
                          ? 'هذا الملف مُدار من قبل شؤون أعضاء هيئة التدريس بجامعة الزقازيق الأهلية. كافة البيانات محدثة للعام الأكاديمي ٢٠٢٤.' 
                          : 'This profile is managed by ZNU Faculty Affairs. All data is updated for the 2024 academic year.'}
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default StaffDirectory;
