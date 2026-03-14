import React from 'react';

const HeroScreen = ({ onNext }) => {
  return (
    <div style={styles.container}>
      <div style={styles.vignette}></div>
      <div style={styles.scanline}></div>

      {/* Título de Escena */}
      <h2 style={styles.subtitle}>&lt; BÚNKER DE DESPLIEGUE SECRETO &gt;</h2>

      {/* Contenedor de Arte */}
      <div style={styles.heroContainer}>
        <img src="/spartan_intro.png" alt="Spartan Comandante" style={styles.heroImage} />
      </div>

      <div style={styles.content}>
        <p style={styles.narration}>
          El Comando Central te ha equipado con la armadura prototipo "Vanguard" y el código fuente del <strong>Virus Andrómeda</strong>.<br />
          Tu nave interceptora de infiltración está repostada y lista en la plataforma V-9.<br /><br />
          Eres la última línea de defensa humana. Sobrevive a sus defensas lógicas, llega al núcleo principal y desata a Andrómeda para apagar su flota entera.
        </p>

        <button style={styles.nextBtn} onClick={onNext}>
           &gt; AVANZAR AL HANGAR _
        </button>
      </div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-border {
          0% { border-color: rgba(255, 85, 85, 0.4); box-shadow: 0 0 20px rgba(255,85,85,0.2); }
          50% { border-color: rgba(255, 85, 85, 1); box-shadow: 0 0 40px rgba(255,85,85,0.6); }
          100% { border-color: rgba(255, 85, 85, 0.4); box-shadow: 0 0 20px rgba(255,85,85,0.2); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh', width: '100vw', backgroundColor: '#050508',
    color: '#fff', display: 'flex', flexDirection: 'column', 
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
    position: 'relative', fontFamily: "'Courier New', Courier, monospace"
  },
  vignette: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    boxShadow: 'inset 0 0 150px rgba(0,0,0,0.95)', zIndex: 10, pointerEvents: 'none'
  },
  scanline: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    pointerEvents: 'none', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
    backgroundSize: '100% 4px, 6px 100%', zIndex: 100
  },
  subtitle: {
    color: '#ffb86c', letterSpacing: '3px', fontSize: '18px', zIndex: 20, 
    marginBottom: '30px', animation: 'fade-in-up 1s ease-out'
  },
  heroContainer: {
    position: 'relative', width: '500px', height: '350px', 
    marginBottom: '40px', zIndex: 5, borderRadius: '8px',
    overflow: 'hidden', border: '2px solid #ff5555',
    animation: 'pulse-border 3s infinite'
  },
  heroImage: {
    width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%',
    filter: 'contrast(1.1) brightness(0.9) saturate(1.2)'
  },
  content: {
    textAlign: 'center', zIndex: 20, maxWidth: '700px', padding: '0 20px',
    animation: 'fade-in-up 1s ease-out 0.5s both'
  },
  narration: {
    color: '#f8f8f2', fontSize: '16px', lineHeight: '1.8', marginBottom: '40px',
    backgroundColor: 'rgba(40, 42, 54, 0.6)', padding: '25px',
    borderRadius: '8px', borderLeft: '4px solid #ff5555'
  },
  nextBtn: {
    padding: '15px 40px', backgroundColor: 'rgba(255, 85, 85, 0.1)', color: '#ff5555',
    border: '2px solid #ff5555', borderRadius: '4px', fontSize: '20px',
    cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold',
    textShadow: '0 0 5px #ff5555', boxShadow: '0 0 15px rgba(255, 85, 85, 0.2)',
    transition: 'all 0.3s ease'
  }
};

export default HeroScreen;
