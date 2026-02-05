
import React from 'react';
import { 
  BarChart3, 
  Award, 
  BookMarked, 
  ArrowDownToLine, 
  Printer, 
  TrendingUp,
  FileBadge
} from 'lucide-react';
import { User, CourseResult, Language } from '../types';

// Fixed mock data with missing Arabic names
const MOCK_RESULTS: CourseResult[] = [
  { code: 'CS401', name: 'Software Engineering II', nameAr: 'هندسة البرمجيات 2', credits: 3, grade: 'A', points: 4.0, semester: 'Spring 2024' },
  { code: 'CS402', name: 'Machine Learning', nameAr: 'تعلم الآلة', credits: 4, grade: 'A-', points: 3.7, semester: 'Spring 2024' },
  { code: 'CS403', name: 'Cloud Computing', nameAr: 'الحوسبة السحابية', credits: 3, grade: 'B+', points: 3.3, semester: 'Spring 2024' },
  { code: 'CS404', name: 'Database Security', nameAr: 'أمن قواعد البيانات', credits: 3, grade: 'A', points: 4.0, semester: 'Spring 2024' },
  { code: 'CS405', name: 'Human Computer Interaction', nameAr: 'التفاعل بين الإنسان والحاسوب', credits: 2, grade: 'B', points: 3.0, semester: 'Spring 2024' },
];

interface ResultsProps {
  user: User;
  lang: Language;
}

const Results: React.FC<ResultsProps> = ({ user, lang }) => {
  const isRtl = lang === 'ar';
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className={isRtl ? 'order-last' : ''}>
          <h1 className="text-3xl font-bold text-white">{isRtl ? 'الأداء الأكاديمي' : 'Academic Performance'}</h1>
          <p className="text-slate-400 mt-1">{isRtl ? 'بيان رسمي بالنتائج وتتبع تطور المعدل التراكمي.' : 'Official statement of results and GPA progression tracking.'}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-700 transition-all">
            <Printer size={16} />
            <span>{isRtl ? 'طباعة السجل' : 'Print Transcript'}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-900/20 transition-all">
            <ArrowDownToLine size={16} />
            <span>{isRtl ? 'تحميل PDF' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`bg-[#111827] border border-slate-800 rounded-3xl p-6 flex items-center gap-6 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
          <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">{isRtl ? 'المعدل التراكمي' : 'Cumulative GPA'}</p>
            <h3 className="text-3xl font-black text-white">{user.gpa.toFixed(2)}</h3>
          </div>
        </div>
        <div className={`bg-[#111827] border border-slate-800 rounded-3xl p-6 flex items-center gap-6 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
          <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500">
            <BookMarked size={28} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">{isRtl ? 'الساعات المكتسبة' : 'Credits Earned'}</p>
            <h3 className="text-3xl font-black text-white">{user.creditsEarned}</h3>
          </div>
        </div>
        <div className={`bg-[#111827] border border-slate-800 rounded-3xl p-6 flex items-center gap-6 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
          <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-500">
            <Award size={28} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">{isRtl ? 'الحالة الأكاديمية' : 'Academic Standing'}</p>
            <h3 className="text-xl font-black text-emerald-400">{isRtl ? 'ممتاز' : 'EXCELLENT'}</h3>
          </div>
        </div>
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className={`px-8 py-6 bg-slate-800/20 border-b border-slate-800 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <FileBadge className="text-blue-500" size={20} />
            <h3 className="font-bold text-white uppercase tracking-wider text-sm">{isRtl ? 'نتيجة الفصل الدراسي: ربيع 2024' : 'Semester Result: Spring 2024'}</h3>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-full">{isRtl ? 'إجمالي الساعات: 15' : 'Term Total: 15 Credits'}</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className={`w-full ${isRtl ? 'text-right' : 'text-left'}`}>
            <thead>
              <tr className={`border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest ${isRtl ? 'flex-row-reverse' : ''}`}>
                <th className="px-8 py-4">{isRtl ? 'كود المقرر' : 'Course Code'}</th>
                <th className="px-8 py-4">{isRtl ? 'اسم المادة' : 'Subject Title'}</th>
                <th className="px-8 py-4">{isRtl ? 'الساعات' : 'Credits'}</th>
                <th className="px-8 py-4">{isRtl ? 'التقدير' : 'Grade'}</th>
                <th className={`px-8 py-4 ${isRtl ? 'text-left' : 'text-right'}`}>{isRtl ? 'النقاط' : 'Points'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MOCK_RESULTS.map((res, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-4 font-mono text-xs text-blue-400">{res.code}</td>
                  <td className="px-8 py-4 text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{isRtl ? res.nameAr : res.name}</td>
                  <td className="px-8 py-4 text-sm text-slate-400">{res.credits}</td>
                  <td className="px-8 py-4">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black border ${
                      res.grade.startsWith('A') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      res.grade.startsWith('B') ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {res.grade}
                    </span>
                  </td>
                  <td className={`px-8 py-4 font-mono text-sm text-slate-300 ${isRtl ? 'text-left' : 'text-right'}`}>{res.points.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`px-8 py-6 bg-slate-900/50 border-t border-slate-800 flex ${isRtl ? 'justify-start' : 'justify-end'}`}>
           <div className={`${isRtl ? 'text-left' : 'text-right'} space-y-1`}>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{isRtl ? 'معدل الفصل الدراسي' : 'Semester GPA'}</p>
             <h4 className="text-2xl font-black text-white">3.64</h4>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">
          <h3 className={`font-bold text-white mb-6 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <BarChart3 size={18} className="text-blue-500" />
            {isRtl ? 'تطور المعدل' : 'GPA Trend'}
          </h3>
          <div className="h-48 flex items-end gap-4">
             {[3.2, 3.4, 3.55, 3.65, 3.82].map((val, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-3">
                 <div 
                   className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all hover:scale-105 duration-500" 
                   style={{ height: `${(val / 4) * 100}%` }}
                 ></div>
                 <span className="text-[10px] font-bold text-slate-500">{isRtl ? `فصل ${i+1}` : `Sem ${i+1}`}</span>
               </div>
             ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/20 border border-blue-500/20 rounded-3xl p-8 flex flex-col justify-center text-center">
           <h3 className="text-2xl font-black text-white mb-4">{isRtl ? 'مرشح للوحة شرف العميد' : 'Dean\'s List Candidate'}</h3>
           <p className="text-slate-400 text-sm leading-relaxed mb-6">
             {isRtl 
               ? `بناءً على معدلك التراكمي الحالي ${user.gpa}، أنت مؤهل للانضمام إلى لوحة شرف العميد للعام الأكاديمي 2024.`
               : `Based on your current cumulative GPA of ${user.gpa}, you are eligible for the Dean's List for the 2024 academic year.`}
           </p>
           <button className="w-full py-3 bg-white text-blue-900 font-black rounded-2xl hover:bg-slate-200 transition-all">
             {isRtl ? 'عرض الجوائز والتكريمات' : 'View Honors & Awards'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
