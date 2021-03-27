import React from 'react';
import Speak from './Speak';
import { Button } from '@material-ui/core';
import styles from './styles.module.css';

function ResultItem({ text, audio, speakItem }) {
  return (
    <div className={styles.resultItem_container}>
      <h3 className={styles.resultItem_container_text}>{text}</h3>
      <Button
        variant='contained'
        color='primary'
        onClick={() => speakItem(audio)}
      >
        <Speak />
      </Button>
    </div>
  );
}

export default ResultItem;
