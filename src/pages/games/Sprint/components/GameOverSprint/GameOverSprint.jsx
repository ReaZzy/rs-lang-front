import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';

const GameOverSprint = ({ rightAnswers, wrongAnswers, resultScore }) => {
  const [isArrayWords, setArrayWords] = useState(0);
  const handlerClickCheck = useCallback((isCheck) => {
    if (isCheck) setArrayWords(1);
    else setArrayWords(2);
  }, []);
  const history = useHistory();
  const handleOnClick = (path) => {
    history.push(`/${path}`);
  };

  return (
    <>
      <div className={styles.sprint_end_game}>
        <div className={styles.header_gameover_sprint}>GAME OVER</div>
        <div>
          <div>Your result {resultScore} points</div>
          <p>I like you</p>
          <button
            className={styles.home_button}
            onClick={() => handleOnClick('home')}
          >
            Home
          </button>
        </div>
      </div>
      <div className={styles.result_buttons}>
        <button
          className={styles.button_sprint}
          onClick={() => handlerClickCheck(true)}
        >
          right answers
        </button>
        <button
          className={styles.button_sprint}
          onClick={() => handlerClickCheck(false)}
        >
          wrong answers
        </button>
      </div>
      <div>
        {isArrayWords === 1 &&
          rightAnswers.map((item) => (
            <div key={item.word}>
              {item.word} - {item.wordTranslate}
            </div>
          ))}
        {isArrayWords === 2 &&
          wrongAnswers.map((item) => (
            <div key={item.word}>
              {item.word} - {item.wordTranslate}
            </div>
          ))}
      </div>
    </>
  );
};

export default GameOverSprint;
