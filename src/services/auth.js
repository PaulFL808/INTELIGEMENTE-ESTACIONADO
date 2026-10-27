// Servicio de Autenticación y Control de Acceso Basado en Roles (RBAC)
// Para AURA Smart Parking - Desafío Santo Tomás

const STORAGE_KEY = 'aura_auth_session';

// Cuentas predefinidas del sistema
export const USERS = [
  {
    username: 'admin',
    email: 'admin@aura.cl',
    password: 'admin',
    name: 'Paul / Fabián / Agustín',
    role: 'admin',
    roleLabel: 'Administrador del Sistema',
    avatar: '🛡️',
  },
  {
    username: 'usuario',
    email: 'conductor@aura.cl',
    password: 'usuario',
    name: 'Conductor Particular',
    role: 'user',
    roleLabel: 'Usuario Normal / Conductor',
    avatar: '🚗',
  }
];

// Obtener usuario actualmente autenticado desde localStorage
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error al leer sesión de usuario:', err);
  }
  // Por defecto, se inicia con perfil de Usuario Normal (Conductor) para visualización y reserva inmediata
  const defaultUser = {
    username: 'conductor',
    email: 'conductor@aura.cl',
    name: 'Conductor Invitado',
    role: 'user',
    roleLabel: 'Usuario Normal (Conductor)',
    avatar: '🚗',
    isGuest: true
  };
  return defaultUser;
}

// Iniciar sesión con credenciales
export function login(usernameOrEmail, password) {
  const cleanInput = (usernameOrEmail || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // Buscar coincidencia en usuarios predefinidos
  const user = USERS.find(u => 
    (u.username.toLowerCase() === cleanInput || u.email.toLowerCase() === cleanInput) &&
    u.password === cleanPass
  );

  if (user) {
    const session = {
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      roleLabel: user.roleLabel,
      avatar: user.avatar,
      isGuest: false,
      loggedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return { success: true, user: session };
  }

  // Permitir también cualquier usuario normal registrado con clave demo
  if (cleanInput.length >= 3 && cleanPass.length >= 3 && cleanInput !== 'admin') {
    const session = {
      username: cleanInput,
      email: `${cleanInput}@cliente.cl`,
      name: cleanInput.charAt(0).toUpperCase() + cleanInput.slice(1),
      role: 'user',
      roleLabel: 'Usuario Normal / Conductor',
      avatar: '🚗',
      isGuest: false,
      loggedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return { success: true, user: session };
  }

  return { 
    success: false, 
    error: 'Credenciales inválidas. Usa "admin" / "admin" para modo Administrador o "usuario" / "usuario" para Conductor.' 
  };
}

// Iniciar sesión rápido (Modo Demostración en vivo ante la comisión evaluadora)
export function loginQuick(role = 'admin') {
  const target = USERS.find(u => u.role === role) || USERS[0];
  const session = {
    username: target.username,
    email: target.email,
    name: target.name,
    role: target.role,
    roleLabel: target.roleLabel,
    avatar: target.avatar,
    isGuest: false,
    loggedAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

// Cerrar sesión (revierte a Usuario Normal Invitado)
export function logout() {
  const guestUser = {
    username: 'conductor',
    email: 'conductor@aura.cl',
    name: 'Conductor Invitado',
    role: 'user',
    roleLabel: 'Usuario Normal (Conductor)',
    avatar: '🚗',
    isGuest: true
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(guestUser));
  return guestUser;
}
