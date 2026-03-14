import React, { useState, useEffect } from 'react';

const CinematicIntro = ({ onNext }) => {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Mostrar el botón de saltar tras 3 segundos por si el usuario tiene prisa
    const timer = setTimeout(() => setShowSkip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      {/* Fondo de estrellas animadas */}
      <div style={styles.stars}></div>
      <div style={styles.stars2}></div>

      {/* Planeta Tierra */}
      <div style={styles.earthContainer}>
        <div style={styles.earth}></div>
      </div>

      {/* Nave Alienígena Amenazante (Nave Nodriza) */}
      <div style={styles.mothershipContainer}>
        <img src="/alien_mothership.png" alt="Nave Alien Nodriza" style={styles.mothershipSprite} />
      </div>

      {/* UI y Texto Dramático */}
      <div style={styles.uiOverlay}>
        <h2 style={styles.warningText}>[ ALERTA ROJA: ANOMALÍA ESPACIAL DETECTADA VÍA SATÉLITE ]</h2>
        <p style={styles.typingText}>
          Objeto masivo de origen desconocido acercándose a la órbita terrestre baja.<br/>
          Velocidad de aproximación: Mach 250.<br/>
          Intención: HOSTIL.
        </p>

        {showSkip && (
           <button style={styles.skipBtn} onClick={onNext}>
             &gt; INICIAR DEFENSA TÁCTICA _
           </button>
        )}
      </div>

      <style>{`
        /* Animación de estrellas de fondo estilo parallax */
        @keyframes drift {
          from { transform: translateY(0); }
          to { transform: translateY(-2000px); }
        }

        /* Animación de acercamiento y oscilación de la Nave Nodriza */
        @keyframes approach {
          0% { transform: scale(0.1) translateY(-1000px); opacity: 0; filter: brightness(0.5); }
          30% { opacity: 1; filter: brightness(0.8); }
          100% { transform: scale(1.5) translateY(50px); filter: brightness(1.2); }
        }

        /* Rotación sutil de la nave */
        @keyframes hover {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        /* Luces de los motores pulsando */
        @keyframes engine-pulse {
          0%, 100% { box-shadow: 0 0 10px #ff5555, inset 0 0 10px #ff5555; background-color: #ff5555; }
          50% { box-shadow: 0 0 30px #ff0000, inset 0 0 20px #ff0000; background-color: #ff0000; }
        }

        /* Rotación de la Tierra Pixel Art sobre su eje Y simulando 3D */
        @keyframes earth-spin {
          from { background-position-x: 0; }
          to { background-position-x: 200vw; } /* Mueve la textura continuamente */
        }

        @keyframes type-alert {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes alert-flash {
          0%, 100% { color: #ff5555; text-shadow: 0 0 10px #ff5555; }
          50% { color: #ff0000; text-shadow: 0 0 30px #ff0000; }
        }
      `}</style>
    </div>
  );
};

// Generador de un string gigante para el box-shadow que simula estrellas
const generateStars = (count) => {
  let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #fff`;
  for (let i = 1; i < count; i++) {
    value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #fff`;
  }
  return value;
};

const styles = {
  container: {
    height: '100vh', width: '100vw', backgroundColor: '#020205',
    display: 'flex', flexDirection: 'column', justifyContent: 'center', 
    alignItems: 'center', overflow: 'hidden', position: 'relative',
    fontFamily: "'Courier New', Courier, monospace"
  },
  // Fondo estrellado usando un truco de box-shadow múltiple en un div 1x1
  stars: {
    position: 'absolute', top: 0, left: 0, width: '2px', height: '2px',
    background: 'transparent', boxShadow: generateStars(300),
    animation: 'drift 100s linear infinite', zIndex: 1
  },
  stars2: {
    position: 'absolute', top: 0, left: 0, width: '3px', height: '3px',
    background: 'transparent', boxShadow: generateStars(100),
    animation: 'drift 50s linear infinite', zIndex: 1
  },
  earthContainer: {
    position: 'absolute', bottom: '-40vh', left: '50%', transform: 'translateX(-50%)',
    width: '120vw', height: '120vw', maxWidth: '1200px', maxHeight: '1200px',
    borderRadius: '50%', zIndex: 5, overflow: 'hidden'
  },
  earth: {
    width: '100%', height: '100%', borderRadius: '50%',
    backgroundImage: 'url("/earth_texture_map.png")', backgroundSize: 'auto 100%', backgroundRepeat: 'repeat-x',
    position: 'relative', animation: 'earth-spin 120s linear infinite',
    boxShadow: 'inset -50px -20px 100px rgba(0,0,0,0.9), inset 15px 0px 40px rgba(139, 233, 253, 0.3)'
  },
  mothershipContainer: {
    position: 'absolute', top: '10%', zIndex: 20,
    animation: 'approach 8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
  },
  mothershipSprite: {
    width: '500px', height: 'auto', 
    filter: 'drop-shadow(0 0 30px rgba(255, 0, 0, 0.4)) drop-shadow(0 20px 20px rgba(0,0,0,0.8))',
    animation: 'hover 4s ease-in-out infinite'
  },
  uiOverlay: {
    position: 'absolute', bottom: '10%', left: '5%', right: '5%', zIndex: 100,
    textAlign: 'center', backgroundColor: 'rgba(5, 5, 10, 0.7)', padding: '20px',
    borderRadius: '8px', border: '1px solid #ff5555',
    boxShadow: '0 0 30px rgba(255, 85, 85, 0.3)', backdropFilter: 'blur(5px)',
    animation: 'type-alert 2s ease-out 1s both'
  },
  warningText: {
    margin: '0 0 15px 0', fontSize: '24px', letterSpacing: '4px',
    animation: 'alert-flash 1s infinite'
  },
  typingText: {
    color: '#f8f8f2', fontSize: '18px', lineHeight: '1.6', margin: 0,
    textShadow: '0 0 5px rgba(255,255,255,0.5)'
  },
  skipBtn: {
    marginTop: '25px', padding: '15px 40px', backgroundColor: 'rgba(255, 85, 85, 0.2)',
    color: '#ff5555', border: '2px solid #ff5555', borderRadius: '4px', fontSize: '18px',
    cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold',
    textShadow: '0 0 5px #ff5555', transition: 'all 0.3s ease',
    animation: 'type-alert 1s ease-out forwards'
  }
};

export default CinematicIntro;
