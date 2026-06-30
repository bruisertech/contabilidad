import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Particles = ({ count }) => {
  const mesh = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      // Mueve ligeramente basado en el mouse
      particle.mx += (state.pointer.x * 20 - particle.mx) * 0.01;
      particle.my += (state.pointer.y * 20 - particle.my) * 0.01;

      dummy.position.set(
        (particle.mx / 10) + a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) + b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) + b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial color="#00E5FF" transparent opacity={0.6} emissive="#00E5FF" emissiveIntensity={0.5} />
    </instancedMesh>
  );
};

const NeuralNetworkBackground = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00E5FF" />
        <Particles count={200} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian-900 pointer-events-none" />
    </div>
  );
};

export default function Hero() {
  const scrollToNext = () => {
    document.getElementById('dashboard-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NeuralNetworkBackground />

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">
              Motor Tributario Automatizado
            </span>
          </div>

          {/* Título tipo Typewriter */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-slate-100">Optimiza tu tiempo y</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 gold-glow">
              tus impuestos.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto font-light">
            Liquidaciones perfectas en menos de 12 horas mediante inteligencia artificial. Olvídate del estrés contable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('pricing-section').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-obsidian-900 font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]"
            >
              Comprar Tokens
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToNext}
              className="px-8 py-4 bg-obsidian-800 border border-slate-600 hover:border-slate-400 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md"
            >
              Ver Simulación
            </motion.button>
          </div>

          {/* Contador en Vivo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center glass-card p-6 inline-flex mx-auto"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-slate-300 text-sm uppercase tracking-wide">Declaraciones procesadas hoy</span>
            </div>
            <div className="text-4xl md:text-5xl font-mono font-bold text-cyan-400 mt-2 text-glow">
              <span>1,452</span>
            </div>
          </motion.div>

        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 cursor-pointer text-slate-500 hover:text-cyan-400 transition-colors"
          onClick={scrollToNext}
        >
          <ChevronDown size={32} />
        </motion.div>
      </div>
    </section>
  );
}
