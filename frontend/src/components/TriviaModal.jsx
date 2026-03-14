import React, { useState } from 'react';

const TriviaModal = ({ info, onCorrect, onWrong }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // La base de datos local predefinida se inyectará desde el componente padre
  if (!info) return null;

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelectedIdx(idx);
    setShowResult(true);
    
    setTimeout(() => {
      if (idx === info.correct_index) onCorrect();
      else onWrong();
    }, 2000);
  };

  return (
    <div style={styles.overlay}>
       <div style={styles.card}>
          <h3 style={{color: '#8be9fd', marginTop: 0}}>TERMINAL PYTHON: HACKEO MUNICIÓN</h3>
          <p style={{fontSize: '18px'}}>{info.question}</p>
          
          <div style={styles.options}>
             {info.options.map((opt, i) => {
               let bg = '#282a36';
               if (showResult) {
                 if (i === info.correct_index) bg = '#50fa7b';
                 else if (i === selectedIdx) bg = '#ff5555';
               } else if (i === selectedIdx) {
                 bg = '#6272a4';
               }
               
               return (
                 <button 
                   key={i} 
                   onClick={() => handleSelect(i)} 
                   style={{...styles.btn, backgroundColor: bg, color: (showResult && (i === info.correct_index || i === selectedIdx)) ? '#000' : '#f8f8f2'}}
                   disabled={showResult}
                 >
                   {opt}
                 </button>
               );
             })}
          </div>

          {showResult && (
             <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#1c1c24', borderLeft: `4px solid ${selectedIdx === info.correct_index ? '#50fa7b' : '#ff5555'}`}}>
               <p style={{margin: 0, fontWeight: 'bold'}}>{selectedIdx === info.correct_index ? "¡Hackeo Exitoso! Munición Repuesta." : "Acceso Denegado. La flota sufre daños."}</p>
               <p style={{margin: '10px 0 0 0', fontSize: '14px', color: '#6272a4'}}>{info.explanation}</p>
             </div>
          )}
       </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
  },
  card: {
    backgroundColor: '#111', padding: '30px', border: '1px solid #8be9fd', borderRadius: '4px', maxWidth: '600px', width: '90%'
  },
  options: {
    display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px'
  },
  btn: {
    padding: '15px', border: '1px solid #44475a', borderRadius: '4px', cursor: 'pointer', textAlign: 'left',
    fontSize: '16px', fontFamily: "'Courier New', Courier, monospace", transition: 'all 0.2s'
  }
};

export default TriviaModal;
