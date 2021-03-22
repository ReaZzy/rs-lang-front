import React, { useCallback } from 'react';
import styles from './styles.module.css';

const StartPageSprint = ({ setStartGame, setLevel }) => {
  const handleClickStart = useCallback(() => {
    setStartGame(true);
  }, [setStartGame]);

  const isSelect = (event) => {
    const valueSelect = event.target.value - 1;
    setLevel(valueSelect);
  };

  return (
    <div title='Sprint'>
      <div className={styles.text_center}>
        <div>Learn new words and repeat it</div>
        <p>Choose the correct word</p>
        <div className={styles.selectLevelSprint}>
          <label>Select level:</label>
          <select onChange={isSelect}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </div>
        <button onClick={handleClickStart}>START</button>
      </div>
    </div>
  );
};
export default StartPageSprint;
