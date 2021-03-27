import React, { useState, useEffect, useCallback, useMemo } from 'react';
import getWords from '../../getWords';
import Menu from '../Menu';
import CardField from '../CardField';
import GameOver from '../GameOver';
import Results from '../Results';
import styles from './styles.module.css';
import Correct from '../../../../../assets/games/sprint/audio/correct.mp3';
import ErrorSound from '../../../../../assets/games/sprint/audio/error.mp3';
import SoundGame from '../../../../../assets/games/audio/soundGame.mp3';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
const audioCorrect = new Audio(Correct);
const audioError = new Audio(ErrorSound);
const soundGame = new Audio(SoundGame);

function MainContainer({ level, setLevel }) {
  const [gameIsOver, setGameIsOver] = useState(false);
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const handleFullScreen = useFullScreenHandle();
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(0);
  const [resultScore, setResultScore] = useState(0);
  const [sound, isSound] = useState(true);

  const handlerSwichSound = useCallback(
    (e) => {
      isSound(!sound);
    },
    [sound]
  );
  useEffect(() => {
    if (sound) soundGame.play();
    if (gameIsOver) soundGame.pause();
    return () => soundGame.pause();
  }, [sound, gameIsOver]);
  useEffect(() => {
    getWords(page, level).then((data) => {
      setWords(data);
    });
  }, [page, level]);

  const changeLevel = useCallback(() => {
    if (page === 29) {
      setLevel(level + 1);
    } else {
      setPage(page + 1);
    }
  }, [page, level, setLevel]);

  const wordCards = useMemo(() => words.slice(0, 6), [words]);

  useEffect(() => {
    setCorrect([]);
    setIncorrect([]);
  }, [wordCards]);

  useEffect(() => {
    setGameIsOver(false);
  }, [changeLevel]);

  const addCorrect = useCallback(
    (word) => {
      if (
        !correct.find((item) => item.id === word.id) &&
        !incorrect.find((item) => item.id === word.id)
      ) {
        if (sound) {
          audioCorrect.play();
        }
        setCorrect([...correct, word]);
      }
    },
    [correct, incorrect, sound]
  );
  useEffect(() => {
    setResultScore(correct.length);
  }, [setResultScore, correct]);

  const addIncorrect = useCallback(
    (word) => {
      if (!incorrect.find((item) => item.id === word.id)) {
        if (sound) {
          audioError.play();
        }
        setIncorrect([...incorrect, word]);
      }
    },
    [incorrect, sound]
  );

  useEffect(() => {
    document.addEventListener('keydown', handlerSwichSound, false);
    return () => {
      document.removeEventListener('keydown', handlerSwichSound, false);
    };
  }, [handlerSwichSound]);

  return (
    <>
      {gameIsOver ? (
        <GameOver
          rightAnswers={correct}
          wrongAnswers={incorrect}
          resultScore={resultScore}
        />
      ) : (
        <div className={styles.main_container}>
          <Menu
            page={page}
            setPage={setPage}
            level={level}
            setLevel={setLevel}
            resultScore={resultScore}
          />
          <div className={styles.navigation_container}>
            {sound ? (
              <MusicNoteIcon
                className={styles.icon__fullScreen}
                onClick={handlerSwichSound}
                fontSize='large'
                color='primary'
              />
            ) : (
              <MusicOffIcon
                className={styles.icon__fullScreen}
                onClick={handlerSwichSound}
                fontSize='large'
                color='primary'
              />
            )}

            <FullscreenIcon
              className={styles.icon__fullScreen}
              onClick={handleFullScreen.enter}
              fontSize='large'
              color='primary'
            />
          </div>
          <FullScreen handle={handleFullScreen}>
            <div className={styles.fullScreen}>
              <CardField
                words={wordCards}
                setGameIsOver={setGameIsOver}
                addCorrect={addCorrect}
                addIncorrect={addIncorrect}
              />
            </div>
          </FullScreen>
          <Results correct={correct} incorrect={incorrect} />
        </div>
      )}
    </>
  );
}

export default MainContainer;
