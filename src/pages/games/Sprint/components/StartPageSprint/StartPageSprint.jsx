import React, { useCallback, useState } from 'react';
import { InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import styles from './styles.module.css';

const StartPageSprint = React.memo(({ setStartGame, setLevel }) => {
  const [currentLevel, setCurrentLevel] = useState('1');
  const handleClickStart = useCallback(() => {
    setStartGame(true);
  }, [setStartGame]);

  const isSelect = useCallback(
    (event) => {
      setCurrentLevel(event.target.value);
      const valueSelect = event.target.value - 1;
      setLevel(valueSelect);
    },
    [setLevel]
  );

  return (
    <div className={styles.sprint}>
      <div className={styles.sprint__text}>
        <h1 className={styles.start__text_name}>Sprint Game</h1>
        <h4 className={styles.start__text}>Learn new words and repeat it.</h4>
        <h4 className={styles.start__text}>Choose the correct word.</h4>
      </div>
      <div className={styles.sprint__select_level}>
        <InputLabel id='label'>Level</InputLabel>
        <Select
          labelId='label'
          id='select'
          value={currentLevel}
          onChange={isSelect}
        >
          <MenuItem value='1'>1</MenuItem>
          <MenuItem value='2'>2</MenuItem>
          <MenuItem value='3'>3</MenuItem>
          <MenuItem value='4'>4</MenuItem>
          <MenuItem value='5'>5</MenuItem>
          <MenuItem value='6'>6</MenuItem>
        </Select>
      </div>
      <Button variant='contained' color='primary' onClick={handleClickStart}>
        START
      </Button>
    </div>
  );
});
export default StartPageSprint;
