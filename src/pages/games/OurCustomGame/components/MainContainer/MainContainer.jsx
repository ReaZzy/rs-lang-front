import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Menu from '../Menu';
import CardField from '../CardField';
import GameOver from '../GameOver';
import Results from '../Results';
import Correct from '../../../../../assets/games/sprint/audio/correct.mp3';
import ErrorSound from '../../../../../assets/games/sprint/audio/error.mp3';
import SoundGame from '../../../../../assets/games/audio/soundGame.mp3';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import { IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAggregatedWordsRequest } from '../../../../../redux/api';
import { correctWord, wrongWord } from '../../../../../redux/words/thunks';
import styles from './styles.module.css';

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
  const id = useSelector(
    (state) => state.auth.userInfo?.id || state.auth.userInfo?.userId
  );
  const token = useSelector((state) => state.auth.userInfo?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getWords = async () => {
      const data = await getAggregatedWordsRequest(page, level, id, token);
      setWords(data.data[0].paginatedResults);
    };
    getWords();
  }, [page, level, id, token]);

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

  const changeLevel = useCallback(() => {
    if (page === 29) {
      setLevel(level + 1);
    } else {
      setPage(page + 1);
    }
  }, [page, level, setLevel]);

  const wordCards = useMemo(() => words?.slice(0, 6), [words]);

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
        dispatch(correctWord(id, word, token));
      }
    },
    [correct, incorrect, sound, dispatch, id, token]
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
        dispatch(wrongWord(id, word, token));
      }
    },
    [incorrect, sound, dispatch, id, token]
  );

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
              <IconButton>
                {' '}
                <MusicNoteIcon
                  className={styles.icon__fullScreen}
                  onClick={handlerSwichSound}
                  fontSize='large'
                  color='primary'
                />
              </IconButton>
            ) : (
              <IconButton>
                <MusicOffIcon
                  className={styles.icon__fullScreen}
                  onClick={handlerSwichSound}
                  fontSize='large'
                  color='primary'
                />
              </IconButton>
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
