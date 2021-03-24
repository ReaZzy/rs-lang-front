import { Button, List, ListItemText } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';

const GameOverSprint = React.memo(
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
      <section className={styles.gameOver}>
        <article className={styles.gameOver__container}>
          <h1 className={styles.gameOver__text}>GAME OVER</h1>
          <h3 className={styles.gameOver__text}>
            Your result {resultScore} points
          </h3>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleOnClick('home')}
          >
            {' '}
            Home{' '}
          </Button>
          <div className={styles.result__button__container}>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => handlerClickCheck(true)}
            >
              {' '}
              right answers{' '}
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => handlerClickCheck(false)}
            >
              {' '}
              wrong answers{' '}
            </Button>
          </div>
        </article>
        <List>
          {isArrayWords === 1 &&
            rightAnswers.map((item) => (
              <ListItemText
                key={item.word}
                className={styles.gameOver__container__text}
              >
                {item.word} - {item.wordTranslate}
              </ListItemText>
            ))}
          {isArrayWords === 2 &&
            wrongAnswers.map((item) => (
              <ListItemText
                key={item.word}
                className={styles.gameOver__container__text}
              >
                {item.word} - {item.wordTranslate}
              </ListItemText>
            ))}
        </List>
      </section>
    );
  }
);

export default GameOverSprint;
