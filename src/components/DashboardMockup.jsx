import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, TrendingDown, ShieldCheck } from 'lucide-react';
import { chartData, kpiData } from '../data/mockData';

const KPICard = ({ icon: Icon, title, value, subtext, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className="glass-card p-6 flex flex-col relative overflow-hidden group hover:border-cyan-500/50 transition-colors"
  >
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-obsidian-900 rounded-lg border border-slate-700">
        <Icon className="text-cyan-400" size={24} />
      </div>
      <h3 className="text-slate-400 font-medium">{title}</h3>
    </div>
    <div className="text-4xl font-bold text-slate-100 mb-1">{value}</div>
    <div className="text-sm text-gold-400">{subtext}</div>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 border-cyan-500/30">
        <p className="text-slate-300 mb-2 font-medium">{`Mes: ${label}`}</p>
        <p className="text-sm text-slate-400 mb-1">
          Tradicional: <span className="text-slate-200 font-bold">{payload[0].value}h</span>
        </p>
        <p className="text-sm text-cyan-400">
          Optimizado (IA): <span className="font-bold">{payload[1].value}h</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardMockup() {
  return (
    <section id="dashboard-section" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Métricas de Alto Rendimiento
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Visualiza el impacto real de nuestro Motor Tributario automatizado en tus procesos contables.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <KPICard
            icon={Clock}
            title="Tiempo de liquidación"
            value={kpiData.tiempoLiquidacion}
            subtext="Promedio garantizado < 12h"
            delay={0.1}
          />
          <KPICard
            icon={TrendingDown}
            title="Ahorro en impuestos"
            value={kpiData.ahorroPromedio}
            subtext="Optimización basada en ley"
            delay={0.2}
          />
          <KPICard
            icon={ShieldCheck}
            title="Errores detectados"
            value={kpiData.erroresDetectados}
            subtext="Precisión del 100% en cálculos"
            delay={0.3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Eficiencia en Tiempo Operativo</h3>
              <p className="text-sm text-slate-400">Comparativa horas invertidas: Método tradicional vs Motor IA</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                <span className="text-xs text-slate-400">Tradicional</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]"></div>
                <span className="text-xs text-cyan-400">Optimizado por IA</span>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTradicional" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="tradicional"
                  stroke="#475569"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTradicional)"
                />
                <Area
                  type="monotone"
                  dataKey="ai"
                  stroke="#00E5FF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAI)"
                  activeDot={{ r: 8, fill: '#00E5FF', stroke: '#0B0F19', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
