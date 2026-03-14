import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeModal = ({ levelData, onClose, onRunCode, isEvaluating }) => {
  const [code, setCode] = useState(levelData.initial_code || '');
  const [showHint, setShowHint] = useState(false);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>{levelData.title}</h2>
          <button onClick={onClose} style={styles.closeBtn}>X</button>
        </div>
        <p style={styles.description}>{levelData.description}</p>
        
        {/* Caja de Ayuda de Nono */}
        {showHint && levelData.hint && (
          <div style={styles.hintBox}>
            <strong>🤖 NONO DICE:</strong> {levelData.hint}
          </div>
        )}

        <div style={styles.editorContainer}>
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{ minimap: { enabled: false }, fontSize: 16 }}
          />
        </div>

        <div style={styles.footer}>
          <button 
            style={styles.hintBtn} 
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? 'Ocultar Nono 🤖' : 'Preguntar a Nono 🤖'}
          </button>
          <button 
            style={styles.runBtn} 
            onClick={() => onRunCode(levelData.id, code)}
            disabled={isEvaluating}
          >
            {isEvaluating ? 'Ejecutando...' : 'Ejecutar Código'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  modal: {
    backgroundColor: '#1E1E2E', color: '#f8f8f2', width: '85%', height: '85%',
    borderRadius: '12px', padding: '25px', display: 'flex', flexDirection: 'column',
    boxShadow: '0 0 30px rgba(189, 147, 249, 0.4)', border: '1px solid #6272a4'
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '10px', borderBottom: '1px solid #44475a', paddingBottom: '15px'
  },
  closeBtn: {
    background: '#ff5555', color: 'white', border: 'none', fontSize: '16px', 
    cursor: 'pointer', borderRadius: '50%', width: '30px', height: '30px',
    display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  description: {
    marginBottom: '20px', fontSize: '16px', lineHeight: '1.6', color: '#8be9fd',
    backgroundColor: '#000', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #50fa7b'
  },
  hintBox: {
    marginBottom: '20px', fontSize: '14px', lineHeight: '1.5', color: '#f1fa8c',
    backgroundColor: 'rgba(241, 250, 140, 0.1)', padding: '12px', 
    borderRadius: '6px', border: '1px dashed #f1fa8c', animation: 'fadeIn 0.3s ease-in'
  },
  editorContainer: {
    flex: 1, border: '2px solid #44475a', borderRadius: '8px', overflow: 'hidden'
  },
  footer: {
    marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  hintBtn: {
    padding: '10px 15px', backgroundColor: 'transparent', color: '#8be9fd',
    border: '1px solid #8be9fd', borderRadius: '6px', cursor: 'pointer', fontSize: '14px',
    transition: 'all 0.2s', fontFamily: "'Courier New', Courier, monospace"
  },
  runBtn: {
    padding: '12px 25px', backgroundColor: '#50fa7b', color: '#282a36',
    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px',
    fontWeight: 'bold', boxShadow: '0 0 10px rgba(80, 250, 123, 0.5)',
    transition: 'all 0.2s'
  }
};

export default CodeModal;
