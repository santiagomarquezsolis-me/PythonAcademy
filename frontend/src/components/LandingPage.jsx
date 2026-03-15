import React from 'react';

const LandingPage = ({ onStart }) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>🚀 Python Academy: El Poder de la Gamificación</h1>
        
        <div style={styles.card}>
          <h2 style={styles.subtitle}>¿Por qué gamificar el aprendizaje?</h2>
          <p style={styles.text}>
            El aprendizaje tradicional de la programación a menudo puede resultar abstracto y desalentador. 
            Al integrar mecánicas de juego en la educación (gamificación), transformamos la adquisición de 
            habilidades complejas como Python en una experiencia inmersiva y motivadora.
          </p>
        </div>

        <div style={styles.grid}>
          <div style={styles.featureBox}>
            <span style={styles.icon}>🎯</span>
            <h3 style={styles.featureTitle}>Objetivos Claros</h3>
            <p style={styles.featureText}>Cada misión representa un concepto de código real (variables, bucles, etc.) dándole un propósito inmediato a tu aprendizaje.</p>
          </div>
          <div style={styles.featureBox}>
            <span style={styles.icon}>⚡</span>
            <h3 style={styles.featureTitle}>Feedback Inmediato</h3>
            <p style={styles.featureText}>Al igual que en un juego, sabrás al instante si tu código (tu estrategia) funciona, permitiendo corregir errores sobre la marcha.</p>
          </div>
          <div style={styles.featureBox}>
            <span style={styles.icon}>🛡️</span>
            <h3 style={styles.featureTitle}>Tolerancia al Fracaso</h3>
            <p style={styles.featureText}>Fallar no es un suspenso, es parte del proceso. Aprender de los errores en un entorno seguro fomenta la resiliencia (¡cuidado con las minas!).</p>
          </div>
          <div style={styles.featureBox}>
            <span style={styles.icon}>🏆</span>
            <h3 style={styles.featureTitle}>Motivación Intrínseca</h3>
            <p style={styles.featureText}>La narrativa de ciencia ficción y los logros desbloqueables mantienen el interés alto, empujándote a querer resolver el siguiente problema.</p>
          </div>
        </div>

        <div style={styles.actionContainer}>
          <p style={styles.callToAction}>¿Listo para aprender desarrollando tu propia solución e infiltrándote en las defensas enemigas?</p>
          <button style={styles.startBtn} onClick={onStart}>
            &gt; INICIAR EXPERIENCIA DE APRENDIZAJE _
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseBtn {
          0% { box-shadow: 0 0 0 0 rgba(80, 250, 123, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(80, 250, 123, 0); }
          100% { box-shadow: 0 0 0 0 rgba(80, 250, 123, 0); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#0f0f13',
    color: '#f8f8f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Courier New', Courier, monospace",
    overflow: 'auto',
    backgroundImage: 'radial-gradient(circle at center, #1E1E2E 0%, #0f0f13 100%)',
  },
  content: {
    maxWidth: '900px',
    padding: '20px',
    animation: 'fadeIn 1s ease-out',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    color: '#bd93f9',
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '0 0 10px rgba(189, 147, 249, 0.3)',
  },
  card: {
    backgroundColor: '#1E1E2E',
    border: '1px solid #44475a',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
  },
  subtitle: {
    color: '#ff79c6',
    marginTop: 0,
    marginBottom: '10px',
    fontSize: '20px',
  },
  text: {
    fontSize: '14px',
    lineHeight: 1.5,
    color: '#f8f8f2',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '20px',
  },
  featureBox: {
    backgroundColor: '#282a36',
    border: '1px solid #6272a4',
    borderRadius: '8px',
    padding: '15px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
  },
  icon: {
    fontSize: '24px',
    display: 'block',
    marginBottom: '5px',
  },
  featureTitle: {
    color: '#8be9fd',
    margin: '0 0 5px 0',
    fontSize: '16px',
  },
  featureText: {
    color: '#bfddb2',
    fontSize: '13px',
    lineHeight: 1.4,
    margin: 0,
  },
  actionContainer: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '20px',
    borderTop: '1px dashed #6272a4',
  },
  callToAction: {
    fontSize: '16px',
    marginBottom: '15px',
    color: '#f1fa8c',
  },
  startBtn: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#50fa7b',
    color: '#282a36',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: "'Courier New', Courier, monospace",
    animation: 'pulseBtn 2s infinite',
    transition: 'background-color 0.2s',
  }
};

export default LandingPage;
