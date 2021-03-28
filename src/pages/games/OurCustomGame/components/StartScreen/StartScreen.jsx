import React, { useCallback, useState } from 'react';
import CommonStartScreen from '../../../components/CommonStartScreen';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import styles from './styles.module.css';
import Typography from '@material-ui/core/Typography';


function StartScreen({ onStartClick, setLevel }) {
  const [currentLevel, setCurrentLevel] = useState('1');
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
      title='Memory Game'
      onStartClick={onStartClick}
      rules='Turn over two cards with the word and its translation'
      descriptionText='This game will help you learn english words'
      keyboardRules='You can turn off the sound by pressing any key      '
    >
      <>
        <div className={styles.game__select_level}>
          <InputLabel id='label'>
              <Typography className={styles.selectItemText}>Level</Typography>
          </InputLabel>
          <Select
            labelId='label'
            id='select'
            value={currentLevel}
            onChange={isSelect}
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
      </>
    </CommonStartScreen>
  );
}

export default React.memo(StartScreen);
