import React, { useState, useEffect } from 'react';

const StartScreen = ({ onStart }) => {
  const [newsIndex, setNewsIndex] = useState(0);

  const newsFlash = [
    "ÚLTIMA HORA: Detectada anomalía espacial cerca de la órbita lunar...",
    "ÚLTIMA HORA: Múltiples objetos no identificados descentiendo hacia las principales capitales...",
    "URGENTE: Los escudos terrestres han sido comprometidos - Se declara la Ley Marcial Global",
    "ATENCIÓN: Se busca personal táctico con conocimientos en código Python. Presentarse al Búnker Sur."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsFlash.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.vignette}></div>
      <div style={styles.scanline}></div>

      {/* Radar Táctico de Invasión */}
      <div style={styles.radarContainer}>
        <div style={styles.radarScreen}>
          <div style={styles.radarSweep}></div>
          <div style={styles.radarGrid}></div>
          {/* Múltiples anomalías (naves) acercándose al centro (La Tierra) */}
          <div style={{...styles.enemyBlip, top: '20%', left: '30%', animationDelay: '0s'}}></div>
          <div style={{...styles.enemyBlip, top: '15%', left: '70%', animationDelay: '1s'}}></div>
          <div style={{...styles.enemyBlip, top: '75%', left: '25%', animationDelay: '2s'}}></div>
          <div style={{...styles.enemyBlip, top: '80%', left: '80%', animationDelay: '1.5s'}}></div>
          <div style={{...styles.enemyBlip, top: '40%', left: '15%', animationDelay: '0.5s', width: '12px', height: '12px'}}></div> {/* Nave Nodriza */}
          
          <div style={styles.earthTarget}></div>
        </div>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>OPERACIÓN: <span style={{color: '#ff5555'}}>BYTE INVADER</span></h1>
        
        {/* Simulador de Noticias */}
        <div style={styles.newsTickerContainer}>
          <div style={styles.liveBadge}>● LIVE</div>
          <div style={styles.newsTicker}>
             <span key={newsIndex} style={styles.newsText}>{newsFlash[newsIndex]}</span>
          </div>
        </div>

        <p style={styles.briefing}>
          <br/>
          <strong>Tierra, Año 2026.</strong> La invasión es inminente.<br/>
          Los métodos tradicionales de guerra son inútiles contra sus escudos electromagnéticos.<br/>
          La única forma de detener su Nave Nodriza es infiltrándonos para cargar el <strong>Virus Andrómeda</strong> en su núcleo.<br/><br/>
          Te necesitamos, Comandante.
        </p>

        <button style={styles.startBtn} onClick={onStart}>
           &gt; INICIAR PROTOCOLO _
        </button>
      </div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blip-flash {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); box-shadow: 0 0 10px #ff5555; }
        }
        @keyframes typeWriter {
          from { width: 0; opacity: 1; }
          to { width: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh', width: '100vw', backgroundColor: '#050510',
    color: '#fff', display: 'flex', flexDirection: 'column', 
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
    position: 'relative', fontFamily: "'Courier New', Courier, monospace"
  },
  vignette: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    boxShadow: 'inset 0 0 150px rgba(0,0,0,0.9)', zIndex: 10, pointerEvents: 'none'
  },
  scanline: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    pointerEvents: 'none', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
    backgroundSize: '100% 4px, 6px 100%', zIndex: 100
  },
  radarContainer: {
    position: 'relative', width: '250px', height: '250px', 
    marginBottom: '30px', zIndex: 1, padding: '10px',
    border: '2px solid #334', borderRadius: '50%', backgroundColor: '#0a0a1a',
    boxShadow: '0 0 30px rgba(80, 250, 123, 0.1), inset 0 0 50px rgba(0,0,0,0.8)'
  },
  radarScreen: {
    width: '100%', height: '100%', borderRadius: '50%', position: 'relative',
    overflow: 'hidden', border: '1px solid #50fa7b'
  },
  radarGrid: {
    position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
    background: `
      linear-gradient(90deg, transparent 49.5%, #184a25 49.5%, #184a25 50.5%, transparent 50.5%),
      linear-gradient(0deg, transparent 49.5%, #184a25 49.5%, #184a25 50.5%, transparent 50.5%),
      radial-gradient(circle, transparent 24%, #184a25 24.5%, transparent 25%),
      radial-gradient(circle, transparent 49%, #184a25 49.5%, transparent 50%),
      radial-gradient(circle, transparent 74%, #184a25 74.5%, transparent 75%)
    `
  },
  radarSweep: {
    position: 'absolute', top: '50%', left: '50%', width: '50%', height: '50%',
    background: 'linear-gradient(45deg, rgba(80,250,123,0) 0%, rgba(80,250,123,0.4) 100%)',
    transformOrigin: '0% 0%', animation: 'radar-spin 4s linear infinite',
    borderRight: '2px solid #50fa7b'
  },
  earthTarget: {
    position: 'absolute', top: '50%', left: '50%', width: '12px', height: '12px',
    backgroundColor: '#8be9fd', borderRadius: '50%', transform: 'translate(-50%, -50%)',
    boxShadow: '0 0 10px #8be9fd'
  },
  enemyBlip: {
    position: 'absolute', width: '6px', height: '6px', backgroundColor: '#ff5555',
    borderRadius: '50%', animation: 'blip-flash 2s infinite cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 5
  },
  content: {
    textAlign: 'center', zIndex: 20, maxWidth: '800px', padding: '0 20px'
  },
  title: {
    fontSize: '50px', letterSpacing: '4px', textShadow: '2px 2px 0 #000, 0 0 20px rgba(255,85,85,0.6)', 
    marginBottom: '20px'
  },
  newsTickerContainer: {
    display: 'flex', alignItems: 'center', backgroundColor: '#111', 
    border: '2px solid #ff5555', borderRadius: '4px', overflow: 'hidden',
    margin: '0 auto 30px auto', maxWidth: '700px'
  },
  liveBadge: {
    backgroundColor: '#ff5555', color: '#fff', padding: '10px 15px', 
    fontWeight: 'bold', animation: 'pulse 1s infinite'
  },
  newsTicker: {
    padding: '10px 15px', color: '#ffb86c', whiteSpace: 'nowrap', 
    overflow: 'hidden', flex: 1, textAlign: 'left'
  },
  newsText: {
    display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap',
    animation: 'typeWriter 2s steps(40, end) forwards'
  },
  briefing: {
    color: '#8be9fd', lineHeight: '1.8', fontSize: '16px', marginBottom: '40px',
    backgroundColor: 'rgba(0,0,0,0.6)', padding: '20px', borderRadius: '8px',
    border: '1px solid #44475a'
  },
  startBtn: {
    padding: '15px 40px', backgroundColor: 'transparent', color: '#50fa7b',
    border: '2px solid #50fa7b', borderRadius: '4px', fontSize: '20px',
    cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold',
    textShadow: '0 0 5px #50fa7b', boxShadow: '0 0 15px rgba(80, 250, 123, 0.2)',
    transition: 'all 0.3s ease'
  }
};

export default StartScreen;
