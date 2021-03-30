import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import MainContainer from './components/MainContainer/MainContainer';
import styles from './styles.module.css';

const OurCustomGame = () => {
  const history = useHistory();
  const handleOnClickHome = (path) => {
    history.push(`/${path}`);
  };

  const [start, setStart] = useState(false);
  const [level, setLevel] = useState('1');
  useEffect(() => {
    setStart(false);
  }, []);

  return (
    <div className={styles.our_custom_game}>
      <div className={styles.return_home}>
        <IconButton>
          <CloseIcon onClick={handleOnClickHome} />
        </IconButton>
      </div>
      {start ? (
        <MainContainer level={level} setLevel={setLevel} />
      ) : (
        <StartScreen onStartClick={() => setStart(true)} setLevel={setLevel} />
      )}
    </div>
  );
};

export default OurCustomGame;
