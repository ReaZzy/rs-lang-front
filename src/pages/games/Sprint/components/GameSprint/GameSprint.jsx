import React, { useState, useEffect, useCallback } from 'react';
import Correct from '../../../../../assets/games/sprint/audio/correct.mp3';
import ErrorSound from '../../../../../assets/games/sprint/audio/error.mp3';
import { getData } from '../../../services/services';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import {
  CircularProgress,
  LinearProgress,
  Typography,
  Button,
} from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import { IconButton } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { randomInteger, rightAnswer } from '../../helpers/helper';
import { useDispatch, useSelector } from 'react-redux';
import { correctWord, wrongWord } from '../../../../../redux/words/thunks';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import MicIcon from '@material-ui/icons/Mic';
import styles from './styles.module.css';

const audioCorrect = new Audio(Correct);
const audioError = new Audio(ErrorSound);
const DATA_URL = 'https://api-rslang.pet-projects.ru/';
const GameSprint = React.memo(
  ({
    startGame,
    setRightAnswers,
    setWrongAnswers,
    setEndGame,
    setResultScore,
    level,
  }) => {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [sound, isSound] = useState(true);
    const dispatch = useDispatch();
    const id = useSelector(
      (state) => state.auth.userInfo?.id || state.auth.userInfo?.userId
    );
    const token = useSelector((state) => state.auth.userInfo?.token);
    const [translate, setTranslate] = useState(' ');
    const [extraPoint, setExtraPoint] = useState(0);
    const [point, setPoint] = useState(0);
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState({
      word: '',
      wordTranslate: '',
    });
    const handleFullScreen = useFullScreenHandle();
    const [seconds, setSeconds] = useState(60);
    const [counterExtraPoints, setCounterExtraPoints] = useState(0);
    const [responseUser, setResponseUser] = useState('Sprint Game');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
      }
    }, []);

    const getNewRandomWord = useCallback((count, items) => {
      const randIndex = randomInteger(0, count);
      const randWord = items[randIndex];
      return randWord;
    }, []);

    useEffect(() => {
      const getWords = async () => {
        const fetchData = getData(level, 10, id, token);
        const newWords = await fetchData();
        setWords(newWords);
        const current = newWords[newWords.length - 1];
        setCurrentWord(current);
        setIsLoading(false);
      };
      getWords();
    }, [level, id, token]);

    useEffect(() => {
      const timer = setInterval(() => {
        if (!isLoading) {
          setSeconds((sec) => sec - 1);
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }, [startGame, isLoading]);

    useEffect(() => {
      if (startGame) {
        if (seconds === 0 || words.length === 1) {
          setEndGame(true);
          setResultScore(point);
        }
      }
    }, [level, seconds, startGame, words, setEndGame, setResultScore, point]);

    useEffect(() => {
      if (Object.values(currentWord).length && words.length) {
        const countElements = words.length - 1;
        const compareWord = getNewRandomWord(countElements, words);
        const randIndexCompare = randomInteger(0, 1);
        const arrayCompareWords = [
          currentWord.wordTranslate,
          compareWord.wordTranslate,
        ];
        const translateWord = arrayCompareWords[randIndexCompare];
        setTranslate(translateWord);
      }
    }, [words, currentWord, getNewRandomWord]);

    const handlerSwichSound = useCallback(() => {
      isSound(!sound);
    }, [sound]);

    const handlerClickCheck = useCallback(
      (responseQuestion) => {
        if (
          (responseQuestion && translate === currentWord.wordTranslate) ||
          (!responseQuestion && translate !== currentWord.wordTranslate)
        ) {
          setExtraPoint(extraPoint + 1);
          setRightAnswers(words[words.length - 1]);
          dispatch(correctWord(id, words[words.length - 1], token));
          if (sound) audioCorrect.play();
          const result = rightAnswer(extraPoint, point);
          setCounterExtraPoints(result - point);
          setResponseUser('Sprint Game');
          setPoint(result);
        } else {
          if (sound) audioError.play();
          setCounterExtraPoints(0);
          setResponseUser('Wrong!!!');
          setWrongAnswers(words[words.length - 1]);
          dispatch(wrongWord(id, words[words.length - 1], token));
          setExtraPoint(0);
        }

        const wordsUpdated = words.filter(
          ({ word }) => word !== currentWord.word
        );
        setWords(wordsUpdated);
        setCurrentWord(wordsUpdated[wordsUpdated.length - 1]);
      },
      [
        currentWord.word,
        currentWord.wordTranslate,
        extraPoint,
        point,
        sound,
        translate,
        words,
        setRightAnswers,
        setWrongAnswers,
        dispatch,
        id,
        token,
      ]
    );

    const handleUserKeyPress = useCallback(
      (event) => {
        const { keyCode } = event;

        if (keyCode === 37) {
          handlerClickCheck(false);
        }
        if (keyCode === 39) {
          handlerClickCheck(true);
        }
      },
      [handlerClickCheck]
    );

    useEffect(() => {
      window.addEventListener('keydown', handleUserKeyPress);

      return () => {
        window.removeEventListener('keydown', handleUserKeyPress);
      };
    }, [handleUserKeyPress]);

    const handleSoundWord = useCallback(() => {
      const itemAudio = new Audio(`${DATA_URL}${currentWord.audio}`);
      itemAudio.play();
    }, [currentWord]);

    useEffect(() => {
      if (transcript) {
        transcript === 'True' ||
        transcript === 'true' ||
        transcript === 'тру' ||
        transcript === 'Тру'
          ? handlerClickCheck(true)
          : handlerClickCheck(false);
        resetTranscript();
      }
    }, [resetTranscript, transcript, handlerClickCheck]);

    return (
      <>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <FullscreenIcon
              className={styles.icon__fullScreen}
              onClick={handleFullScreen.enter}
              fontSize='large'
              color='primary'
            />
            <FullScreen handle={handleFullScreen}>
              <div className={styles.fullScreen__container}>
                <div className={styles.circle_extrapoint_sprint}>
                  <div
                    className={
                      extraPoint >= 1
                        ? `${styles.circle_right} ${styles.sprint_circle}`
                        : `${styles.sprint_circle}`
                    }
                  />
                  <div
                    className={
                      extraPoint >= 2
                        ? `${styles.circle_right} ${styles.sprint_circle}`
                        : `${styles.sprint_circle}`
                    }
                  />
                  <div
                    className={
                      extraPoint >= 3
                        ? `${styles.circle_right} ${styles.sprint_circle}`
                        : `${styles.sprint_circle}`
                    }
                  />
                </div>
                <div>
                  <div className={styles.sprint__card}>
                    <h3
                      className={
                        responseUser === 'Wrong!!!'
                          ? `${styles.title_sprint_wrong}`
                          : `${styles.title_sprint}`
                      }
                    >
                      {counterExtraPoints > 0
                        ? `+ ${counterExtraPoints} points`
                        : responseUser}
                    </h3>
                    <div className={styles.sprint__header}>
                      {' '}
                      <h3 className={styles.game__text}>Score: {point}</h3>
                      {sound ? (
                        <IconButton>
                          <MusicNoteIcon
                            style={{ cursor: 'pointer' }}
                            onClick={handlerSwichSound}
                            fontSize='large'
                            color='primary'
                          />
                        </IconButton>
                      ) : (
                        <IconButton>
                          {' '}
                          <MusicOffIcon
                            style={{ cursor: 'pointer' }}
                            onClick={handlerSwichSound}
                            fontSize='large'
                            color='primary'
                          />
                        </IconButton>
                      )}
                    </div>

                    <div className={styles.sprint__content}>
                      <h4>{currentWord.word}</h4>
                      <IconButton onClick={handleSoundWord}>
                        <VolumeUpIcon style={{ color: '#000' }} />
                      </IconButton>
                      <h4 className={styles.sprint__translate}>{translate}</h4>
                      <div className={styles.microphone}>
                        <IconButton>
                          <MicIcon
                            style={{ color: '#000' }}
                            onClick={() => {
                              SpeechRecognition.startListening();
                            }}
                          />
                        </IconButton>
                        <p className={styles.microphone_text}>
                          click and say "TRUE" or "FALSE"
                        </p>
                      </div>
                    </div>

                    <div className={styles.sprint__control_buttons}>
                      <div className={styles.buttons__block}>
                        <Button
                          variant='contained'
                          style={{ color: '#fff', background: '#ff5f56' }}
                          onClick={() => handlerClickCheck(false)}
                        >
                          FALSE
                        </Button>
                        <p className={styles.game__text_btn}>arrow left</p>
                      </div>
                      <div className={styles.buttons__block}>
                        <Button
                          variant='contained'
                          style={{ color: '#fff', background: '#43ff4c' }}
                          onClick={() => handlerClickCheck(true)}
                        >
                          TRUE
                        </Button>
                        <p className={styles.game__text_btn}>arrow right</p>
                      </div>
                    </div>

                    <div className={styles.sprint__progress}>
                      <Typography variant='h4' gutterBottom color='primary'>
                        {seconds}
                      </Typography>

                      <LinearProgress
                        variant='determinate'
                        value={Math.round((100 / 60) * seconds)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FullScreen>
          </>
        )}
      </>
    );
  }
);

export default GameSprint;
