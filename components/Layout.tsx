
import React, { useState, useRef, useEffect } from 'react';
import {
  Globe,
  User,
  LogOut,
  ChevronRight,
  Monitor,
  Settings,
  Shield,
  CreditCard,
  UserCircle,
  Bell,
  Facebook,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { AppView, User as UserType, Language } from '../types';
import { NAV_ITEMS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  user: UserType | null;
  onLogout: () => void;
  lang: Language;
  onToggleLang: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, user, onLogout, lang, onToggleLang }) => {
  const isRtl = lang === 'ar';
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans ${isRtl ? 'flex-row-reverse' : 'flex-row'}`} dir={isRtl ? 'rtl' : 'ltr'}>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Institutional Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 w-72 bg-white border-x border-slate-200 flex flex-col z-50 shadow-sm transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')}
        lg:translate-x-0 ${isRtl ? 'right-0' : 'left-0'}
      `}>
        <div className="p-8 flex flex-col items-center gap-6 border-b border-slate-100 relative">
          {/* Close Button for Mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 lg:hidden"
          >
            <X size={20} />
          </button>

          <div className="relative group cursor-pointer" onClick={() => onViewChange(AppView.LANDING)}>
            <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img src="https://via.placeholder.com/150/10b981/ffffff?text=ZNU" alt="ZNU Seal" className="w-16 h-16 object-contain relative z-10" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-[11px] font-black text-slate-900 uppercase tracking-tighter leading-none">Zagazig National University</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em]">{isRtl ? 'جامعة الزقازيق الأهلية' : 'ZNU Official Portal'}</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="px-5 text-[10px] uppercase font-black text-slate-400 mb-5 tracking-widest">{isRtl ? 'المنظومة الأكاديمية' : 'Academic System'}</p>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 group ${activeView === item.id
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-600'
                }`}
            >
              <span className={`${activeView === item.id ? 'text-white' : 'text-slate-300 group-hover:text-emerald-500'}`}>
                {item.icon}
              </span>
              <span className="font-black text-xs uppercase tracking-tight">{isRtl ? item.labelAr : item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer - Identity & Social */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <a
            href="https://www.facebook.com/share/1DXuDXLMdU/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl group hover:border-blue-500 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Facebook size={16} />
              </div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{isRtl ? 'فيسبوك الجامعة' : 'ZNU Facebook'}</span>
            </div>
            <ExternalLink size={12} className="text-slate-300 group-hover:text-blue-500" />
          </a>
        </div>
      </aside>

      {/* Primary Workspace */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Intelligence Header */}
        <header className="h-20 lg:h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-4 lg:px-12 sticky top-0 z-40 transition-all">
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-500 hover:text-emerald-600 lg:hidden"
            >
              <Menu size={24} />
            </button>

            <button
              onClick={onToggleLang}
              className="group flex items-center gap-2 lg:gap-3 px-3 lg:px-5 py-2 lg:py-2.5 bg-white border border-slate-200 rounded-2xl text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all text-slate-700"
            >
              <Globe size={14} className="text-emerald-600 group-hover:rotate-12 transition-transform" />
              <span>{isRtl ? 'English' : 'العربية'}</span>
            </button>
            <div className="hidden lg:block h-6 w-[1px] bg-slate-200"></div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]"></span>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{isRtl ? 'النظام متصل' : 'System Online'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden xl:flex flex-col items-end gap-1">
              <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-tighter leading-none">Zagazig National University</h2>
              <div className="flex items-center gap-2">
                <Shield size={10} className="text-emerald-600" />
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{isRtl ? 'منظومة معتمدة آمنة' : 'Verified Secure Gateway'}</p>
              </div>
            </div>

            <button className="p-2 lg:p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-emerald-600 transition-all relative group">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20"></span>
            </button>

            {/* Profile Matrix */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-2 lg:gap-4 p-1.5 lg:p-2 rounded-2xl border transition-all duration-300 ${isProfileOpen ? 'bg-emerald-50 border-emerald-200 ring-4 ring-emerald-500/5' : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-emerald-600/20">
                  {user ? (isRtl ? user.nameAr.charAt(0) : user.name.charAt(0)) : <User size={20} />}
                </div>
                {user && (
                  <div className={`hidden lg:block text-xs font-bold ${isRtl ? 'text-right' : 'text-left'}`}>
                    <p className="text-slate-900 truncate max-w-[140px] font-black">{isRtl ? user.nameAr : user.name}</p>
                    <p className="text-[9px] text-emerald-600 uppercase font-black tracking-widest mt-0.5">{user.id}</p>
                  </div>
                )}
              </button>

              {/* Dynamic Profile Matrix Menu */}
              {isProfileOpen && user && (
                <div className={`absolute top-full mt-4 w-72 lg:w-80 bg-white border border-slate-200 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl p-6 lg:p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300 ${isRtl ? 'left-0' : 'right-0'}`}>
                  <div className="flex flex-col items-center text-center gap-4 pb-6 border-b border-slate-100">
                    <div className="w-20 h-20 bg-emerald-50 border-4 border-white rounded-[2rem] flex items-center justify-center text-3xl font-black text-emerald-600 shadow-xl">
                      {isRtl ? user.nameAr.charAt(0) : user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg">{isRtl ? user.nameAr : user.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">{user.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black rounded-full uppercase">{isRtl ? user.facultyAr : user.faculty}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[9px] font-black rounded-full uppercase">{isRtl ? 'مستوى ' + user.level : 'Lvl ' + user.level}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { id: AppView.PROFILE, icon: <UserCircle size={18} />, label: isRtl ? 'الملف الأكاديمي الموحد' : 'Unified Academic Profile' },
                      { id: 'security', icon: <Shield size={18} />, label: isRtl ? 'إعدادات الأمان والخصوصية' : 'Security & Privacy' },
                      { id: 'billing', icon: <CreditCard size={18} />, label: isRtl ? 'إدارة الرسوم والمدفوعات' : 'Fees & Financials' },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (item.id === AppView.PROFILE) onViewChange(item.id);
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl text-[11px] font-black transition-all hover:bg-slate-50 text-slate-600 hover:text-emerald-600 uppercase tracking-tight"
                      >
                        <span className="text-slate-300">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-600 rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <LogOut size={18} />
                      <span>{isRtl ? 'إنهاء الجلسة الآمنة' : 'Terminate Secure Session'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Global Workplace Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}

          {/* Enterprise Footer */}
          <footer className="mt-32 bg-white border-t border-slate-200 p-8 lg:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 relative z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-3xl bg-emerald-600 p-3 shadow-xl shadow-emerald-600/20">
                    <img src="https://via.placeholder.com/150/ffffff/000000?text=ZNU" alt="ZNU Seal" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-xl tracking-tighter">ZNU</h3>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{isRtl ? 'جامعة الزقازيق الأهلية' : 'National Excellence'}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {isRtl
                    ? 'صرح علمي وطني متميز يهدف إلى صياغة مستقبل التعليم العالي من خلال الابتكار والبحث العلمي والتحول الرقمي الشامل.'
                    : 'A distinguished national scientific institution aiming to shape the future of higher education through innovation, scientific research, and comprehensive digital transformation.'}
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/share/1DXuDXLMdU/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:scale-110"
                  >
                    <Facebook size={22} />
                  </a>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 hover:text-emerald-600 transition-all shadow-sm hover:scale-110">
                    <Globe size={22} />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.3em]">{isRtl ? 'المنظومة الرقمية' : 'Digital System'}</h4>
                <ul className="space-y-4 text-sm text-slate-500 font-bold">
                  <li className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2">
                    <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    {isRtl ? 'عن المنظومة الموحدة' : 'About Unified System'}
                  </li>
                  <li className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2">
                    <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    {isRtl ? 'دليل الكليات والبرامج' : 'Faculties & Programs'}
                  </li>
                  <li className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2">
                    <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    {isRtl ? 'مركز الشؤون الأكاديمية' : 'Academic Affairs'}
                  </li>
                </ul>
              </div>

              <div className="space-y-8">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.3em]">{isRtl ? 'الدعم والمساعدة' : 'Support Center'}</h4>
                <ul className="space-y-4 text-sm text-slate-500 font-bold">
                  <li className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2">
                    <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    {isRtl ? 'مركز المساعدة الرقمي' : 'Digital Helpdesk'}
                  </li>
                  <li className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2">
                    <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    {isRtl ? 'سياسات النزاهة والخصوصية' : 'Privacy & Integrity Policy'}
                  </li>
                  <li className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2">
                    <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    {isRtl ? 'تقديم البلاغات والشكاوى' : 'Reporting & Complaints'}
                  </li>
                </ul>
              </div>

              <div className="space-y-8">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.3em]">{isRtl ? 'التواصل المؤسسي' : 'Institutional Contact'}</h4>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Monitor size={16} /></div>
                    <div>
                      <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{isRtl ? 'الموقع' : 'Location'}</p>
                      <p className="text-xs font-bold text-slate-500 mt-1">{isRtl ? 'الزقازيق، محافظة الشرقية، مصر' : 'Zagazig, Sharqia Governorate, Egypt'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-lg"><Globe size={16} /></div>
                    <div>
                      <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{isRtl ? 'البريد الرسمي' : 'Official Email'}</p>
                      <p className="text-xs font-bold text-slate-500 mt-1">support@znu.edu.eg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Recognition Matrix */}
            <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-10 relative">
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">
                  © 2024 Zagazig National University • Unified Digital Infrastructure
                </p>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  {isRtl ? 'جميع الحقوق محفوظة لمنظومة الجامعة الرقمية' : 'All rights reserved to ZNU Digital Systems'}
                </p>
              </div>

              {/* Official Dev Credit Widget */}
              <div className="flex items-center gap-6 bg-[#0F172A] p-6 rounded-[2rem] border border-slate-800 shadow-2xl transition-transform hover:scale-105 group cursor-default">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:rotate-12 transition-transform">
                  <User size={24} />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{isRtl ? 'تم التطوير بواسطة' : 'Developed By'}</p>
                  <h4 className="text-sm font-black text-white uppercase tracking-tighter">
                    {isRtl ? 'المهندس محمد ياسر' : 'Eng. Mohamed Yasser'}
                  </h4>
                  <p className="text-[9px] font-bold text-emerald-500 uppercase mt-0.5 tracking-tighter">
                    {isRtl ? 'كلية الهندسة - قسم الميكاترونكس - جامعة الزقازيق الأهلية' : 'Engineering Faculty • Mechatronics Dept • ZNU'}
                  </p>
                </div>
              </div>

              <div className="flex gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <span className="hover:text-emerald-600 cursor-pointer transition-colors underline decoration-slate-200 underline-offset-4">{isRtl ? 'سياسة الاستخدام' : 'Usage Policy'}</span>
                <span className="hover:text-emerald-600 cursor-pointer transition-colors underline decoration-slate-200 underline-offset-4">{isRtl ? 'مركز الشكاوى' : 'Feedback Hub'}</span>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Global CSS for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
};

export default Layout;
