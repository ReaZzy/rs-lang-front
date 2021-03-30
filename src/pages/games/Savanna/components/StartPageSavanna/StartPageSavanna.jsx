import React, { useCallback, useState } from 'react';
import { InputLabel, Select, MenuItem, Typography } from '@material-ui/core';
import CommonStartScreen from '../../../components/CommonStartScreen';
import styles from './styles.module.css';

const StartPageSavanna = React.memo(({ setStartGame, setLevel }) => {
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
    <CommonStartScreen
      onStartClick={handleClickStart}
      title='Savanna Game'
      descriptionText='Learn new words and repeat it.'
      rules='Choose the correct word!'
      keyboardRules='You can use keys 1,2,3,4,5 or Enter to control the game!'
    >
      <div className={styles.game__select_level}>
        <InputLabel id='label'>
          <Typography className={styles.selectItemText}>Level</Typography>
        </InputLabel>
        <Select
          labelId='label'
          id='select'
          value={currentLevel}
          onChange={isSelect}
          styles={{ background: '#5c75f4' }}
          className={styles.select}
        >
          <MenuItem className={styles.selectItem} value='1'>
            <Typography className={styles.selectItemText}>1</Typography>
          </MenuItem>
          <MenuItem className={styles.selectItem} value='2'>
            <Typography className={styles.selectItemText}>2</Typography>
          </MenuItem>
          <MenuItem className={styles.selectItem} value='3'>
            <Typography className={styles.selectItemText}>3</Typography>
          </MenuItem>
          <MenuItem className={styles.selectItem} value='4'>
            <Typography className={styles.selectItemText}>4</Typography>
          </MenuItem>
          <MenuItem className={styles.selectItem} value='5'>
            <Typography className={styles.selectItemText}>5</Typography>
          </MenuItem>
          <MenuItem className={styles.selectItem} value='6'>
            <Typography className={styles.selectItemText}>6</Typography>
          </MenuItem>
        </Select>
      </div>
    </CommonStartScreen>
  );
});
export default StartPageSavanna;
