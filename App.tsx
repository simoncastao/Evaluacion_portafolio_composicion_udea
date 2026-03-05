import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storageService';
import { User, UserRole, AppState, RubricCategory, Evaluation, EvaluationItem } from './types';
import { INITIAL_ADMIN_EMAIL, INITIAL_RUBRIC, RUBRIC_INTRO_TEXT, RUBRIC_GENERALITIES } from './constants';
import { 
  Users, 
  Settings, 
  FileText, 
  LogOut, 
  ChevronRight, 
  Layout, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Trash2,
  Save,
  BarChart3,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// --- Sub Components ---

const Header: React.FC<{ user: User | null; onLogout: () => void; activeTab: AppState; onNavigate: (tab: AppState) => void }> = ({ user, onLogout, activeTab, onNavigate }) => (
  <header className="border-b border-stone-900 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
    <div className="max-w-7xl mx-auto px-4 min-h-[4rem] py-2 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer max-w-[60%] md:max-w-none" onClick={() => user && onNavigate('DASHBOARD')}>
        <div className="w-6 h-6 bg-stone-900 shrink-0"></div>
        <h1 className="font-serif text-sm md:text-lg font-semibold tracking-wide text-stone-900 leading-tight">
          RÚBRICA PARA EVALUAR EL PORTAFOLIO DE GRADO DE COMPOSICIÓN MUSICAL DE LA UNIVERSIDAD DE ANTIOQUIA
        </h1>
      </div>
      
      {user && (
        <nav className="flex items-center gap-6 shrink-0">
          <button 
            onClick={() => onNavigate('DASHBOARD')}
            className={`hidden md:block text-sm tracking-widest hover:text-stone-500 transition-colors ${activeTab === 'DASHBOARD' ? 'underline underline-offset-4 decoration-1' : ''}`}
          >
            INICIO
          </button>
          
          {user.role === UserRole.ADMIN && (
            <button 
              onClick={() => onNavigate('ADMIN_PANEL')}
              className={`hidden md:block text-sm tracking-widest hover:text-stone-500 transition-colors ${activeTab === 'ADMIN_PANEL' ? 'underline underline-offset-4 decoration-1' : ''}`}
            >
              ADMINISTRACIÓN
            </button>
          )}

          <div className="flex items-center gap-4 pl-6 border-l border-stone-200">
            <span className="text-xs text-stone-500 font-mono hidden lg:inline-block">{user.email}</span>
            <button 
              onClick={onLogout}
              className="p-2 hover:bg-stone-100 transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </nav>
      )}
    </div>
  </header>
);

const LoginView: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    const users = StorageService.getUsers();
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser && foundUser.password === password) {
      onLogin(foundUser);
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-md p-8 bg-white border border-stone-200 shadow-xl">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-stone-900 mx-auto mb-4 flex items-center justify-center text-white">
            <Lock size={20} />
          </div>
          <h2 className="font-serif text-3xl text-stone-900">Acceso</h2>
          <p className="text-stone-500 mt-2 font-light text-sm">
            Ingrese sus credenciales para continuar.
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-stone-300 focus:border-stone-900 focus:ring-0 transition-colors font-mono text-sm bg-stone-50"
              placeholder="usuario@ejemplo.com"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-stone-300 focus:border-stone-900 focus:ring-0 transition-colors font-mono text-sm bg-stone-50"
              placeholder="••••••••"
            />
          </div>
          
          {error && <div className="text-red-600 text-xs flex items-center gap-2"><AlertCircle size={12} />{error}</div>}

          <button type="submit" className="w-full bg-stone-900 text-white py-3 px-4 hover:bg-stone-800 transition-colors uppercase tracking-widest text-xs font-semibold flex justify-center items-center gap-2">
            Ingresar <ArrowRight size={14} />
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-400">
            ¿Olvidó su contraseña? Contacte al administrador.
          </p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ user: User; onNavigate: (tab: AppState) => void }> = ({ user, onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="font-serif text-4xl mb-2">Bienvenido, {user.name || 'Usuario'}.</h2>
      <p className="text-stone-500 font-light text-lg mb-12">Seleccione una acción para continuar.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button 
          onClick={() => onNavigate('EVALUATE')}
          className="group p-8 border border-stone-200 hover:border-stone-900 transition-all text-left bg-white hover:shadow-lg"
        >
          <div className="mb-4 text-stone-900 group-hover:scale-110 transition-transform origin-left">
            <FileText size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-xl mb-2">Nueva Evaluación</h3>
          <p className="text-stone-500 text-sm font-light">Evaluar un portafolio de grado utilizando la rúbrica vigente.</p>
        </button>

        <button 
          onClick={() => onNavigate('RESULTS')}
          className="group p-8 border border-stone-200 hover:border-stone-900 transition-all text-left bg-white hover:shadow-lg"
        >
          <div className="mb-4 text-stone-900 group-hover:scale-110 transition-transform origin-left">
            <BarChart3 size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-xl mb-2">Ver Resultados</h3>
          <p className="text-stone-500 text-sm font-light">Consultar evaluaciones previas realizadas por usted.</p>
        </button>

        {user.role === UserRole.ADMIN && (
          <button 
            onClick={() => onNavigate('ADMIN_PANEL')}
            className="group p-8 border border-stone-200 hover:border-stone-900 transition-all text-left bg-white hover:shadow-lg"
          >
            <div className="mb-4 text-stone-900 group-hover:scale-110 transition-transform origin-left">
              <Settings size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl mb-2">Configuración Admin</h3>
            <p className="text-stone-500 text-sm font-light">Gestionar usuarios, contraseñas y rúbrica.</p>
          </button>
        )}
      </div>
    </div>
  );
};

const AdminPanel: React.FC<{ rubric: RubricCategory[]; onSaveRubric: (r: RubricCategory[]) => void }> = ({ rubric, onSaveRubric }) => {
  const [users, setUsers] = useState<User[]>(StorageService.getUsers());
  const [localRubric, setLocalRubric] = useState<RubricCategory[]>(rubric);
  
  // New User State
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>(UserRole.EVALUATOR);
  
  const [activeTab, setActiveTab] = useState<'USERS' | 'RUBRIC'>('USERS');

  const handleAddUser = () => {
    if (!newUserEmail || !newUserPassword) {
      alert("Ingrese correo y contraseña");
      return;
    }
    if (users.find(u => u.email === newUserEmail)) {
      alert("El usuario ya existe");
      return;
    }
    
    const newUsers = [...users, { 
      email: newUserEmail, 
      role: newUserRole, 
      name: 'Nuevo Usuario',
      password: newUserPassword
    }];
    setUsers(newUsers);
    StorageService.saveUsers(newUsers);
    setNewUserEmail('');
    setNewUserPassword('');
  };

  const handleRemoveUser = (email: string) => {
    if (email === INITIAL_ADMIN_EMAIL) return; // Protect super admin
    const newUsers = users.filter(u => u.email !== email);
    setUsers(newUsers);
    StorageService.saveUsers(newUsers);
  };

  const handleUpdateWeight = (catId: string, itemId: string, field: 'min' | 'max', value: number) => {
    const newRubric = localRubric.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => {
          if (item.id !== itemId) return item;
          return {
            ...item,
            [field === 'min' ? 'minWeightConfig' : 'maxWeightConfig']: value
          };
        })
      };
    });
    setLocalRubric(newRubric);
  };

  const saveRubricChanges = () => {
    onSaveRubric(localRubric);
    alert('Configuración guardada correctamente.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="font-serif text-3xl mb-8 border-b border-stone-200 pb-4">Panel de Administración</h2>
      
      <div className="flex gap-8 mb-8">
        <button 
          onClick={() => setActiveTab('USERS')}
          className={`pb-2 text-sm tracking-widest uppercase ${activeTab === 'USERS' ? 'border-b-2 border-stone-900' : 'text-stone-400'}`}
        >
          Usuarios y Contraseñas
        </button>
        <button 
          onClick={() => setActiveTab('RUBRIC')}
          className={`pb-2 text-sm tracking-widest uppercase ${activeTab === 'RUBRIC' ? 'border-b-2 border-stone-900' : 'text-stone-400'}`}
        >
          Rúbrica y Pesos
        </button>
      </div>

      {activeTab === 'USERS' && (
        <div className="bg-white border border-stone-200 p-6">
          <div className="mb-8 p-6 bg-stone-50 border border-stone-100">
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-widest">Agregar Nuevo Usuario</h4>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-xs text-stone-500 mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="usuario@udea.edu.co"
                  className="w-full p-2 border border-stone-300 font-mono text-sm"
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-xs text-stone-500 mb-1">Asignar Contraseña</label>
                <input 
                  type="text" 
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Ej: udea2024"
                  className="w-full p-2 border border-stone-300 font-mono text-sm"
                />
              </div>
              <div className="w-full md:w-48">
                 <label className="block text-xs text-stone-500 mb-1">Rol</label>
                 <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full p-2 border border-stone-300 font-mono text-sm bg-white h-[38px]"
                >
                  <option value={UserRole.EVALUATOR}>Evaluador</option>
                  <option value={UserRole.ADMIN}>Administrador</option>
                </select>
              </div>
              <button onClick={handleAddUser} className="w-full md:w-auto bg-stone-900 text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-stone-700 h-[38px]">
                Agregar
              </button>
            </div>
            <p className="mt-2 text-xs text-stone-400 italic">
              * Usted debe enviar manualmente estas credenciales al usuario.
            </p>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500">
                <th className="py-3">Email</th>
                <th className="py-3">Contraseña Asignada</th>
                <th className="py-3">Rol</th>
                <th className="py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.email} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="py-4 font-mono text-sm">{u.email}</td>
                  <td className="py-4 font-mono text-sm text-stone-500">
                    <span className="bg-stone-100 px-2 py-1 rounded border border-stone-200">
                      {u.password}
                    </span>
                  </td>
                  <td className="py-4 text-sm">
                    <span className={`px-2 py-1 text-xs ${u.role === UserRole.ADMIN ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 text-right flex justify-end gap-2">
                    {u.email !== INITIAL_ADMIN_EMAIL && (
                      <button title="Eliminar" onClick={() => handleRemoveUser(u.email)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'RUBRIC' && (
        <div className="space-y-8">
          <div className="flex justify-end sticky top-20 z-10">
            <button 
              onClick={saveRubricChanges}
              className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 shadow-xl hover:bg-stone-800 transition-all text-sm uppercase tracking-widest"
            >
              <Save size={16} /> Guardar Cambios
            </button>
          </div>

          {localRubric.map(cat => (
            <div key={cat.id} className="bg-white border border-stone-200 p-6">
              <h3 className="font-serif text-xl mb-4">{cat.title}</h3>
              <p className="text-sm text-stone-500 mb-6 italic">{cat.description}</p>
              <div className="space-y-4">
                {cat.items.map(item => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-stone-50 border border-stone-100 items-start">
                    <div className="md:col-span-2">
                      <p className="font-medium text-sm mb-1">{item.title}</p>
                      {item.description && (
                         <p className="text-xs text-stone-500 mt-2 font-light">{item.description}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Mínimo %</label>
                        <input 
                          type="number" 
                          value={item.minWeightConfig}
                          onChange={(e) => handleUpdateWeight(cat.id, item.id, 'min', parseInt(e.target.value))}
                          className="w-full p-2 border border-stone-300 text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">Máximo %</label>
                        <input 
                          type="number" 
                          value={item.maxWeightConfig}
                          onChange={(e) => handleUpdateWeight(cat.id, item.id, 'max', parseInt(e.target.value))}
                          className="w-full p-2 border border-stone-300 text-sm font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EvaluationForm: React.FC<{ rubric: RubricCategory[]; user: User; onCancel: () => void }> = ({ rubric, user, onCancel }) => {
  const [studentName, setStudentName] = useState('');
  const [evaluations, setEvaluations] = useState<Record<string, { score: number; weight: number; comment: string }>>({});
  const [showIntro, setShowIntro] = useState(false);

  // Initialize default weights (min value)
  useEffect(() => {
    const init: Record<string, any> = {};
    rubric.forEach(cat => {
      cat.items.forEach(item => {
        init[item.id] = { score: 0, weight: item.minWeightConfig, comment: '' };
      });
    });
    setEvaluations(init);
  }, [rubric]);

  const updateEval = (itemId: string, field: string, value: any) => {
    setEvaluations(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
  };

  const calculateTotalWeight = () => {
    return Object.values(evaluations).reduce((sum: number, item: any) => sum + (item.weight || 0), 0);
  };

  const totalWeight = calculateTotalWeight();
  const isValidTotal = Math.abs(totalWeight - 100) < 0.1;

  const handleSave = () => {
    if (!studentName) {
      alert('Por favor ingrese el nombre del estudiante');
      return;
    }
    if (!isValidTotal) {
      alert(`La ponderación total debe ser 100%. Actual: ${totalWeight.toFixed(1)}%`);
      return;
    }

    // Calculate final weighted score (0-5 scale)
    let totalScore = 0;
    Object.keys(evaluations).forEach(key => {
        const item = evaluations[key];
        totalScore += (item.score * item.weight) / 100;
    });

    const newEvaluation: Evaluation = {
      id: Date.now().toString(),
      studentName,
      evaluatorEmail: user.email,
      date: new Date().toISOString(),
      items: evaluations,
      finalScore: totalScore,
      totalWeight
    };

    StorageService.saveEvaluation(newEvaluation);
    alert('Evaluación guardada exitosamente');
    onCancel();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-32">
      <div className="flex justify-between items-center mb-4 border-b border-stone-900 pb-4">
        <h2 className="font-serif text-3xl">Nueva Evaluación</h2>
      </div>

      <div className="bg-stone-50 border border-stone-200 p-4 mb-8">
         <button onClick={() => setShowIntro(!showIntro)} className="flex items-center gap-2 w-full text-left text-sm font-semibold tracking-widest uppercase text-stone-600 hover:text-stone-900">
           {showIntro ? <ChevronUp size={16} /> : <ChevronDown size={16} />} 
           Generalidades y Guía de la Rúbrica
         </button>
         {showIntro && (
           <div className="mt-4 text-sm text-stone-600 whitespace-pre-line font-light leading-relaxed border-t border-stone-200 pt-4">
             {RUBRIC_INTRO_TEXT}
           </div>
         )}
      </div>

      <div className="mb-8">
        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Nombre del Estudiante</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full text-xl p-3 border-b-2 border-stone-200 focus:border-stone-900 focus:outline-none transition-colors font-serif bg-transparent"
          placeholder="Nombre Completo"
        />
      </div>

      <div className="space-y-12">
        {rubric.map(cat => (
          <div key={cat.id}>
            
            {/* Generalidades insertadas antes del header sticky de la categoría 1 */}
            {cat.id === "1" && (
                <div className="mb-8 p-6 bg-stone-100 border-l-4 border-stone-900 text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                    <h4 className="font-serif text-lg font-bold mb-4 text-stone-900">Generalidades de la rúbrica</h4>
                    {RUBRIC_GENERALITIES}
                </div>
            )}

            <div className="sticky top-16 bg-white/95 backdrop-blur z-20 py-4 border-b border-stone-100 mb-6 shadow-sm">
              <h3 className="font-serif text-2xl text-stone-900">{cat.title}</h3>
              <p className="text-stone-500 text-sm font-light mt-1">{cat.description}</p>
            </div>

            <div className="space-y-12 pl-0 md:pl-4">
              {cat.items.map(item => {
                const currentEval = evaluations[item.id] || { score: 0, weight: item.minWeightConfig, comment: '' };

                return (
                  <div key={item.id} className="relative group bg-white">
                    <div className="mb-4">
                      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                        <h4 className="font-medium text-lg leading-tight flex-1">{item.title}</h4>
                        <div className="w-full md:w-64 p-4 bg-stone-50 border border-stone-200 rounded-sm">
                           <div className="flex justify-between items-center mb-2">
                             <label className="text-xs text-stone-500 uppercase tracking-wider">
                               Ponderación
                             </label>
                             <span className="font-mono text-xl text-stone-900 font-bold bg-white px-2 py-1 border border-stone-200 rounded">
                               {currentEval.weight}%
                             </span>
                           </div>
                           <input 
                              type="range"
                              min={item.minWeightConfig}
                              max={item.maxWeightConfig}
                              step={1}
                              value={currentEval.weight}
                              onChange={(e) => updateEval(item.id, 'weight', parseInt(e.target.value))}
                              className="w-full h-1 bg-stone-200 rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-stone-900"
                           />
                           <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                              <span>{item.minWeightConfig}%</span>
                              <span>{item.maxWeightConfig}%</span>
                           </div>
                        </div>
                      </div>
                      
                      {item.description && (
                        <div className="bg-blue-50/50 p-4 border-l-2 border-blue-200 text-sm text-stone-600 mb-6 italic">
                          <span className="font-semibold text-blue-800 not-italic text-xs uppercase tracking-widest block mb-1">Aclaración de alcance</span>
                          {item.description}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                       {item.levels.map(level => (
                         <div 
                           key={level.score}
                           onClick={() => updateEval(item.id, 'score', level.score)}
                           className={`p-4 cursor-pointer border transition-all duration-200 flex gap-4 ${
                             currentEval.score === level.score 
                               ? 'border-stone-900 bg-stone-900 text-white shadow-md' 
                               : 'border-stone-100 hover:border-stone-300 hover:bg-stone-50 text-stone-500'
                           }`}
                         >
                           <div className={`text-lg font-mono font-bold shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                             currentEval.score === level.score ? 'bg-white text-stone-900' : 'bg-stone-100 text-stone-400'
                           }`}>
                             {level.score}
                           </div>
                           <div className="text-sm leading-relaxed">
                             {level.description}
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 p-4 z-50 flex items-center justify-end gap-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        
        {/* Indicador de Porcentaje - a la izquierda del botón de guardar */}
        <div className="flex flex-col items-end">
            <div className={`text-2xl font-mono font-bold flex items-center gap-2 ${isValidTotal ? 'text-green-700' : 'text-red-700'}`}>
              {isValidTotal ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
              Porcentaje Total: {totalWeight.toFixed(0)}%
            </div>
            {!isValidTotal && (
              <span className="text-[10px] text-red-600 font-bold uppercase tracking-widest mt-1">
                DEBE COMPLETAR EL 100% PARA GUARDAR
              </span>
            )}
        </div>

        {/* Botón Guardar - a la izquierda del botón cancelar */}
        <button 
            onClick={handleSave}
            className={`px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors flex items-center gap-2 shadow-lg ${isValidTotal ? 'bg-stone-900 hover:bg-stone-800' : 'bg-stone-300 cursor-not-allowed'}`}
            disabled={!isValidTotal}
            >
            <Save size={18} />
            Guardar Evaluación
        </button>
        
        {/* Botón Cancelar - a la derecha */}
        <button onClick={onCancel} className="px-6 py-3 text-sm uppercase tracking-widest hover:text-red-600 transition-colors border border-stone-200 hover:border-red-200 bg-stone-50">
            Cancelar
        </button>
      </div>
    </div>
  );
};

const ResultsView: React.FC<{ user: User }> = ({ user }) => {
  const [evals, setEvals] = useState<Evaluation[]>([]);

  useEffect(() => {
    const all = StorageService.getEvaluations();
    if (user.role === UserRole.ADMIN) {
      setEvals(all);
    } else {
      setEvals(all.filter(e => e.evaluatorEmail === user.email));
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="font-serif text-3xl mb-8 border-b border-stone-200 pb-4">Resultados de Evaluaciones</h2>
      
      {evals.length === 0 ? (
        <p className="text-stone-500 font-light">No hay evaluaciones registradas aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evals.map(ev => (
            <div key={ev.id} className="bg-white border border-stone-200 p-6 hover:shadow-lg transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-serif text-xl font-medium">{ev.studentName}</h3>
                  <p className="text-xs text-stone-400 font-mono mt-1">{new Date(ev.date).toLocaleDateString()}</p>
                </div>
                <div className="bg-stone-900 text-white px-3 py-1 font-mono text-lg">
                  {ev.finalScore.toFixed(2)}
                </div>
              </div>
              <div className="text-sm text-stone-500 mb-4">
                Evaluador: <span className="text-stone-900">{ev.evaluatorEmail}</span>
              </div>
              
              <div className="border-t border-stone-100 pt-4 mt-4">
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Desglose rápido</p>
                <div className="h-24 overflow-y-auto text-xs space-y-1 scrollbar-thin">
                  {Object.entries(ev.items).map(([itemId, val]: [string, any]) => (
                    <div key={itemId} className="flex justify-between">
                      <span className="truncate w-32">{itemId}</span>
                      <span className="font-mono">{val.score}/5 ({val.weight}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main App Logic ---

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppState>('LOGIN');
  const [rubric, setRubric] = useState<RubricCategory[]>(INITIAL_RUBRIC);

  useEffect(() => {
    // Load initial data
    const storedUser = StorageService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      setActiveTab('DASHBOARD');
    }
    setRubric(StorageService.getRubric());
  }, []);

  const handleLogin = (user: User) => {
      setUser(user);
      StorageService.setCurrentUser(user);
      setActiveTab('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    StorageService.setCurrentUser(null);
    setActiveTab('LOGIN');
  };

  const handleUpdateRubric = (newRubric: RubricCategory[]) => {
    setRubric(newRubric);
    StorageService.saveRubric(newRubric);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        user={user} 
        onLogout={handleLogout} 
        activeTab={activeTab} 
        onNavigate={setActiveTab} 
      />
      
      <main>
        {!user && <LoginView onLogin={handleLogin} />}
        
        {user && activeTab === 'DASHBOARD' && (
          <Dashboard user={user} onNavigate={setActiveTab} />
        )}

        {user && activeTab === 'ADMIN_PANEL' && user.role === UserRole.ADMIN && (
          <AdminPanel rubric={rubric} onSaveRubric={handleUpdateRubric} />
        )}

        {user && activeTab === 'EVALUATE' && (
          <EvaluationForm 
            rubric={rubric} 
            user={user} 
            onCancel={() => setActiveTab('DASHBOARD')} 
          />
        )}

        {user && activeTab === 'RESULTS' && (
          <ResultsView user={user} />
        )}
      </main>
      
      {user && (
         <footer className="border-t border-stone-100 py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center text-stone-400 text-xs font-mono">
               <p>RÚBRICA DE COMPOSICIÓN - UDEA</p>
               <p className="mt-2 opacity-50">Designed with Quanta Aesthetics</p>
            </div>
         </footer>
      )}
    </div>
  );
}

export default App;