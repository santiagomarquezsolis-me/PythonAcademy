import React, { useState, useEffect } from 'react';
import TriviaModal from './TriviaModal';
import axios from 'axios';

const BattleshipMiniGame = ({ onWin, onLose, onFlee }) => {
  const [grid, setGrid] = useState([]);
  const [torpedoes, setTorpedoes] = useState(15);
  const [shipsDestroyed, setShipsDestroyed] = useState(0);
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [currentTrivia, setCurrentTrivia] = useState(null);
  const totalShips = 3;

  useEffect(() => {
    // Inicializar tablero 6x6
    let initialGrid = Array(6).fill().map(() => Array(6).fill({ hasShip: false, isHit: false, isMiss: false }));
    
    // Plantar 3 barcos de tamaño 1x1 (cruceros ligeros) aleatoriamente
    let planted = 0;
    while(planted < totalShips) {
      let x = Math.floor(Math.random() * 6);
      let y = Math.floor(Math.random() * 6);
      if(!initialGrid[y][x].hasShip) {
         initialGrid[y] = [...initialGrid[y]];
         initialGrid[y][x] = { ...initialGrid[y][x], hasShip: true };
         planted++;
      }
    }
    setGrid(initialGrid);

    // Cargar preguntas de Trivia desde el JSON (usando la misma ruta base q FastAPI)
    axios.get('http://localhost:8000/content/trivia.json')
      .then(res => setTriviaQuestions(res.data))
      .catch(err => console.error("Error cargando trivia", err));
  }, []);

  const handleFire = (x, y) => {
    if (torpedoes <= 0 || grid[y][x].isHit || grid[y][x].isMiss) return;

    let newGrid = [...grid];
    newGrid[y] = [...newGrid[y]];
    
    const newTorpedoes = torpedoes - 1;
    setTorpedoes(newTorpedoes);

    if (newGrid[y][x].hasShip) {
      newGrid[y][x] = { ...newGrid[y][x], isHit: true };
      const newDestroyedCount = shipsDestroyed + 1;
      setShipsDestroyed(newDestroyedCount);
      
      setGrid(newGrid);
      
      if (newDestroyedCount >= totalShips) {
         setTimeout(onWin, 1000);
      }
    } else {
      newGrid[y][x] = { ...newGrid[y][x], isMiss: true };
      setGrid(newGrid);
      
      if (newTorpedoes <= 0 && shipsDestroyed < totalShips) {
         // Si se queda sin torpedos, dejamos que intente ganar más con Trivia en vez de Perder inmediatamente
         // Solo pierde si se queda sin torpedos Y sin preguntas.
      }
    }
  };

  const openTrivia = () => {
    if (triviaQuestions.length > 0) {
      const idx = Math.floor(Math.random() * triviaQuestions.length);
      setCurrentTrivia(triviaQuestions[idx]);
      
      // Eliminar pregunta para no repetirla
      const newQaList = [...triviaQuestions];
      newQaList.splice(idx, 1);
      setTriviaQuestions(newQaList);
    }
  };

  const handleTriviaCorrect = () => {
    setTorpedoes(t => t + 5); // Premio jugoso
    setCurrentTrivia(null);
  };

  const handleTriviaWrong = () => {
    setCurrentTrivia(null);
    if (torpedoes <= 0) {
      setTimeout(onLose, 1000); // Game Over retrasado si falla estando a cero balas
    }
  };

  return (
    <div style={styles.overlay}>
       <div style={styles.modal}>
          <h2 style={{color: '#ff5555', textAlign: 'center', margin: '0 0 15px 0'}}>⚠️ INTERCEPCIÓN ALIENÍGENA ⚠️</h2>
          <p style={{textAlign: 'center', color: '#f8f8f2', margin: '0 0 20px 0'}}>Has pisado una trampa de red. Flota enemiga detectada.<br/>Destruye las {totalShips} naves ocultas antes de quedarte sin torpedos.</p>
          
          <div style={styles.statsPanel}>
             <span>Torpedos: {torpedoes} 🚀</span>
             <span>Naves: {shipsDestroyed}/{totalShips} 🛸</span>
             <button onClick={openTrivia} disabled={triviaQuestions.length === 0} style={{...styles.hackBtn, opacity: triviaQuestions.length === 0 ? 0.5 : 1}}>💻 Hackear Munición</button>
          </div>

          <div style={styles.board}>
            {grid.map((row, y) => 
               row.map((cell, x) => (
                 <div 
                   key={`${y}-${x}`}
                   onClick={() => handleFire(x, y)}
                   style={{
                     ...styles.cell,
                     backgroundColor: cell.isHit ? '#ff5555' : cell.isMiss ? '#44475a' : '#282a36',
                     cursor: (torpedoes > 0 && !cell.isHit && !cell.isMiss) ? 'crosshair' : 'not-allowed'
                   }}
                 >
                   {cell.isHit ? '💥' : cell.isMiss ? '🌊' : ''}
                 </div>
               ))
            )}
          </div>
          
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '25px'}}>
             <button onClick={onFlee} style={styles.fleeBtn}>🏃‍♂️ ESCAPE DE EMERGENCIA (-1 VIDA)</button>
          </div>
       </div>

       {currentTrivia && <TriviaModal info={currentTrivia} onCorrect={handleTriviaCorrect} onWrong={handleTriviaWrong} />}
    </div>
  );
};

const styles = {
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  modal: {
    backgroundColor: '#1c1c24', padding: '30px', border: '2px solid #ff5555', borderRadius: '8px',
    boxShadow: '0 0 50px rgba(255, 85, 85, 0.4)', maxWidth: '500px'
  },
  statsPanel: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', 
    fontWeight: 'bold', fontSize: '16px', padding: '10px', backgroundColor: '#282a36', borderRadius: '4px',
    color: '#8be9fd'
  },
  board: {
    display: 'grid', gridTemplateColumns: 'repeat(6, 50px)', gap: '5px', justifyContent: 'center'
  },
  cell: {
    width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', 
    fontSize: '24px', border: '1px solid #6272a4', borderRadius: '4px', transition: 'background-color 0.2s'
  },
  hackBtn: {
    backgroundColor: '#ffb86c', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer',
    fontWeight: 'bold', fontFamily: "'Courier New', Courier, monospace"
  },
  fleeBtn: {
    backgroundColor: '#300', border: '1px solid #ff5555', color: '#ff5555',
    padding: '12px 25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold',
    fontFamily: "'Courier New', Courier, monospace", transition: 'all 0.2s',
    fontSize: '16px', boxShadow: '0 0 10px rgba(255, 85, 85, 0.3)'
  }
};

export default BattleshipMiniGame;
