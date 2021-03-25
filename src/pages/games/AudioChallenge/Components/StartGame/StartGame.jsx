import React, { useCallback, useState } from 'react';
import CommonStartScreen from '../../../components/CommonStartScreen';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import styles from './styles.module.css';

const StartGame = React.memo(({ setstartGamePages, setLevel }) => {
  const [currentLevel, setCurrentLevel] = useState('1');
  const handleClickStart = useCallback(() => {
    setstartGamePages(true);
  }, [setstartGamePages]);

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
      title='Audio Challenge'
      descriptionText='Learn new words and repeat it.'
      rules='Training to improve listening skills'
      keyboardRules='You can use keys 1,2,3,4,5 or Enter to control the game!'
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
});
export default StartGame;
