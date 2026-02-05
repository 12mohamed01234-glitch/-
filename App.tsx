
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import FacultyDrive from './pages/FacultyDrive';
import StaffEvaluation from './pages/StaffEvaluation';
import StaffDirectory from './pages/StaffDirectory';
import Complaints from './pages/Complaints';
import Faculties from './pages/Faculties';
import Results from './pages/Results';
import Services from './pages/Services';
import Login from './pages/Login';
import { AppView, User, Language } from './types';
import { 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  Search,
  BookOpen,
  FileText
} from 'lucide-react';

const App: React.FC = () => {
  // Set initial view to LANDING
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Language>('ar');

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    // After login, always redirect to dashboard unless they came from specific restricted page
    setView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setView(AppView.LANDING);
  };

  const renderContent = () => {
    const isRtl = lang === 'ar';
    
    // Landing screen is a full-page experience, handled separately in the return
    if (view === AppView.LANDING) {
      return <Landing onStart={(v) => setView(v)} lang={lang} />;
    }

    switch (view) {
      case AppView.LOGIN:
        return <Login onLogin={handleLogin} lang={lang} />;
      case AppView.FACULTIES:
        return <Faculties />;
      case AppView.DRIVE:
        return <FacultyDrive lang={lang} />;
      case AppView.EVALUATION:
        return <StaffEvaluation />;
      case AppView.STAFF_DIRECTORY:
        return <StaffDirectory lang={lang} />;
      case AppView.COMPLAINTS:
        return <Complaints />;
      case AppView.RESULTS:
        // Restricted to logged in users only
        return user ? <Results user={user} lang={lang} /> : <Login onLogin={handleLogin} lang={lang} />;
      case AppView.SERVICES:
        return <Services lang={lang} />;
      case AppView.DASHBOARD:
        return <Dashboard user={user} lang={lang} onViewChange={setView} />;
      case AppView.SURVEYS:
        return (
          <div className="p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4">
             <div className="text-center space-y-4">
               <h2 className="text-4xl font-black text-slate-900 uppercase">{isRtl ? 'استبيانات الطلاب' : 'Student Surveys'}</h2>
               <p className="text-slate-500 font-bold uppercase">{isRtl ? 'ساهم في تطوير جودة التعليم بالجامعة' : 'Contribute to education quality at ZNU'}</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { title: 'تقييم الفصل الدراسي ربيع 2024', status: 'نشط', deadline: '30 أكتوبر' },
                 { title: 'استبيان المرافق والخدمات الجامعية', status: 'نشط', deadline: '15 نوفمبر' }
               ].map((s, i) => (
                 <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between hover:border-emerald-500 transition-all group">
                   <div>
                     <h3 className="text-xl font-bold text-slate-800">{isRtl ? s.title : 'Semester Evaluation'}</h3>
                     <p className="text-xs text-slate-400 mt-2 font-black uppercase">{isRtl ? `الموعد النهائي: ${s.deadline}` : `Deadline: ${s.deadline}`}</p>
                   </div>
                   <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase hover:bg-emerald-700 transition-all">{isRtl ? 'بدء الاستبيان' : 'Start'}</button>
                 </div>
               ))}
             </div>
          </div>
        );
      case AppView.ELEARNING:
        return (
          <div className="p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4">
             <div className="text-center space-y-4">
               <h2 className="text-4xl font-black text-slate-900 uppercase">{isRtl ? 'وحدة التعليم الإلكتروني' : 'E-Learning Unit'}</h2>
               <p className="text-slate-500 font-bold uppercase">{isRtl ? 'المنصة الرقمية للمحاضرات والاختبارات' : 'Digital Hub for Lectures & Exams'}</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { label: 'المحاضرات المسجلة', icon: <BookOpen className="text-blue-600" />, count: '24 محاضرة' },
                 { label: 'الاختبارات القصيرة', icon: <FileText className="text-emerald-600" />, count: '03 اختبارات' },
                 { label: 'المكتبة الرقمية', icon: <Search className="text-purple-600" />, count: '150+ مرجع' }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all shadow-sm">
                   <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center shadow-inner">{item.icon}</div>
                   <div>
                     <h3 className="text-xl font-black text-slate-800">{isRtl ? item.label : 'Lectures'}</h3>
                     <p className="text-xs text-emerald-600 font-black mt-2 uppercase tracking-widest">{isRtl ? item.count : 'New Items'}</p>
                   </div>
                   <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
                     {isRtl ? 'دخول المنصة' : 'Enter Platform'}
                   </button>
                 </div>
               ))}
             </div>
          </div>
        );
      case AppView.PROFILE:
        // Restricted to logged in users only
        return user ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 space-y-12 animate-in fade-in zoom-in-95">
             <div className="relative">
                <div className="w-48 h-48 bg-white border-8 border-emerald-500 rounded-[4rem] flex items-center justify-center text-5xl font-black text-emerald-600 shadow-2xl relative z-10">
                  {isRtl ? user.nameAr.charAt(0) : user.name.charAt(0)}
                </div>
                <div className="absolute inset-0 bg-emerald-500 blur-[80px] opacity-10 rounded-full scale-150"></div>
             </div>
             <div className="text-center space-y-4">
                <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">{isRtl ? user.nameAr : user.name}</h2>
                <div className="flex items-center justify-center gap-4">
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-700 text-xs font-black rounded-xl uppercase tracking-widest">{isRtl ? user.facultyAr : user.faculty}</span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 text-xs font-black rounded-xl uppercase tracking-widest">{user.id}</span>
                </div>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
               {[
                 { label: 'المعدل التراكمي', value: user.gpa.toFixed(2), sub: isRtl ? 'ممتاز' : 'Excellent' },
                 { label: 'الساعات المنجزة', value: user.creditsEarned, sub: isRtl ? 'ساعة معتمدة' : 'Credits' },
                 { label: 'المستوى الأكاديمي', value: user.level, sub: isRtl ? 'الرابع' : 'Level 4' },
                 { label: 'الرصيد المالي', value: '0.00', sub: isRtl ? 'جنية مصري' : 'EGP' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center space-y-2 hover:border-emerald-500 transition-colors">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? stat.label : 'STAT'}</p>
                    <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">{isRtl ? stat.sub : 'UNIT'}</p>
                 </div>
               ))}
             </div>
          </div>
        ) : <Login onLogin={handleLogin} lang={lang} />;
      default:
        return <div className="p-20 text-center font-black uppercase text-slate-300 text-4xl">Module Integration in Progress...</div>;
    }
  };

  // Special case: Landing page doesn't use the sidebar Layout
  if (view === AppView.LANDING) {
    return <Landing onStart={(v) => setView(v)} lang={lang} />;
  }

  return (
    <Layout 
      activeView={view} 
      onViewChange={setView} 
      user={user} 
      onLogout={handleLogout}
      lang={lang}
      onToggleLang={() => setLang(lang === 'ar' ? 'en' : 'ar')}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
