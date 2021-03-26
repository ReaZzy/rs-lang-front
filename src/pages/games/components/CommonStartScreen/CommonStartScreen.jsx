import React from 'react';
import { Button } from '@material-ui/core';
import styles from './styles.module.css';

function CommonStartScreen({
  title,
  children,
  onStartClick,
  rules,
  descriptionText,
  keyboardRules,
}) {
  return (
    <div className={styles.startScreen}>
      <h1 className={styles.start__text_name}>{title}</h1>
      <h4 className={styles.start__text}>{descriptionText}</h4>
      <h4 className={styles.start__text}>{rules}</h4>
      {children}
      <Button variant='contained' color='primary' onClick={onStartClick}>
        START
      </Button>
      <h4 className={styles.keyboard__rules__text}>{keyboardRules}</h4>
    </div>
  );
}

export default React.memo(CommonStartScreen);
