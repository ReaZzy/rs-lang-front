import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import CommonGameOverScreen from '../../../components/CommonGameOverScreen/CommonGameOverScreen';

const GameOverSavanna = React.memo(
  ({ rightAnswers, wrongAnswers, resultScore }) => {
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
      <CommonGameOverScreen
        resultScore={resultScore}
        handleOnClick={handleOnClick}
        handlerClickCheck={handlerClickCheck}
        isArrayWords={isArrayWords}
        rightAnswers={rightAnswers}
        wrongAnswers={wrongAnswers}
      ></CommonGameOverScreen>
    );
  }
);

export default GameOverSavanna;
