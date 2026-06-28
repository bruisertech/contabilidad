import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, CreditCard, Shield, Loader2 } from 'lucide-react';

const PricingCard = ({ title, price, tokens, description, features, highlighted, onBuy }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className={`relative glass-card p-8 flex flex-col h-full ${highlighted ? 'border-gold-500 shadow-[0_0_30px_rgba(212,175,55,0.15)] scale-105 z-10' : 'border-slate-700/50'}`}
  >
    {highlighted && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian-900 font-bold px-4 py-1 rounded-full text-sm">
        Recomendado
      </div>
    )}

    <div className="mb-8">
      <h3 className="text-xl text-slate-300 font-medium mb-2">{title}</h3>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold text-white">${price}</span>
        <span className="text-slate-400 text-sm">COP</span>
      </div>
      <p className={`text-sm font-semibold ${highlighted ? 'text-gold-400' : 'text-cyan-400'}`}>
        {tokens}
      </p>
      <p className="text-slate-400 text-sm mt-4">{description}</p>
    </div>

    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <Check size={18} className="text-cyan-400 shrink-0 mt-0.5" />
          <span className="text-slate-300 text-sm">{feature}</span>
        </li>
      ))}
    </ul>

    <button
      onClick={onBuy}
      className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
        highlighted
          ? 'bg-gold-500 hover:bg-gold-400 text-obsidian-900 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]'
          : 'bg-obsidian-900 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10'
      }`}
    >
      Comprar Tokens
    </button>
  </motion.div>
);

const CheckoutModal = ({ isOpen, onClose, selectedPlan }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-900/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-obsidian-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-8">
              {!isSuccess ? (
                <>
                  <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-white">Resumen de pago</h2>
                      <p className="text-sm text-slate-400">{selectedPlan?.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">${selectedPlan?.price}</div>
                      <div className="text-xs text-slate-400">COP</div>
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Correo Electrónico</label>
                      <input type="email" required className="w-full bg-obsidian-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="tu@email.com" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Información de Tarjeta</label>
                      <div className="relative">
                        <input type="text" required className="w-full bg-obsidian-900 border border-slate-700 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono" placeholder="0000 0000 0000 0000" />
                        <CreditCard size={18} className="absolute left-3 top-3.5 text-slate-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <input type="text" required className="w-full bg-obsidian-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono" placeholder="MM/AA" />
                        <input type="text" required className="w-full bg-obsidian-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono" placeholder="CVC" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 mt-6 bg-cyan-500 hover:bg-cyan-400 text-obsidian-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <><Loader2 className="animate-spin" size={20} /> Procesando...</>
                      ) : (
                        `Pagar $${selectedPlan?.price}`
                      )}
                    </button>
                  </form>

                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Shield size={14} /> Pagos seguros y encriptados
                  </div>
                </>
              ) : (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <Check className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">¡Pago Exitoso!</h3>
                  <p className="text-slate-400">Tus tokens han sido añadidos a tu cuenta.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleBuy = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const plans = [
    {
      title: "Persona Natural",
      price: "250.000",
      tokens: "1 Token Standard",
      description: "Ideal para empleados o independientes con ingresos básicos.",
      features: [
        "Flujo guiado paso a paso",
        "Liquidación en menos de 12 horas",
        "Soporte por correo",
        "Garantía anti-errores"
      ],
      highlighted: false
    },
    {
      title: "Partners / Contadores",
      price: "4.500.000",
      tokens: "Bolsa de 25 Tokens",
      description: "Para firmas que buscan escalar su rentabilidad en temporada.",
      features: [
        "Marca blanca (tu logo)",
        "Descuento por volumen",
        "Priorización máxima en servidor",
        "Descarga masiva de borradores",
        "Soporte técnico VIP (WhatsApp)"
      ],
      highlighted: true
    },
    {
      title: "Empresarial",
      price: "850.000",
      tokens: "1 Token Premium",
      description: "Para Pymes que necesitan conciliación y anexos completos.",
      features: [
        "Conexión contable (ERP/Excel)",
        "Anexos generados automáticamente",
        "Conciliación Formulario 110",
        "Firma electrónica integrada"
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing-section" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Invierte en Eficiencia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Paga solo por lo que usas mediante nuestro sistema de Tokens. Transparencia total, cero sorpresas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <PricingCard {...plan} onBuy={() => handleBuy(plan)} />
            </motion.div>
          ))}
        </div>
      </div>

      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </section>
  );
}
