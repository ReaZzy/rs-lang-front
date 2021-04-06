import React, { useState } from 'react';
import StartGame from './Components/StartGame';
import GameAudioChallenge from './Components/GameAudioChallenge';
import GameOverAudioCall from './Components/EndAudioChallenge';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles.module.css';

const AudioChallenge = React.memo(() => {
  const history = useHistory();
  const handleOnClickHome = (path) => {
    history.push(`/${path}`);
  };
  const [startGamePages, setstartGamePages] = useState(false);
  const [endGamePages, setendGamePages] = useState(false);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [resultScore, setResultScore] = useState(0);
  const [level, setLevel] = useState('1');

  console.log(startGamePages, endGamePages);
  return (
    <>
      <div className={styles.audio_challenge}>
        <div className={styles.return_home}>
          <IconButton>
            <CloseIcon onClick={handleOnClickHome} />
          </IconButton>
        </div>
        {!startGamePages && !endGamePages && (
          <StartGame
            setstartGamePages={setstartGamePages}
            setendGamePages={setendGamePages}
            setLevel={setLevel}
          />
        )}

        {startGamePages && !endGamePages && (
          <GameAudioChallenge
            level={level}
            startGamePages={startGamePages}
            setRightAnswers={(word) => setRightAnswers([...rightAnswers, word])}
            setWrongAnswers={(word) => setWrongAnswers([...wrongAnswers, word])}
            rightAnswers={rightAnswers}
            wrongAnswers={wrongAnswers}
            setendGamePages={setendGamePages}
            setstartGamePages={setstartGamePages}
            setResultScore={setResultScore}
          />
        )}

        {startGamePages && endGamePages && (
          <GameOverAudioCall
            resultScore={resultScore}
            rightAnswers={rightAnswers}
            wrongAnswers={wrongAnswers}
          />
        )}
      </div>
    </>
  );
});

export default AudioChallenge;
