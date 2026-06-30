import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, UploadCloud, FileText, CheckCircle2, ShieldCheck, User, Building2, Users } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const profiles = [
  { id: 'natural', label: 'Persona Natural', icon: User, color: 'gold' },
  { id: 'empresa', label: 'Empresa', icon: Building2, color: 'cyan' },
  { id: 'contador', label: 'Contador', icon: Users, color: 'slate' }
];

export default function Simulator() {
  const [activeProfile, setActiveProfile] = useState('natural');
  const [incomes, setIncomes] = useState([{ id: 1, description: 'Salario', amount: 5000000 }]);
  const [investments, setInvestments] = useState(2000000);
  const [bankAccounts, setBankAccounts] = useState(15000000);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const addIncome = () => {
    setIncomes([...incomes, { id: Date.now(), description: 'Nuevo ingreso', amount: 0 }]);
  };

  const removeIncome = (id) => {
    if (incomes.length > 1) {
      setIncomes(incomes.filter(inc => inc.id !== id));
    }
  };

  const updateIncome = (id, field, value) => {
    setIncomes(incomes.map(inc =>
      inc.id === id ? { ...inc, [field]: value } : inc
    ));
  };

  // Mock file upload
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Visual simulation of adding a file
    setUploadedFiles([...uploadedFiles, { name: `factura_dian_${Date.now().toString().slice(-4)}.xml`, size: '24 KB' }]);
  };

  const totalIncomes = incomes.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const chartData = useMemo(() => {
    return [
      { name: 'Ingresos Totales', value: totalIncomes, color: activeProfile === 'natural' ? '#D4AF37' : '#00E5FF' },
      { name: 'Inversiones', value: Number(investments) || 0, color: '#33EFFF' },
      { name: 'Dinero en Cuentas', value: Number(bankAccounts) || 0, color: '#1E293B' },
    ].filter(item => item.value > 0);
  }, [totalIncomes, investments, bankAccounts, activeProfile]);

  const profileTheme = activeProfile === 'natural' ? 'gold' : 'cyan';

  return (
    <section id="simulator-section" className="py-24 relative bg-obsidian-900 border-t border-slate-800/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-obsidian-900 to-obsidian-900 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={`inline-block mb-4 px-4 py-1.5 rounded-full border border-${profileTheme}-500/30 bg-${profileTheme}-500/10 backdrop-blur-md`}>
              <span className={`text-${profileTheme}-400 text-sm font-semibold tracking-wider uppercase`}>
                Simulador Tributario Avanzado
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Proyecta tu Escenario Financiero
            </h2>
            <p className="text-slate-400 text-lg">
              Ingresa tus datos de forma dinámica. Nuestra IA estructurará tus saldos en tiempo real para optimizar tu declaración.
            </p>
          </motion.div>
        </div>

        {/* Profile Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            const isActive = activeProfile === profile.id;
            return (
              <button
                key={profile.id}
                onClick={() => setActiveProfile(profile.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 border ${
                  isActive
                    ? `bg-obsidian-800 border-${profile.color}-500 text-white ${profile.color === 'gold' ? 'shadow-[0_0_20px_rgba(212,175,55,0.2)]' : profile.color === 'cyan' ? 'shadow-[0_0_20px_rgba(0,229,255,0.2)]' : 'shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`
                    : 'bg-obsidian-900 border-slate-700/50 text-slate-400 hover:bg-obsidian-800 hover:border-slate-600'
                }`}
              >
                <Icon size={20} className={isActive ? `text-${profile.color}-400` : ''} />
                {profile.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">

          {/* Left Column: Forms & Upload */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Dynamic Incomes */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className={`w-2 h-6 bg-${profileTheme}-500 rounded-full`}></span>
                  Fuentes de Ingreso
                </h3>
              </div>

              <AnimatePresence>
                {incomes.map((inc) => (
                  <motion.div
                    key={inc.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col sm:flex-row gap-4 mb-4 items-end"
                  >
                    <div className="flex-1 w-full">
                      <label className="block text-xs font-medium text-slate-400 mb-1">Concepto</label>
                      <input
                        type="text"
                        value={inc.description}
                        onChange={(e) => updateIncome(inc.id, 'description', e.target.value)}
                        className="w-full bg-obsidian-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Ej. Salario, Honorarios..."
                      />
                    </div>
                    <div className="flex-1 w-full relative">
                      <label className="block text-xs font-medium text-slate-400 mb-1">Monto (COP)</label>
                      <span className="absolute left-3 top-9 text-slate-500">$</span>
                      <input
                        type="number"
                        value={inc.amount}
                        onChange={(e) => updateIncome(inc.id, 'amount', e.target.value)}
                        className="w-full bg-obsidian-900 border border-slate-700 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                      />
                    </div>
                    {incomes.length > 1 && (
                      <button
                        onClick={() => removeIncome(inc.id)}
                        className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors mb-0 sm:mb-0 h-[46px]"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                onClick={addIncome}
                className="mt-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
              >
                <Plus size={16} /> Añadir otro ingreso
              </button>
            </div>

            {/* Other Financial Info */}
            <div className="glass-card p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Inversiones Acumuladas</h3>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <input
                    type="number"
                    value={investments}
                    onChange={(e) => setInvestments(e.target.value)}
                    className="w-full bg-obsidian-900 border border-slate-700 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Saldos Bancarios</h3>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <input
                    type="number"
                    value={bankAccounts}
                    onChange={(e) => setBankAccounts(e.target.value)}
                    className="w-full bg-obsidian-900 border border-slate-700 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Drag & Drop Visual */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4">Facturación Electrónica</h3>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                  isDragging ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-700 bg-obsidian-900 hover:border-slate-500'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => handleDrop({ preventDefault: () => {} })}
              >
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400">
                  <UploadCloud size={32} />
                </div>
                <p className="text-white font-medium mb-1">Arrastra tus facturas XML/ZIP aquí</p>
                <p className="text-slate-400 text-sm">O haz clic para explorar tus archivos</p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={i}
                      className="flex items-center justify-between p-3 bg-obsidian-900 border border-slate-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-cyan-400" />
                        <span className="text-sm text-slate-300">{file.name}</span>
                      </div>
                      <span className="text-xs text-slate-500">{file.size}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Visualization & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-24 space-y-6"
          >
            <div className="glass-card p-8 flex flex-col items-center">
              <h3 className="text-xl font-bold text-white mb-2 text-center">Panorama Patrimonial IA</h3>
              <p className="text-slate-400 text-sm text-center mb-8">Análisis en tiempo real basado en tus ingresos.</p>

              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value) => `$${value.toLocaleString('es-CO')}`}
                      contentStyle={{ backgroundColor: '#151C2C', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#00E5FF', fontWeight: 'bold' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full bg-obsidian-900 border border-slate-700 rounded-xl p-4 mt-6 flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Patrimonio Bruto Estimado</p>
                  <p className="text-2xl font-mono font-bold text-white">
                    ${(totalIncomes + Number(investments) + Number(bankAccounts)).toLocaleString('es-CO')}
                  </p>
                </div>
                <ShieldCheck size={32} className={`text-${profileTheme}-400 opacity-50`} />
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full group relative px-8 py-5 bg-gradient-to-r from-obsidian-800 to-obsidian-900 border border-cyan-500/50 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors"></div>
              <div className="relative flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <CheckCircle2 size={24} className="text-cyan-400" />
                  Solicitar revisión de contador
                </div>
                <span className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase rounded-full">
                  Costo: 1 Token
                </span>
              </div>
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
