
import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  ChevronRight, 
  ShieldCheck, 
  Eye,
  ArrowRight
} from 'lucide-react';
import { User as UserType, Language } from '../types';

interface LoginProps {
  onLogin: (user: UserType) => void;
  lang: Language;
}

const Login: React.FC<LoginProps> = ({ onLogin, lang }) => {
  const isRtl = lang === 'ar';
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        id: studentId || '2024001',
        name: 'Mohamed Yasser',
        nameAr: 'المهندس محمد ياسر',
        role: 'student',
        faculty: 'Faculty of Engineering',
        facultyAr: 'كلية الهندسة',
        department: 'Mechatronics Dept.',
        departmentAr: 'قسم هندسة الميكاترونكس',
        level: 4,
        gpa: 3.82,
        creditsEarned: 112,
        avatar: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-8 lg:p-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col items-center gap-6 mb-12">
        <div className="relative">
          <div className="w-24 h-24 bg-white border-4 border-emerald-500 rounded-[2rem] flex items-center justify-center overflow-hidden shadow-xl shadow-emerald-500/10">
             <img src="https://via.placeholder.com/150/10b981/ffffff?text=ZNU" alt="ZNU" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="text-center">
           <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
             {isRtl ? 'بوابة الخدمات الإلكترونية' : 'Electronic Service Portal'}
           </h1>
           <p className="text-xl font-bold text-emerald-600 mt-2 tracking-widest uppercase">
             {isRtl ? 'جامعة الزقازيق الأهلية' : 'Zagazig National University'}
           </p>
        </div>
      </div>

      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl space-y-10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-50 rounded-full blur-3xl"></div>
        
        <div className="flex items-center justify-center gap-3 relative z-10">
          <ShieldCheck className="text-emerald-500" size={24} />
          <h2 className="text-2xl font-black text-slate-900 border-b-4 border-emerald-500 pb-2">
            {isRtl ? 'بيانات الدخول' : 'Access Credentials'}
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-8 relative z-10">
          <div className="space-y-3">
            <label className={`block text-[10px] font-black text-slate-400 uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
              {isRtl ? 'الكود الجامعي' : 'University Code'}
            </label>
            <div className="relative group">
               <User size={18} className={`absolute top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors ${isRtl ? 'right-5' : 'left-5'}`} />
               <input 
                type="text" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder={isRtl ? '2024001' : 'Student ID'}
                className={`w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-14 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold ${isRtl ? 'text-right' : 'text-left'}`}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className={`block text-[10px] font-black text-slate-400 uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
              {isRtl ? 'كلمة السر' : 'Access Token'}
            </label>
            <div className="relative group">
              <Lock size={18} className={`absolute top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors ${isRtl ? 'right-5' : 'left-5'}`} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className={`w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-14 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold ${isRtl ? 'text-right' : 'text-left'}`}
              />
              <button type="button" className={`absolute inset-y-0 flex items-center text-slate-300 hover:text-emerald-600 px-4 transition-colors ${isRtl ? 'left-2' : 'right-2'}`}>
                <Eye size={20} />
              </button>
            </div>
          </div>

          <div className={`flex items-center justify-between px-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
             <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">{isRtl ? 'تذكر بياناتي' : 'Remember Session'}</span>
             </label>
             <button type="button" className="text-xs font-black text-emerald-600 hover:text-emerald-800 transition-colors uppercase tracking-widest">{isRtl ? 'نسيت كلمة السر؟' : 'Recovery Access'}</button>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/20 text-xl tracking-tighter uppercase flex items-center justify-center gap-4"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{isRtl ? 'دخول النظام' : 'Enter System'}</span>
                <ArrowRight size={20} className={isRtl ? 'rotate-180' : ''} />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-10 pt-10 border-t border-slate-100 text-center">
           <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Institutional Identity Standard • Secured Connection</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
