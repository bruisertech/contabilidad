import Hero from './components/Hero'
import DashboardMockup from './components/DashboardMockup'
import Profiles from './components/Profiles'
import Simulator from './components/Simulator'
import Pricing from './components/Pricing'

function App() {
  return (
    <div className="bg-obsidian-900 min-h-screen text-slate-200">
      {/* Navegación sutil */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-obsidian-900 shadow-[0_0_10px_#00E5FF]">
              AI
            </div>
            TaxEngine
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
            <button onClick={() => document.getElementById('dashboard-section').scrollIntoView({ behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">Métricas</button>
            <button onClick={() => document.getElementById('simulator-section').scrollIntoView({ behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">Simulador</button>
            <button onClick={() => document.getElementById('pricing-section').scrollIntoView({ behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">Precios</button>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <DashboardMockup />
        <Profiles />
        <Simulator />
        <Pricing />
      </main>

      <footer className="bg-obsidian-950 py-8 border-t border-slate-800 text-center">
        <div className="container mx-auto px-6">
          <p className="text-slate-500 text-sm">© 2024 TaxEngine AI. Simulación de Pitch Deck Interactivo.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
