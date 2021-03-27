import React from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { LEVELS_ARRAY, PAGES_ARRAY } from '../../constants';
import styles from './styles.module.css';

function Menu({ level, setLevel, setPage, page, resultScore }) {
  const onLevelChangeHanddle = (e) => {
    setLevel(+e.target.value);
  };
  const onPageChangeHanddle = (e) => {
    setPage(+e.target.value);
  };

  return (
    <div className={styles.menu_container}>
      <div className={styles.game__select_level}>
        <InputLabel id='label'>Level</InputLabel>
        <Select
          labelId='label'
          id='select'
          value={level}
          onChange={onLevelChangeHanddle}
        >
          {LEVELS_ARRAY.map((item) => (
            <MenuItem key={item} value={item}>
              {item + 1}
            </MenuItem>
          ))}
        </Select>
      </div>
      <h1 className={styles.score}>Score: {resultScore}</h1>
      <div className={styles.menu_container_item}>
        <InputLabel id='label'>Page</InputLabel>
        <Select
          labelId='label'
          id='select'
          value={page}
          onChange={onPageChangeHanddle}
        >
          {PAGES_ARRAY.map((item) => (
            <MenuItem key={item} value={item}>
              {item + 1}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default React.memo(Menu);
