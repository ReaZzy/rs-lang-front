import React, { useState } from 'react';
import StartGame from './Components/StartGame';
import GameAudioChallenge from './Components/GameAudioChallenge';
import GameOverAudioCall from './Components/EndAudioChallenge';
import styles from './styles.module.css';

const AudioChallenge = React.memo(() => {
  const [startGamePages, setstartGamePages] = useState(false);
  const [endGamePages, setendGamePages] = useState(false);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [resultScore, setResultScore] = useState(0);
  const [level, setLevel] = useState('1');
  return (
    <>
      <div className={styles.audio_challenge}>
        {!startGamePages && !endGamePages && (
          <StartGame
            setstartGamePages={setstartGamePages}
            setLevel={setLevel}
          />
        )}

        {startGamePages && !endGamePages && (
          <GameAudioChallenge
            level={level}
            startGamePages={startGamePages}
            setRightAnswers={(word) => setRightAnswers([...rightAnswers, word])}
            setWrongAnswers={(word) => setWrongAnswers([...wrongAnswers, word])}
            setendGamePages={setendGamePages}
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
