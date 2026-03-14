import React from 'react';

const NonoScreen = ({ onContinue }) => {
  return (
    <div style={styles.container}>
      <div style={styles.gridOverlay}></div>
      
      <div style={styles.content}>
        <div style={styles.robotContainer}>
          <div style={styles.robotEye}></div>
          <div style={styles.robotBody}>
            🤖
          </div>
        </div>

        <h1 style={styles.title}>IA DE APOYO TÁCTICO: <span style={{color: '#8be9fd'}}>NONO</span></h1>
        
        <div style={styles.dialogueBox}>
          <p style={styles.typingText}>
            "Saludos, Comandante Humano. Soy NONO: Navegador Operacional Neutralizador de Objetivos."
          </p>
          <p style={{...styles.typingText, animationDelay: '2s'}}>
            "He logrado infiltrarme en tu HUD táctico. Las capas biométricas Alienígenas son complejas, pero si usas Python podrás saltarlas y allanar el camino de carga para el <strong>Virus Andrómeda</strong>."
          </p>
          <p style={{...styles.typingText, animationDelay: '4s', color: '#50fa7b'}}>
            "Si te quedas atascado en algún terminal, busca el botón <strong>'Preguntar a NONO'</strong> dentro del editor de código. Te transferiré paquetes de datos (pistas) para ayudarte."
          </p>
        </div>

        <button style={styles.continueBtn} onClick={onContinue}>
           &gt; ENTENDIDO, NONO _
        </button>
      </div>

      <style>{`
        @keyframes float-robot {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes blink-eye {
          0%, 96%, 98% { transform: scaleY(1); }
          97% { transform: scaleY(0.1); }
        }
        @keyframes reveal-text {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh', width: '100vw', backgroundColor: '#0f0f13',
    color: '#fff', display: 'flex', flexDirection: 'column', 
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
    position: 'relative', fontFamily: "'Courier New', Courier, monospace"
  },
  gridOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: 'linear-gradient(#282a36 1px, transparent 1px), linear-gradient(90deg, #282a36 1px, transparent 1px)',
    backgroundSize: '30px 30px', opacity: 0.3, pointerEvents: 'none', zIndex: 0
  },
  content: {
    zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
    maxWidth: '700px', padding: '0 20px'
  },
  robotContainer: {
    position: 'relative', animation: 'float-robot 4s ease-in-out infinite',
    marginBottom: '20px'
  },
  robotBody: {
    fontSize: '100px', filter: 'drop-shadow(0 0 20px #8be9fd)'
  },
  robotEye: {
    position: 'absolute', top: '40px', left: '32px', width: '36px', height: '12px',
    backgroundColor: '#ff5555', borderRadius: '5px', zIndex: 2,
    boxShadow: '0 0 15px #ff5555', animation: 'blink-eye 5s infinite'
  },
  title: {
    fontSize: '30px', borderBottom: '2px solid #8be9fd', paddingBottom: '10px',
    marginBottom: '30px', textShadow: '0 0 10px rgba(139, 233, 253, 0.5)'
  },
  dialogueBox: {
    backgroundColor: 'rgba(28, 28, 36, 0.9)', border: '1px solid #6272a4',
    borderRadius: '8px', padding: '30px', marginBottom: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)', minHeight: '200px'
  },
  typingText: {
    fontSize: '16px', lineHeight: '1.8', margin: '0 0 15px 0', opacity: 0,
    animation: 'reveal-text 0.5s forwards'
  },
  continueBtn: {
    padding: '15px 30px', backgroundColor: '#8be9fd', color: '#111',
    border: 'none', borderRadius: '4px', fontSize: '18px',
    cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold',
    textShadow: '0 0 5px rgba(255,255,255,0.5)', boxShadow: '0 0 20px rgba(139, 233, 253, 0.4)',
    transition: 'transform 0.2s ease, background-color 0.2s',
  }
};

export default NonoScreen;
