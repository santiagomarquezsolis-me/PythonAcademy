import React, { useState, useEffect } from 'react';
import BattleshipMiniGame from '../components/BattleshipMiniGame';

const MapEngine = ({ onInteract, levelsData, onExit, completedLevels = [] }) => {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [isMissionsOpen, setIsMissionsOpen] = useState(true);
  const [lives, setLives] = useState(3);
  const [showBattleship, setShowBattleship] = useState(false);
  const [showAbortConfirm, setShowAbortConfirm] = useState(false);
  const [gridData, setGridData] = useState([]); // Arreglo de objetos en vez de ints simples
  const [messages, setMessages] = useState([
    ">> ENLACE ESTABLECIDO...",
    ">> OBJETIVO MUNDIAL: La especie humana está bajo asalto.",
    ">> INSTRUCCIONES: Avanza con cuidado por la Niebla de Guerra.",
    ">> Detecta y evade minas. Inyecta Antivirus en las celdas Z.",
  ]);

  const baseGrid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 4, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  // Iniciar mapa con minas y niebla
  useEffect(() => {
    let initialGrid = [];
    let possibleMineSpots = [];

    // Transformar a un array de objetos
    for (let y = 0; y < baseGrid.length; y++) {
      let row = [];
      for (let x = 0; x < baseGrid[y].length; x++) {
        let cellType = baseGrid[y][x];
        row.push({
          type: cellType, 
          isRevealed: false,
          hasMine: false
        });
        // Solo puede haber minas en el pasillo (0) y excluyendo el (1,1) de spawn
        if (cellType === 0 && !(x === 1 && y === 1)) {
           possibleMineSpots.push({x, y});
        }
      }
      initialGrid.push(row);
    }
    
    // Revelar la zona de spawn inicial del jugador
    initialGrid[0][1].isRevealed = true;
    initialGrid[1][1].isRevealed = true;
    initialGrid[2][1].isRevealed = true;
    initialGrid[1][0].isRevealed = true;
    initialGrid[1][2].isRevealed = true;

    // Plantar 16 minas aleatorias por el inmenso mapa
    possibleMineSpots.sort(() => 0.5 - Math.random());
    const mineSpots = possibleMineSpots.slice(0, 16);
    mineSpots.forEach(spot => {
      initialGrid[spot.y][spot.x].hasMine = true;
    });

    setGridData(initialGrid);
  }, []);

  const revealAdjacent = (x, y, currentGrid) => {
    // Revela radio de cruz al moverse
    const newGrid = [...currentGrid];
    const dirs = [[0,0], [-1,0], [1,0], [0,-1], [0,1]];
    dirs.forEach(d => {
      const ny = y + d[0];
      const nx = x + d[1];
      if (ny >= 0 && ny < newGrid.length && nx >= 0 && nx < newGrid[0].length) {
         newGrid[ny] = [...newGrid[ny]];
         newGrid[ny][nx].isRevealed = true;
      }
    });
    return newGrid;
  };

  useEffect(() => {
    if (gridData.length === 0) return;

    const handleKeyDown = (e) => {
      let { x, y } = playerPos;
      if (e.key === 'ArrowUp') y -= 1;
      if (e.key === 'ArrowDown') y += 1;
      if (e.key === 'ArrowLeft') x -= 1;
      if (e.key === 'ArrowRight') x += 1;

      // Check Out of bounds
      if (y < 0 || y >= gridData.length || x < 0 || x >= gridData[0].length) return;
      
      const targetCell = gridData[y][x];

      // Interaction check with Terminals (type > 1)
      if (targetCell.type > 1) {
        const idMap = {
          2: "level_01_variables",
          3: "level_02_bucles",
          4: "level_03_funciones",
          5: "level_04_listas"
        };
        const levelId = idMap[targetCell.type];

        if (completedLevels.includes(levelId)) {
          setMessages(prev => [...prev.slice(-4), `>> Z${targetCell.type-1} ya fue hackeado y asegurado.`]);
        } else {
          setMessages(prev => [...prev.slice(-4), `>> Analizando Terminal Z${targetCell.type-1}...`]);
          onInteract(levelId);
        }
        return;
      }

      // Move player into free space
      if (targetCell.type === 0) {
        setPlayerPos({ x, y });
        setGridData(revealAdjacent(x, y, gridData));

        if (targetCell.hasMine) {
           setMessages(prev => [...prev.slice(-4), ">> ⚠️ ¡COLISIÓN CRÍTICA! Has pisado una MINA."]);
           setLives(l => l - 1);
           // Eliminar la mina al pisarla para no volver a explotar si se mueve sobre ella
           let updatedGrid = [...gridData];
           updatedGrid[y] = [...updatedGrid[y]];
           updatedGrid[y][x].hasMine = false;
           
           if ((lives - 1) > 0) {
             setShowBattleship(true);
           }
        }
      } else if (targetCell.type === 1) {
        setMessages(prev => [...prev.slice(-4), ">> Impacto detectado: Casco de la nave irrompible."]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, gridData, lives]);

  // Vigilancia de Game Over
  useEffect(() => {
    if (lives <= 0) {
       setTimeout(() => {
          alert("💥 SISTEMA CRITICAMENTE DAÑADO. Misión Abortada. Volviendo a la Base.");
          onExit();
       }, 500);
    }
  }, [lives]);

  const handleBattleshipWin = () => {
    setShowBattleship(false);
    setMessages(prev => [...prev.slice(-4), ">> Flota enemiga Neutralizada. Sigues vivo."]);
  };

  const handleBattleshipLose = () => {
    setShowBattleship(false);
    setLives(0); // Penalización estricta por perder el minijuego de castigo
  };

  const handleBattleshipFlee = () => {
    setShowBattleship(false);
    setLives(l => l - 1); // Fuga cuesta 1 vida / barra de energía
    setMessages(prev => [...prev.slice(-4), ">> Fuga táctica realizada. Daños físicos recibidos en la retirada."]);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
           <h1 style={styles.title}>🛸 OPERACIÓN: <span style={{color: '#ff5555'}}>BYTE INVADER</span> <span style={styles.blinking}>_</span></h1>
           <div style={styles.subtext}>RESISTENCIA TERRESTRE // COMANDANTE TÁCTICO DE CÓDIGO</div>
        </div>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          {/* Barra de Integridad (Energía) */}
          <div style={styles.energyContainer}>
             <div style={{fontSize: '12px', color: '#ff5555', fontWeight: 'bold', marginBottom: '5px'}}>INTEGRIDAD DE TRAJE</div>
             <div style={styles.energyBarBg}>
                <div style={{
                  ...styles.energyBarFill, 
                  width: `${(lives / 3) * 100}%`,
                  backgroundColor: lives > 1 ? '#50fa7b' : '#ff5555',
                  boxShadow: `0 0 10px ${lives > 1 ? '#50fa7b' : '#ff5555'}`
                }}></div>
             </div>
             {lives === 0 && <span style={{fontSize: '10px', color: '#ff5555', marginTop: '2px'}}>CRÍTICO</span>}
          </div>

          <button style={styles.exitBtn} onClick={() => setShowAbortConfirm(true)}>
            🚪 ABORTAR MISIÓN
          </button>
        </div>
      </header>

      {showBattleship && <BattleshipMiniGame onWin={handleBattleshipWin} onLose={handleBattleshipLose} onFlee={handleBattleshipFlee} />}

      <div style={styles.gameArea}>
        {/* Lado izquierdo: LORE y UI */}
        <aside style={styles.sidebar}>
          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>📡 COMANDOS DE MANDO</h3>
            <div style={styles.terminalWindow}>
              {messages.map((m, idx) => (
                <div key={idx} style={{ color: m.includes('ERROR') ? '#ff5555' : '#8be9fd', marginBottom: '8px' }}>
                  {m}
                </div>
              ))}
            </div>
            <p style={{marginTop: '20px', color: '#6272a4', fontSize: '14px'}}>
              <strong>Controles:</strong> Usa ⬆️⬇️⬅️➡️ para mover a tu soldado Spartan (🪖). <br/>
              Infiltráte y reprograma las Consolas Enemigas (👽) usando Python.
            </p>
          </div>
          
          <div style={styles.panel}>
            <div 
              style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #44475a', paddingBottom: '10px'}}
              onClick={() => setIsMissionsOpen(!isMissionsOpen)}
            >
              <h3 style={{margin: 0, color: '#50fa7b'}}>🛡️ TERMINALES DETECTADOS</h3>
              <span style={{color: '#8be9fd', fontWeight: 'bold'}}>{isMissionsOpen ? '▼' : '▶'}</span>
            </div>
            {isMissionsOpen && (
              <ul style={{...styles.missionList, marginTop: '10px'}}>
                {levelsData.map((lvl, i) => {
                  const isCompleted = completedLevels.includes(lvl.id);
                  return (
                    <li key={i} style={{...styles.missionItem, color: isCompleted ? '#50fa7b' : '#ffb86c'}}>
                      {isCompleted ? '✅' : '💻'} Z{i+1}: {lvl.title}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        {/* Lado derecho: EL JUEGO 2D */}
        <main style={styles.mapContainer}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(19, 50px)', gap: '0px', border: '4px solid #44475a', borderRadius: '8px', overflow: 'hidden' }}>
            {gridData.map((row, rowIndex) => 
              row.map((cell, colIndex) => {
                const targetCell = gridData[rowIndex][colIndex];
                const isPlayer = playerPos.x === colIndex && playerPos.y === rowIndex;
                const isRevealed = targetCell.isRevealed;
                
                // Tema visual Cyberpunk/Spaceship
                let cellContent = '';
                let cellBg = '';

                if (targetCell.type === 1) cellBg = '#282a36'; // Pared
                else cellBg = '#1c1c24'; // Suelo
                
                let isDeadAlien = false;
                
                if (isPlayer) {
                  cellContent = '🪖';
                } else if (targetCell.hasMine && isRevealed) {
                  cellContent = '💥'; // La mina explota si es revelada (y se pisa) visualmente
                } else if (targetCell.type > 1) {
                  const idMap = { 2: "level_01_variables", 3: "level_02_bucles", 4: "level_03_funciones", 5: "level_04_listas" };
                  isDeadAlien = completedLevels.includes(idMap[targetCell.type]);
                  cellContent = isDeadAlien ? '☠️' : '👽';
                }

                return (
                  <div 
                    key={`${rowIndex}-${colIndex}`} 
                    style={{
                      width: '50px', height: '50px', 
                      backgroundColor: isRevealed ? cellBg : '#1E1E2E',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      fontSize: '30px', 
                      border: '1px solid #1E1E2E',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: (targetCell.type > 1 && !isDeadAlien && isRevealed) ? '0 0 15px rgba(255, 85, 85, 0.4)' : (isDeadAlien ? 'inset 0 0 10px rgba(80, 250, 123, 0.2)' : 'none'),
                      filter: isDeadAlien ? 'grayscale(80%)' : 'none'
                    }}
                  >
                    {/* Capa de Niebla de Guerra */}
                    {!isRevealed && (
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: '#1E1E2E', opacity: 0.95, zIndex: 20,
                        backgroundImage: 'radial-gradient(circle at center, #282a36 0%, #15161c 100%)'
                      }}></div>
                    )}

                    {/* Detalles visuales procedurales */}
                    {targetCell.type === 1 && isRevealed && <div style={{width: '100%', height: '100%', background: 'linear-gradient(45deg, #111 25%, #2a2c3a 25%, #2a2c3a 50%, #111 50%, #111 75%, #2a2c3a 75%, #2a2c3a 100%)', backgroundSize: '10px 10px'}}></div>}
                    {!isPlayer && targetCell.type > 1 && isRevealed && <span style={{position:'absolute', top: 2, right: 4, fontSize: '12px', color: isDeadAlien ? '#50fa7b' : '#ff5555', fontWeight: 'bold', zIndex: 10}}>Z{targetCell.type-1}</span>}
                    
                    {/* Personaje o Prop o Mina */}
                    {cellContent && isRevealed && <span style={{zIndex: 10, animation: isPlayer ? 'float 2s ease-in-out infinite' : ((targetCell.type > 1 && !isDeadAlien) ? 'pulse 2s infinite' : 'none')}}>{cellContent}</span>}
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

       <style>{`
        @keyframes float {
          0% { transform: translateY(0px) }
          50% { transform: translateY(-3px) }
          100% { transform: translateY(0px) }
        }
        @keyframes pulse {
          0% { filter: drop-shadow(0 0 2px gold); }
          50% { filter: drop-shadow(0 0 8px gold); }
          100% { filter: drop-shadow(0 0 2px gold); }
        }
      `}</style>

      {showAbortConfirm && (
        <div style={styles.abortOverlay}>
          <div style={styles.abortModal}>
            <h2 style={{color: '#ff5555', marginTop: 0}}>⚠️ CONFIRMACIÓN REQUERIDA</h2>
            <p style={{color: '#f8f8f2', fontSize: '16px'}}>¿Estás seguro de que deseas abandonar la zona de cuarentena?<br/><br/>Toda tu conexión local con los terminales se perderá.</p>
            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '25px'}}>
              <button 
                onClick={onExit}
                style={{...styles.abortBtn, backgroundColor: '#ff5555', color: '#111'}}
              >ABORTAR</button>
              <button 
                onClick={() => setShowAbortConfirm(false)}
                style={{...styles.abortBtn, backgroundColor: '#44475a', color: '#fff'}}
              >CANCELAR</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '10px 20px', backgroundColor: '#0f0f13', color: '#f8f8f2', 
    height: '100vh', width: '100vw', boxSizing: 'border-box',
    display: 'flex', flexDirection: 'column', 
    fontFamily: "'Courier New', Courier, monospace",
    overflow: 'hidden'
  },
  header: {
    borderBottom: '2px solid #6272a4', paddingBottom: '10px', marginBottom: '15px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  energyContainer: {
    width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'
  },
  energyBarBg: {
    width: '100%', height: '15px', backgroundColor: '#1c1c24', border: '1px solid #44475a',
    borderRadius: '8px', overflow: 'hidden'
  },
  energyBarFill: {
    height: '100%', transition: 'width 0.3s ease-in-out, background-color 0.3s'
  },
  title: {
    margin: 0, color: '#bd93f9', fontSize: '28px', letterSpacing: '2px', textShadow: '0 0 10px rgba(189, 147, 249, 0.5)'
  },
  subtext: {
    color: '#6272a4', fontWeight: 'bold', marginTop: '2px', fontSize: '14px'
  },
  blinking: {
    animation: 'blink 1s step-end infinite'
  },
  gameArea: {
    display: 'flex', gap: '20px', flex: 1, minHeight: 0 // Importante para evitar scroll inside flex column
  },
  sidebar: {
    display: 'flex', flexDirection: 'column', gap: '15px', width: '300px',
    height: '100%', overflowY: 'auto' // El sidebar puede scrollear si hay mucho historial
  },
  panel: {
    backgroundColor: '#1E1E2E', border: '1px solid #44475a', 
    borderRadius: '8px', padding: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
  },
  panelTitle: {
    marginTop: 0, color: '#50fa7b', borderBottom: '1px solid #44475a', paddingBottom: '10px'
  },
  terminalWindow: {
    backgroundColor: '#000', padding: '15px', borderRadius: '4px', 
    height: '180px', overflowY: 'auto', fontSize: '13px', border: '1px inset #333'
  },
  missionList: {
    listStyleType: 'none', padding: 0, margin: 0
  },
  missionItem: {
    padding: '10px 0', borderBottom: '1px dashed #44475a', color: '#ffb86c'
  },
  mapContainer: {
    flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start'
  },
  exitBtn: {
    padding: '10px 15px', backgroundColor: 'transparent', 
    color: '#ff5555', border: '1px solid #ff5555', borderRadius: '4px',
    cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
    textShadow: '0 0 5px rgba(255,85,85,0.5)', transition: 'background-color 0.2s',
    fontFamily: "'Courier New', Courier, monospace"
  },
  abortOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 4000
  },
  abortModal: {
    backgroundColor: '#1E1E2E', border: '2px solid #ff5555',
    borderRadius: '8px', padding: '30px', maxWidth: '400px',
    textAlign: 'center', boxShadow: '0 0 20px rgba(255,85,85,0.4)',
  },
  abortBtn: {
    padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer',
    fontWeight: 'bold', fontFamily: "'Courier New', Courier, monospace", transition: 'opacity 0.2s',
    fontSize: '14px'
  }
};

export default MapEngine;
