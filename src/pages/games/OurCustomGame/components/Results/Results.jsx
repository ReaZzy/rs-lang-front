import React, { useState } from 'react';
import ResultItem from '../ResultItem';
import { DATA_URL } from '../../constants';
import styles from './styles.module.css';

function Results({ correct, incorrect }) {
  const [curAudio, setCurAudio] = useState(null);

  const speakItem = (audio) => {
    if (curAudio) {
      curAudio.pause();
    }
    const itemAudio = new Audio(`${DATA_URL}${audio}`);
    setCurAudio(itemAudio);
    itemAudio.play();
  };

  return (
    <div className={styles.result_container}>
      <div className={styles.info_answers}>
        <h4>I know</h4>
        {correct.map((item) => (
          <ResultItem
            speakItem={speakItem}
            key={item.id}
            text={`${item.text} - ${item.translate} `}
            audio={item.audio}
          />
        ))}
      </div>
      <div className={styles.info_answers}>
        <h4>I don`t know</h4>
        {incorrect.map((item) => (
          <ResultItem
            speakItem={speakItem}
            key={item.id}
            text={`${item.text} - ${item.translate} `}
            audio={item.audio}
          />
        ))}
      </div>
    </div>
  );
}

export default Results;
