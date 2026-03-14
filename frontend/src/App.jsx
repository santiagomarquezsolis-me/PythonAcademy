import React, { useState, useEffect } from 'react';
import MapEngine from './game/MapEngine';
import CodeModal from './components/CodeModal';
import StartScreen from './components/StartScreen';
import NonoScreen from './components/NonoScreen';
import HeroScreen from './components/HeroScreen';
import CinematicIntro from './components/CinematicIntro';
import { evaluateCode } from './api';
import axios from 'axios';
import './index.css';

function App() {
  const [activeLevel, setActiveLevel] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [levelsData, setLevelsData] = useState([]);
  const [gamePhase, setGamePhase] = useState('CINEMATIC'); // CINEMATIC, START, HERO, NONO, PLAYING
  const [completedLevels, setCompletedLevels] = useState([]);

  useEffect(() => {
    // Cargar niveles desde el backend al inicio
    axios.get('http://127.0.0.1:8000/api/v1/levels')
      .then(res => setLevelsData(res.data.levels))
      .catch(err => console.error("Error cargando niveles:", err));
  }, []);

  const handleInteract = (levelId) => {
    const levelToLoad = levelsData.find(l => l.id === levelId);
    if (levelToLoad) {
      setActiveLevel(levelToLoad);
      setResult(null);
    } else {
      console.warn("Nivel no implementado en backend o JSON todavía:", levelId);
    }
  };

  const handleRunCode = async (levelId, userCode) => {
    setEvaluating(true);
    setResult(null);
    const res = await evaluateCode(levelId, userCode);
    setResult(res);
    setEvaluating(false);
    
    if (res.success) {
      if (!completedLevels.includes(levelId)) {
        setCompletedLevels([...completedLevels, levelId]);
      }
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setResult(null); // Limpiar cuadro negro con stacktrace al cerrar modal
  };

  if (gamePhase === 'CINEMATIC') {
    return <CinematicIntro onNext={() => setGamePhase('START')} />;
  }

  if (gamePhase === 'START') {
    return <StartScreen onStart={() => setGamePhase('HERO')} />;
  }

  if (gamePhase === 'HERO') {
    return <HeroScreen onNext={() => setGamePhase('NONO')} />;
  }

  if (gamePhase === 'NONO') {
    return <NonoScreen onContinue={() => setGamePhase('PLAYING')} />;
  }

  return (
    <div style={{margin: 0, padding: 0, height: '100vh', width: '100vw', backgroundColor: '#0f0f13', overflow: 'hidden', boxSizing: 'border-box'}}>
      <MapEngine 
        onInteract={handleInteract} 
        levelsData={levelsData} 
        onExit={() => setGamePhase('CINEMATIC')}
        completedLevels={completedLevels}
      />
      
      {activeLevel && (
        <CodeModal 
          levelData={activeLevel} 
          onClose={() => setActiveLevel(null)} 
          onRunCode={handleRunCode}
          isEvaluating={evaluating}
        />
      )}

      {result && !showSuccessModal && (
        <div style={{
          position: 'fixed', bottom: 20, right: 20, 
          backgroundColor: result.success ? '#1a401a' : '#401a1a', 
          color: 'white', padding: '15px', borderRadius: '5px', zIndex: 2000,
          maxWidth: '500px', fontFamily: 'monospace', boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
          display: 'flex', flexDirection: 'column'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
            <h3 style={{margin: 0}}>{result.success ? '✅ ¡Código Ejecutado!' : '❌ Error / Test Fallido'}</h3>
            <button 
              onClick={() => setResult(null)} 
              style={{background: 'transparent', color: 'white', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '0 5px'}}
            >
              ✖
            </button>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', margin: 0, maxHeight: '250px', overflowY: 'auto' }}>
            {result.output}
          </pre>
          
          {result.success && (
            <button 
              onClick={() => {
                setShowSuccessModal(true);
                setActiveLevel(null);
                setResult(null);
              }}
              style={{marginTop: '15px', padding: '10px', backgroundColor: '#50fa7b', color: '#111', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
            >
              Completar Fase 🚀
            </button>
          )}
        </div>
      )}

      {showSuccessModal && (
        <div style={styles.successOverlay}>
          <div style={styles.successModal}>
            <div style={styles.successIcon}>👽🔫</div>
            <h2 style={{color: '#4ade80', margin: '0 0 10px 0'}}>¡Acceso Concedido!</h2>
            <p style={{color: '#cad5e2', marginBottom: '20px'}}>Has inyectado el código exitosamente en la red alienígena. El terminal ya es nuestro.</p>
            <button style={styles.continueBtn} onClick={closeSuccessModal}>
              Continuar Infiltración
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  successOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,10,0,0.85)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 3000,
    backdropFilter: 'blur(5px)'
  },
  successModal: {
    backgroundColor: '#111827', border: '1px solid #22c55e',
    borderRadius: '12px', padding: '40px', display: 'flex', 
    flexDirection: 'column', alignItems: 'center', textAlign: 'center',
    maxWidth: '400px', boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
  },
  successIcon: {
    fontSize: '60px', marginBottom: '15px'
  },
  continueBtn: {
    padding: '12px 24px', backgroundColor: '#22c55e', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px',
    fontWeight: 'bold', transition: 'all 0.2s', width: '100%'
  }
};

export default App;
