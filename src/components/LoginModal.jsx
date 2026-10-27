import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  User, 
  KeyRound, 
  Lock, 
  Sparkles, 
  AlertCircle,
  Car,
  CheckCircle2
} from 'lucide-react';
import { login, loginQuick } from '../services/auth';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState('admin'); // 'admin' | 'user'
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setError(null);
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin');
    } else {
      setUsername('usuario');
      setPassword('usuario');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      } else {
        setError(res.error);
      }
    }, 250);
  };

  const handleQuickLogin = (role) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = loginQuick(role);
      setIsLoading(false);
      onLoginSuccess(user);
      onClose();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#13141c] rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-all duration-300 transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center shadow-md">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-black text-zinc-950 dark:text-white leading-tight">
                Acceso al Sistema
              </h3>
              <p className="text-xs text-zinc-500 font-sans font-medium">
                Control de roles y permisos AURA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Selection Tabs */}
        <div className="p-6 pb-2">
          <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-display text-xs font-bold transition-all ${
                selectedRole === 'admin'
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-[1.02]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Administrador</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('user')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-display text-xs font-bold transition-all ${
                selectedRole === 'user'
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-[1.02]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              <Car className="w-4 h-4 text-blue-400" />
              <span>Conductor (Normal)</span>
            </button>
          </div>

          {/* Role Description Card */}
          <div className={`mt-4 p-3.5 rounded-2xl border text-xs font-sans ${
            selectedRole === 'admin'
              ? 'bg-purple-50/60 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/60 text-purple-950 dark:text-purple-200'
              : 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60 text-blue-950 dark:text-blue-200'
          }`}>
            {selectedRole === 'admin' ? (
              <div className="space-y-1">
                <p className="font-bold font-display uppercase tracking-wider text-[11px] text-purple-700 dark:text-purple-400">
                  PERMISOS DE ADMINISTRADOR:
                </p>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Acceso completo al panel <strong>CRUD de datos</strong>, <strong>Dashboard & Métricas</strong>, control de barreras y liberación de cajones.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="font-bold font-display uppercase tracking-wider text-[11px] text-blue-700 dark:text-blue-400">
                  PERMISOS DE USUARIO NORMAL:
                </p>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Acceso a <strong>Estacionamiento 3D</strong> para ver cupos libres/ocupados y terminal para <strong>Reservar Plazas</strong> con pase digital QR.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400">
              USUARIO O CORREO
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ej: admin o usuario"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-sans focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400">
              CONTRASEÑA
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-sans focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors"
              />
            </div>
            <div className="text-[11px] text-zinc-400 font-mono flex items-center justify-between pt-0.5">
              <span>Demo Admin: <strong className="text-zinc-700 dark:text-zinc-300">admin / admin</strong></span>
              <span>Demo Conductor: <strong className="text-zinc-700 dark:text-zinc-300">usuario / usuario</strong></span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Ingresar como {selectedRole === 'admin' ? 'Administrador' : 'Conductor'}</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login (Special for Live Defense in Auditorio) */}
        <div className="px-6 pb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
          <div className="flex items-center gap-2 mb-2.5 text-[11px] font-mono font-bold text-zinc-500 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Acceso Rápido para Demostración</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('user')}
              className="py-2 px-3 rounded-xl border-2 border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/80 font-display text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-1.5"
            >
              <Car className="w-3.5 h-3.5 text-blue-500" />
              <span>Conductor Demo</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-2 px-3 rounded-xl border-2 border-purple-200 dark:border-purple-900/60 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900/80 font-display text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
