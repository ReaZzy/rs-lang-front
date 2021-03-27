import React, { useState, useEffect } from 'react';

import StartScreen from './components/StartScreen';
import MainContainer from './components/MainContainer/MainContainer';
import styles from './styles.module.css';

const OurCustomGame = () => {
  const [start, setStart] = useState(false);
  const [level, setLevel] = useState('1');
  useEffect(() => {
    setStart(false);
  }, []);

  return (
    <div className={styles.our_custom_game}>
      {start ? (
        <MainContainer level={level} setLevel={setLevel} />
      ) : (
        <StartScreen onStartClick={() => setStart(true)} setLevel={setLevel} />
      )}
    </div>
  );
};

export default OurCustomGame;
