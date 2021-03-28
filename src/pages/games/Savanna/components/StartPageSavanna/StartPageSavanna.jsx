import React, { useCallback, useState } from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
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
      <div>
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
      </div>
    </CommonStartScreen>
  );
});
export default StartPageSavanna;
