import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import CommonGameOverScreen from '../../../components/CommonGameOverScreen/CommonGameOverScreen';
import styles from './styles.module.css';
const GameOver = React.memo(({ rightAnswers, wrongAnswers, resultScore }) => {
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
    <div className={styles.gameOver_container}>
      <CommonGameOverScreen
        resultScore={resultScore}
        handleOnClick={handleOnClick}
        handlerClickCheck={handlerClickCheck}
        isArrayWords={isArrayWords}
        rightAnswers={rightAnswers}
        wrongAnswers={wrongAnswers}
      ></CommonGameOverScreen>
    </div>
  );
});

export default GameOver;
