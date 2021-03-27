import React, { useState } from 'react';
import GameSavanna from './components/GameSavanna';
import StartPageSavanna from './components/StartPageSavanna';
import GameOverSavanna from './components/GameOverSavanna';
import styles from './styles.module.css';

const Sprint = React.memo(() => {
  const [startGame, setStartGame] = useState(false);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [resultScore, setResultScore] = useState(0);
  const [level, setLevel] = useState(0);

  return (
    <div className={styles.sprint}>
      {!startGame && !endGame && (
        <StartPageSavanna setStartGame={setStartGame} setLevel={setLevel} />
      )}
      {startGame && !endGame && (
        <GameSavanna
          level={level}
          startGame={startGame}
          setRightAnswers={(word) => setRightAnswers([...rightAnswers, word])}
          setWrongAnswers={(word) => setWrongAnswers([...wrongAnswers, word])}
          setEndGame={setEndGame}
          setResultScore={setResultScore}
        />
      )}
      {startGame && endGame && (
        <GameOverSavanna
          resultScore={resultScore}
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
        />
      )}
    </div>
  );
});

export default Sprint;
