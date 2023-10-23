import { useEffect, useState } from 'react';

import './App.css';

import hole from './assets/hole.png';
import mole from './assets/mole.png';

function App() {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoleVisibility(randomIndex, true);

      setTimeout(() => {
        setMoleVisibility(randomIndex, false);
      }, 500);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  function setMoleVisibility(index: number, isVisible: boolean) {
    const newMoles = [...moles];
    newMoles[index] = isVisible;
    setMoles(newMoles);
  }

  function wackMole(index: number) {
    if (!moles[index]) return;
    setMoleVisibility(index, false);
    setScore(score + 1);
  }

  return (
    <>
      <h1>Score: {score}</h1>
      <div className="grid">
        {moles.map((isMole, idx) => (
          <img
            className={isMole ? 'mole' : ''}
            src={isMole ? mole : hole}
            onClick={() => wackMole(idx)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
