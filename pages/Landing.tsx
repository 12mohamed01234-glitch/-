
import React from 'react';
import { 
  UserCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  Facebook,
  ShieldCheck,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { AppView, Language } from '../types';

interface LandingProps {
  onStart: (view: AppView) => void;
  lang: Language;
}

const Landing: React.FC<LandingProps> = ({ onStart, lang }) => {
  const isRtl = lang === 'ar';

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden flex flex-col items-center justify-center p-8 selection:bg-blue-500/30">
      {/* Background Atmosphere - Institutional Grade */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] bg-blue-900/10 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-slate-800/10 blur-[180px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      {/* University Official Seal */}
      <div className="absolute top-12 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-6 duration-1000">
        <div className="w-24 h-24 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative group">
          <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img src="https://via.placeholder.com/150/ffffff/000000?text=ZNU" alt="ZNU Seal" className="w-16 h-16 object-contain relative z-10" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-[12px] font-black uppercase tracking-[0.7em] text-slate-500">Zagazig National University</h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto"></div>
        </div>
      </div>

      {/* Core Messaging Section */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-20 py-24">
        <div className="space-y-8 animate-in fade-in zoom-in-98 duration-1000 delay-300">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-tight text-white">
            {isRtl ? 'جامعة الزقازيق الأهلية' : 'Zagazig National University'}
          </h1>
          
          <div className="flex flex-col items-center gap-5">
             <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-500/5 border border-blue-500/20 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-lg md:text-2xl font-bold text-blue-400/90 tracking-wide">
                  {isRtl ? 'النفاذ الرقمي الموحد للخدمات الأكاديمية والطلابية' : 'Official Academic and Student Digital Access'}
                </p>
             </div>
          </div>

          <p className="max-w-3xl mx-auto text-slate-400 font-medium text-xl leading-relaxed opacity-70">
            {isRtl 
              ? 'بوابة مؤسسية متكاملة تهدف إلى تعزيز تجربة التعلم الرقمي وتوفير النفاذ الآمن والمنظم لكافة المصادر الأكاديمية والبيانات الجامعية لمنسوبي الجامعة.' 
              : 'An integrated institutional portal aimed at enhancing the digital learning experience and providing secure, organized access to all academic resources and university data for our members.'}
          </p>
        </div>

        {/* Action Controls - Institutional Style */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <button 
            onClick={() => onStart(AppView.LOGIN)}
            className="group px-14 py-6 bg-white text-slate-950 font-black rounded-3xl transition-all hover:scale-105 active:scale-95 flex items-center gap-4 text-lg uppercase tracking-wider shadow-2xl shadow-white/5"
          >
            <UserCheck size={22} />
            <span>{isRtl ? 'دخول منسوبي الجامعة' : 'University Access'}</span>
          </button>
          
          <button 
            onClick={() => onStart(AppView.FACULTIES)}
            className="group px-12 py-6 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white font-black rounded-3xl transition-all hover:border-blue-500/30 flex items-center gap-4 text-lg uppercase tracking-wider"
          >
            <Building2 size={22} className="text-blue-400" />
            <span>{isRtl ? 'الكليات والبرامج الأكاديمية' : 'Academic Programs'}</span>
          </button>

          <button 
            onClick={() => onStart(AppView.DASHBOARD)}
            className="group px-10 py-6 bg-transparent border border-blue-500/20 text-blue-400 font-black rounded-3xl transition-all hover:bg-blue-500/5 flex items-center gap-4 text-lg uppercase tracking-wider"
          >
            <span>{isRtl ? 'الخدمات الأكاديمية' : 'Academic Services'}</span>
            {isRtl ? <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> : <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>

        {/* Strategic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-24 border-t border-white/5 animate-in fade-in duration-1000 delay-1000">
          {[
            { 
              icon: <BookOpen className="text-blue-400/50" />, 
              title: isRtl ? 'التميز الأكاديمي' : 'Academic Excellence', 
              desc: isRtl ? 'بناء بيئة تعليمية ذكية ومتكاملة' : 'Building a smart and integrated learning environment' 
            },
            { 
              icon: <ShieldCheck className="text-blue-400/50" />, 
              title: isRtl ? 'الخصوصية والنزاهة' : 'Privacy & Integrity', 
              desc: isRtl ? 'حماية بيانات منسوبي الجامعة وفق أعلى المعايير' : 'Protecting university data according to the highest standards' 
            },
            { 
              icon: <GraduationCap className="text-blue-400/50" />, 
              title: isRtl ? 'الابتكار التقني' : 'Technical Innovation', 
              desc: isRtl ? 'تبني أحدث الحلول الرقمية في إدارة التعليم' : 'Adopting the latest digital solutions in education management' 
            },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-5 group cursor-default">
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-white/5 rounded-2xl group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="font-black text-slate-100 tracking-wide uppercase text-base">{item.title}</h3>
              <p className="text-[12px] text-slate-500 font-bold leading-relaxed uppercase tracking-[0.15em]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Institutional Footer */}
      <div className="absolute bottom-10 flex flex-col items-center gap-6 animate-in fade-in duration-1000 delay-[1200ms]">
        {/* Compliance Metadata */}
        <div className="flex items-center gap-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
          <span>Institutional Standard 2024</span>
          <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
          <span>Official Digital Access Point</span>
        </div>
        
        {/* Official Social Link */}
        <a 
          href="https://www.facebook.com/share/1DXuDXLMdU/?mibextid=wwXIfr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/50 transition-all group"
        >
          <Facebook size={16} className="group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-black uppercase tracking-widest">
            {isRtl ? 'الصفحة الرسمية - جامعة الزقازيق الأهلية' : 'ZNU Official Social Media'}
          </span>
        </a>

        {/* Developer Official Credit */}
        <div className="flex flex-col items-center gap-2">
          <div className="px-6 py-2 bg-slate-900 border border-slate-800 rounded-xl">
             <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest text-center">
                {isRtl 
                  ? 'تم التصميم والتطوير بواسطة: م. محمد ياسر — كلية الهندسة قسم الميكاترونكس' 
                  : 'Designed & Developed by: Eng. Mohamed Yasser — Faculty of Engineering (Mechatronics)'}
             </p>
          </div>
          <span className="text-[10px] font-bold text-slate-700 tracking-[0.5em] hover:text-blue-500 transition-colors cursor-default">WWW.ZNU.EDU.EG</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
