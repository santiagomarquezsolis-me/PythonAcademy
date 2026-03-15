import React from 'react';

const NonoSuccessModal = ({ levelTitle, successExplanation, onContinue }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <div style={styles.robotContainer}>
          <div style={styles.robotEye}></div>
          <div style={styles.robotBody}>🤖</div>
        </div>

        <h1 style={styles.title}>
          IA DE APOYO: <span style={{ color: '#8be9fd' }}>NONO</span>
        </h1>
        <p style={styles.subtitle}>— {levelTitle} completada —</p>

        <div style={styles.dialogueBox}>
          <p style={styles.label}>🤖 NONO explica por qué lo has hecho bien:</p>
          <p style={styles.explanation}>{successExplanation || '¡Bien hecho! Has superado esta prueba y tu código ha cumplido todos los requisitos del sistema.'}</p>
        </div>

        <button style={styles.continueBtn} onClick={onContinue}>
          &gt; CONTINUAR INFILTRACIÓN _
        </button>
      </div>

      <style>{`
        @keyframes float-robot {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes blink-eye {
          0%, 96%, 98% { transform: scaleY(1); }
          97% { transform: scaleY(0.1); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 15, 19, 0.95)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3000,
    animation: 'fade-in 0.3s ease-out',
    fontFamily: "'Courier New', Courier, monospace",
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '560px',
    padding: '0 24px',
  },
  robotContainer: {
    position: 'relative',
    animation: 'float-robot 4s ease-in-out infinite',
    marginBottom: '16px',
  },
  robotBody: {
    fontSize: '72px',
    filter: 'drop-shadow(0 0 20px #8be9fd)',
  },
  robotEye: {
    position: 'absolute',
    top: '28px',
    left: '24px',
    width: '28px',
    height: '10px',
    backgroundColor: '#ff5555',
    borderRadius: '5px',
    zIndex: 2,
    boxShadow: '0 0 15px #ff5555',
    animation: 'blink-eye 5s infinite',
  },
  title: {
    fontSize: '24px',
    color: '#f8f8f2',
    borderBottom: '2px solid #8be9fd',
    paddingBottom: '8px',
    marginBottom: '8px',
    textShadow: '0 0 10px rgba(139, 233, 253, 0.5)',
  },
  subtitle: {
    fontSize: '14px',
    color: '#50fa7b',
    marginBottom: '20px',
  },
  dialogueBox: {
    backgroundColor: 'rgba(28, 28, 36, 0.95)',
    border: '1px solid #6272a4',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '28px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    width: '100%',
  },
  label: {
    fontSize: '13px',
    color: '#8be9fd',
    marginBottom: '12px',
    fontWeight: 'bold',
  },
  explanation: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#f8f8f2',
    margin: 0,
  },
  continueBtn: {
    padding: '14px 28px',
    backgroundColor: '#50fa7b',
    color: '#111',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 'bold',
    boxShadow: '0 0 20px rgba(80, 250, 123, 0.4)',
    transition: 'transform 0.2s ease, background-color 0.2s',
  },
};

export default NonoSuccessModal;
