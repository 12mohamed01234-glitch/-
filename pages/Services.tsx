
import React from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Search,
  Filter,
  CreditCard,
  History
} from 'lucide-react';
import { SERVICES } from '../constants';
import { Language } from '../types';

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const isRtl = lang === 'ar';
  
  return (
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ${isRtl ? 'text-right' : 'text-left'}`}>
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className={isRtl ? 'order-last' : ''}>
          <h1 className="text-3xl font-bold text-white">{isRtl ? 'مركز الخدمات المؤسسية' : 'Institutional Services Hub'}</h1>
          <p className="text-slate-400 mt-1">{isRtl ? 'البوابة المركزية للطلبات الأكاديمية والإدارية والمالية.' : 'Central gateway for academic, administrative, and financial requests.'}</p>
        </div>
        <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
           <div className={`bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 flex items-center gap-3 w-64 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Search size={16} className="text-slate-500" />
              <input type="text" placeholder={isRtl ? 'تصفية الخدمات...' : 'Filter services...'} className={`bg-transparent text-xs outline-none w-full ${isRtl ? 'text-right' : ''}`} />
           </div>
           <button className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-all">
             <Filter size={18} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SERVICES.map((service) => (
          <div 
            key={service.id} 
            className={`group bg-[#111827] border border-slate-800 rounded-3xl p-8 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-900/10 transition-all flex flex-col ${isRtl ? 'text-right' : 'text-left'}`}
          >
            <div className={`flex justify-between items-start mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                service.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {service.status}
              </span>
            </div>
            
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">{service.category}</p>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3 leading-tight">{isRtl ? service.titleAr : service.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-1">{isRtl ? service.descriptionAr : service.description}</p>
            
            <button 
              disabled={service.status !== 'Available'}
              className={`w-full py-3 bg-slate-800 hover:bg-blue-600 disabled:bg-slate-900 disabled:text-slate-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group/btn ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <span>{isRtl ? 'تشغيل الخدمة' : 'Launch Service'}</span>
              <ExternalLink size={14} className={`group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className={`text-xl font-bold text-white mb-6 flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <History size={20} className="text-blue-500" />
          {isRtl ? 'نشاط الطلبات الأخير' : 'Recent Request Activity'}
        </h2>
        <div className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">
           {[
             { title: isRtl ? 'سجل أكاديمي رسمي (رقمي)' : 'Official Transcript (Digital)', date: isRtl ? 'منذ يومين' : '2 days ago', status: isRtl ? 'مكتمل' : 'Completed', ref: 'ZNU-SERV-8821' },
             { title: isRtl ? 'تسجيل الفصل الصيفي' : 'Summer Course Registration', date: isRtl ? 'منذ 5 أيام' : '5 days ago', status: isRtl ? 'قيد الانتظار' : 'Pending Approval', ref: 'ZNU-SERV-9012' },
             { title: isRtl ? 'الدعم الفني: دخول البوابة' : 'IT Helpdesk: Portal Login', date: 'Oct 02, 2024', status: isRtl ? 'تم الحل' : 'Resolved', ref: 'ZNU-SERV-7712' },
           ].map((req, i) => (
             <div key={i} className={`p-6 border-b border-slate-800 last:border-0 flex items-center justify-between hover:bg-slate-800/30 transition-all ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-xl ${
                    req.status === 'Completed' || req.status === 'Resolved' || req.status === 'مكتمل' || req.status === 'تم الحل' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {req.status === 'Completed' || req.status === 'Resolved' || req.status === 'مكتمل' || req.status === 'تم الحل' ? <CheckCircle size={18} /> : <Clock size={18} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">{req.title}</h4>
                    <p className={`text-[10px] text-slate-500 uppercase font-black tracking-widest ${isRtl ? 'text-right' : ''}`}>{req.ref} • {req.date}</p>
                  </div>
                </div>
                <div className={isRtl ? 'text-left' : 'text-right'}>
                   <p className={`text-[10px] font-black uppercase tracking-tighter ${
                     req.status === 'Completed' || req.status === 'Resolved' || req.status === 'مكتمل' || req.status === 'تم الحل' ? 'text-emerald-500' : 'text-blue-500'
                   }`}>{req.status}</p>
                   <button className="text-[10px] font-black text-slate-600 hover:text-white uppercase mt-1">{isRtl ? 'عرض التفاصيل' : 'View Details'}</button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
