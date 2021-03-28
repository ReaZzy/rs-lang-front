import React from 'react';
import { Button, List, ListItemText } from '@material-ui/core';
import styles from './styles.module.css';


function CommonGameOverScreen({
  children,
  resultScore,
  handleOnClick,
  handlerClickCheck,
  isArrayWords,
  rightAnswers,
  wrongAnswers,
}) {
  return (
    <div className={styles.gameOverScreen}>
      <div className={styles.gameOver__header}>
        <h1 className={styles.gameOver__text}>GAME OVER</h1>
        <h3 className={styles.gameOver__text}>
          Your result: {resultScore} points
        </h3>
      </div>
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleOnClick('home')}
      >
        Home
      </Button>
      <div className={styles.result__button__container}>
        <Button
          variant='outlined'
          style={{color: '#fff', background: '#43ff4c'}}
          onClick={() => handlerClickCheck(true)}
        >
          right answers
        </Button>
        <Button
          variant='outlined'
          onClick={() => handlerClickCheck(false)}
          style={{color: '#fff', background: '#ff5f56'}}
        >
          wrong answers
          
        </Button>
      </div>
      <List>
        {isArrayWords === 1 &&
          rightAnswers.map((item) => (
            <ListItemText
              key={item.word}
              className={styles.gameOver__container__text}
            >
              {item.word === item.translate ? item.text : item.word} -{' '}
              {item.wordTranslate || item.translate}
            </ListItemText>
          ))}
        {isArrayWords === 2 &&
          wrongAnswers.map((item) => (
            <ListItemText
              key={item.word}
              className={styles.gameOver__container__text}
            >
              {item.word === item.translate ? item.text : item.word} -{' '}
              {item.wordTranslate || item.translate}
            </ListItemText>
          ))}
      </List>
      {children}
    </div>
  );
}

export default React.memo(CommonGameOverScreen);
