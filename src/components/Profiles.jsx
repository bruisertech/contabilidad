import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { pieData } from '../data/mockData';
import { Users, User, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

// Tilt Card Component
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`glass-card p-8 flex flex-col items-center text-center cursor-pointer relative overflow-hidden group ${className}`}
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="w-full"
      >
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

// SVG Flow Diagram for Enterprise
const FlowDiagram = () => (
  <svg viewBox="0 0 200 100" className="w-full h-32 my-6">
    <motion.rect x="10" y="30" width="40" height="40" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="2" />
    <text x="30" y="55" fill="#64748B" fontSize="10" textAnchor="middle">ERP</text>

    <motion.path
      d="M50 50 L90 50"
      stroke="#00E5FF"
      strokeWidth="2"
      strokeDasharray="4 4"
      initial={{ strokeDashoffset: 100 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />

    <motion.circle
      cx="110" cy="50" r="20"
      fill="#0B0F19" stroke="#00E5FF" strokeWidth="2"
      animate={{ boxShadow: ["0 0 0px #00E5FF", "0 0 15px #00E5FF", "0 0 0px #00E5FF"] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <text x="110" y="54" fill="#00E5FF" fontSize="12" textAnchor="middle" className="font-bold">IA</text>

    <motion.path
      d="M130 50 L160 50"
      stroke="#D4AF37"
      strokeWidth="2"
    />
    <motion.circle
      cx="160" cy="50" r="3" fill="#D4AF37"
      animate={{ cx: [130, 160] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />

    <motion.rect x="160" y="30" width="30" height="40" rx="4" fill="#1E293B" stroke="#D4AF37" strokeWidth="2" />
    <text x="175" y="55" fill="#D4AF37" fontSize="10" textAnchor="middle">110</text>
  </svg>
);


export default function Profiles() {
  return (
    <section className="py-24 relative overflow-hidden bg-obsidian-900/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Soluciones a tu Medida
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Elige tu perfil y descubre cómo nuestro motor transforma tu operatividad tributaria.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-1000">

          {/* Contador / Firma */}
          <TiltCard className="hover:border-cyan-500/30">
            <div className="w-16 h-16 bg-obsidian-900 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-cyan-500/20 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <Users className="text-cyan-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">Contador / Firma</h3>
            <p className="text-sm text-slate-400 mb-6">Gestiona múltiples clientes con un panel centralizado de descargas masivas DIAN.</p>

            <div className="h-40 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#151C2C', borderColor: '#334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#F8FAFC' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-500"/> Marca blanca disponible</li>
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-500"/> Descarga masiva de XMLs</li>
            </ul>
            <button className="w-full py-3 bg-obsidian-900 border border-slate-700 hover:border-cyan-500 text-slate-200 rounded-lg transition-colors flex justify-center items-center gap-2 group">
              Explorar plan <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </TiltCard>

          {/* Persona Natural */}
          <TiltCard className="hover:border-gold-500/30">
            <div className="w-16 h-16 bg-obsidian-900 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-gold-500/20 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <User className="text-gold-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">Persona Natural</h3>
            <p className="text-sm text-slate-400 mb-6">Flujo guiado e intuitivo. Liquidación lista en menos de 12 horas garantizadas.</p>

            <div className="w-full bg-obsidian-900 p-4 rounded-xl border border-slate-700 mb-6">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Progreso de liquidación</span>
                <span className="text-gold-400 font-bold">85%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-gold-600 to-gold-400"
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-slate-300">Tiempo restante: <span className="text-white">01:45:20</span></span>
              </div>
            </div>

            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-gold-500"/> Sin lenguaje técnico</li>
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-gold-500"/> Revisión por experto</li>
            </ul>
            <button className="w-full py-3 bg-obsidian-900 border border-slate-700 hover:border-gold-500 text-slate-200 rounded-lg transition-colors flex justify-center items-center gap-2 group">
              Comenzar ahora <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </TiltCard>

          {/* Empresa */}
          <TiltCard className="hover:border-cyan-500/30">
            <div className="w-16 h-16 bg-obsidian-900 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-cyan-500/20 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <Building2 className="text-cyan-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">Empresa (Jurídica)</h3>
            <p className="text-sm text-slate-400 mb-6">Integración de balances y conciliación automática del Formulario 110.</p>

            <FlowDiagram />

            <ul className="text-left w-full space-y-2 mb-6 mt-4">
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-500"/> Integración contable (API/Excel)</li>
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-cyan-500"/> Anexos generados por IA</li>
            </ul>
            <button className="w-full py-3 bg-obsidian-900 border border-slate-700 hover:border-cyan-500 text-slate-200 rounded-lg transition-colors flex justify-center items-center gap-2 group">
              Ver integración <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
