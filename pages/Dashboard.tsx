
import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Award, 
  School,
  ArrowRight,
  Monitor,
  CheckCircle,
  FileText,
  BookOpen,
  Mail,
  CreditCard,
  Database,
  Globe,
  ClipboardList,
  CloudLightning,
  PhoneCall,
  Zap,
  Library,
  Scale
} from 'lucide-react';
import { User, Language, AppView } from '../types';
import { SERVICES } from '../constants';

interface DashboardProps {
  user: User | null;
  lang: Language;
  onViewChange: (view: AppView) => void;
}

const ServiceIcon = ({ icon, color }: { icon: string, color?: string }) => {
  const props = { size: 36, className: color || 'text-slate-400' };
  switch (icon) {
    case 'Library': return <Library {...props} />;
    case 'Users': return <Users {...props} />;
    case 'CreditCard': return <CreditCard {...props} />;
    case 'Mail': return <Mail {...props} />;
    case 'UserCircle': return <GraduationCap {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Database': return <Database {...props} />;
    case 'FileCheck': return <CheckCircle {...props} />;
    case 'ClipboardList': return <ClipboardList {...props} />;
    case 'CloudLightning': return <CloudLightning {...props} />;
    case 'PhoneCall': return <PhoneCall {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Award': return <Award {...props} />;
    case 'Scale': return <Scale {...props} />;
    default: return <Monitor {...props} />;
  }
};

const Dashboard: React.FC<DashboardProps> = ({ user, lang, onViewChange }) => {
  const isRtl = lang === 'ar';
  
  const handleServiceClick = (service: any) => {
    if (service.externalUrl) {
      window.open(service.externalUrl, '_blank');
    } else if (service.view) {
      onViewChange(service.view);
    }
  };

  return (
    <div className="space-y-16 p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Upper Stats & Welcome Section (Simplified for this request focus) */}
      <div className="relative">
        <div className="bg-slate-900 rounded-[3rem] p-12 overflow-hidden flex flex-col lg:flex-row items-center gap-12 justify-between shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className={`flex flex-col gap-2 relative z-10 ${isRtl ? 'lg:items-end text-right' : 'lg:items-start text-left'}`}>
             <div className="flex items-center gap-3 mb-4">
               <span className="px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-widest">
                 {user ? 'Active Student' : 'Institutional Portal'}
               </span>
               {user && <span className="px-4 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black rounded-full uppercase tracking-widest">{user.id}</span>}
             </div>
             <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-2">
               {user ? (isRtl ? user.nameAr : user.name) : (isRtl ? 'جامعة الزقازيق الأهلية' : 'Zagazig National University')}
             </h2>
             <p className="text-emerald-500 font-black text-xl uppercase tracking-widest">
               {user 
                 ? (isRtl ? `طالب بقسم ${user.departmentAr} — ${user.facultyAr}` : `${user.faculty} — ${user.department}`)
                 : (isRtl ? 'المنصة الرقمية الموحدة — مستقبل التعليم الذكي' : 'Unified Digital Platform — Future of Smart Education')
               }
             </p>
             <div className="w-32 h-1 bg-emerald-500 rounded-full mt-6 mb-6"></div>
             <p className="max-w-2xl text-slate-400 font-medium leading-relaxed text-lg">
               {isRtl 
                 ? 'تم تطوير هذه البوابة كمشروع تخرج بواسطة أحد كوادر الجامعة المتميزة بقسم الميكاترونكس، مما يجسد التزام الجامعة بالتميز التطبيقي والتقني.' 
                 : 'This portal was developed as a graduation project by one of the university\'s distinguished cadres in the Mechatronics Department, embodying ZNU\'s commitment to applied and technical excellence.'}
             </p>
          </div>

          <div className="relative z-10 w-56 h-56 bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-[4rem] flex items-center justify-center text-emerald-500 shadow-2xl group transition-all hover:scale-105">
            <div className="absolute inset-0 bg-emerald-500 opacity-5 blur-2xl group-hover:opacity-20 transition-opacity"></div>
            <GraduationCap size={110} className="group-hover:rotate-12 transition-transform duration-500" />
          </div>
        </div>
      </div>

      {/* Stats Quick Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`}>
        {[
          { icon: <Award className="text-amber-500" />, label: isRtl ? 'جوائز التميز' : 'Excellence Awards', value: '85' },
          { icon: <Users className="text-blue-500" />, label: isRtl ? 'هيئة التدريس' : 'Teaching Staff', value: '450' },
          { icon: <GraduationCap className="text-emerald-500" />, label: isRtl ? 'الطلاب المقيدين' : 'Registered Students', value: '15K+' },
          { icon: <School className="text-indigo-500" />, label: isRtl ? 'كليات الجامعة' : 'University Colleges', value: '12' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 p-10 rounded-[2.5rem] flex flex-row-reverse items-center justify-between transition-all hover:bg-slate-800 hover:border-emerald-500/40 shadow-xl group">
             <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center border border-slate-700 group-hover:bg-emerald-500/10 transition-colors">
               {stat.icon}
             </div>
             <div className={isRtl ? 'text-right' : 'text-left'}>
               <h3 className="text-4xl font-black text-white">{stat.value}</h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 group-hover:text-emerald-400 transition-colors">{stat.label}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Electronic Services Section - THE DETAILED GRID REQUESTED */}
      <div className="space-y-16 pt-12 pb-20">
        <div className={`flex flex-col items-center text-center space-y-4`}>
           <h2 className="text-6xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-6">
             {isRtl ? 'الخدمات' : 'Electronic'} <span className="text-red-600 underline decoration-red-100 decoration-8 underline-offset-8">{isRtl ? 'الاكترونية' : 'Services'}</span>
           </h2>
           <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">
             {isRtl ? 'بوابة المنظومة الرقمية المتكاملة' : 'INTEGRATED DIGITAL SYSTEM PORTAL'}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
          {SERVICES.map((service) => (
            <button 
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="group bg-white border border-slate-100 p-12 rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-10 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:border-emerald-200 transition-all hover:-translate-y-4 shadow-sm relative overflow-hidden"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Icon Container with screenshot-like 3D feel */}
              <div className="relative w-32 h-32 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                 <div className="absolute inset-0 bg-slate-50 rounded-[2.5rem] group-hover:bg-white transition-colors border border-slate-100 shadow-inner"></div>
                 <div className={`absolute top-2 right-2 w-12 h-12 rounded-full opacity-10 blur-xl ${service.color || 'bg-slate-500'}`}></div>
                 <ServiceIcon icon={service.icon} color={service.color} />
              </div>

              <div className="space-y-4 relative z-10">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{isRtl ? service.category : service.category}</p>
                <h4 className="text-xl font-black text-slate-800 leading-tight tracking-tight group-hover:text-emerald-600 transition-colors">
                  {isRtl ? service.titleAr : service.title}
                </h4>
                
                {/* Special UI for Government Complaints 16528 */}
                {service.id === 'gov_complaints' && (
                  <div className="flex flex-col items-center gap-2 mt-4 animate-pulse">
                    <img src="https://via.placeholder.com/50/ff0000/ffffff?text=EGY" alt="Eagle" className="w-8 h-8 object-contain opacity-50 mb-1" />
                    <p className="text-4xl font-black text-red-600 font-mono tracking-tighter leading-none">١٦٥٢٨</p>
                    <div className="h-1 w-16 bg-red-600 rounded-full mt-1"></div>
                  </div>
                )}

                <div className="w-10 h-1.5 bg-slate-100 mx-auto group-hover:w-24 group-hover:bg-emerald-500 transition-all rounded-full"></div>
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{isRtl ? 'جاهز للاستخدام' : 'READY TO USE'}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
