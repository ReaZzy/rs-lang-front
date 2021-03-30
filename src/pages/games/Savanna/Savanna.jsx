import React, { useState } from 'react';
import GameSavanna from './components/GameSavanna';
import StartPageSavanna from './components/StartPageSavanna';
import GameOverSavanna from './components/GameOverSavanna';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles.module.css';

const Sprint = React.memo(() => {
  const [startGame, setStartGame] = useState(false);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [resultScore, setResultScore] = useState(0);
  const [level, setLevel] = useState(0);

  const history = useHistory();
  const handleOnClickHome = (path) => {
    history.push(`/${path}`);
  };

  return (
    <div className={styles.savanna}>
      <div className={styles.return_home}>
        <IconButton>
          <CloseIcon onClick={handleOnClickHome} />
        </IconButton>
      </div>
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
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
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
