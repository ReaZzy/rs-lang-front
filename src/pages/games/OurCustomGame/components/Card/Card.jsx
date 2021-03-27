import React from 'react';
import { DATA_URL } from '../../constants';
import styles from './styles.module.css';

function Card({ picture, opened, hidden, onClick, index, text, id }) {
  const onKeyDownHandle = (e) => {
    if (e.key === 'Enter') {
      onClick(e);
    }
  };

  return (
    <div
      className={`${styles.card_container} ${opened ? `${styles.opened}` : ''}
        ${hidden ? `${styles.hidden}` : ''}`}
      onClick={onClick}
      data-index={index}
      data-id={id}
      onKeyDown={onKeyDownHandle}
      role='button'
      tabIndex={index}
    >
      <div className={styles.flipCardFront}>
        {' '}
        <h1>?</h1>
        <h4>{text}</h4>
      </div>
      <div
        className={styles.flipCardBack}
        style={{ backgroundImage: `url(${DATA_URL}${picture})` }}
      >
        {text}
      </div>
    </div>
  );
}

export default React.memo(Card);
