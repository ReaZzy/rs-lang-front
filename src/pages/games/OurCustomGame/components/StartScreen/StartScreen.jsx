import React, { useCallback, useState } from 'react';
import CommonStartScreen from '../../../components/CommonStartScreen';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import styles from './styles.module.css';

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
      </>
    </CommonStartScreen>
  );
}

export default React.memo(StartScreen);
