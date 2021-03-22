import React, { useState, useEffect, useCallback } from 'react';
import Correct from '../../../../../assets/games/sprint/audio/correct.mp3';
import ErrorSound from '../../../../../assets/games/sprint/audio/error.mp3';
import onSound from '../../../../../assets/games/sprint/images/onSound.svg';
import offSound from '../../../../../assets/games/sprint/images/offSound.svg';
import { getData } from '../../../services/services';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import styles from './styles.module.css';

const audioCorrect = new Audio(Correct);
const audioError = new Audio(ErrorSound);
function randomInteger(min, max) {
  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
}
const rightAnswer = (counterAnswer, pointForAnswer) => {
  if (counterAnswer < 3) return pointForAnswer + 10;
  if (counterAnswer >= 3 && counterAnswer < 6) return pointForAnswer + 20;
  if (counterAnswer >= 6 && counterAnswer < 9) return pointForAnswer + 40;
  if (counterAnswer >= 9 && counterAnswer < 12) return pointForAnswer + 80;
  if (counterAnswer >= 12 && counterAnswer < 15) return pointForAnswer + 160;
  if (counterAnswer >= 15 && counterAnswer < 18) return pointForAnswer + 320;
  if (counterAnswer >= 18) return pointForAnswer + 640;
  return pointForAnswer;
};

const GameSprint = ({
  startGame,
  setRightAnswers,
  setWrongAnswers,
  setEndGame,
  setResultScore,
  level,
}) => {
  const [sound, isSound] = useState(true);
  const [translate, setTranslate] = useState(' ');
  const [extraPoint, setExtraPoint] = useState(0);
  const [point, setPoint] = useState(0);
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState({
    word: '',
    wordTranslate: '',
  });
  const [seconds, setSeconds] = useState(60);
  const [counterExtraPoints, setCounterExtraPoints] = useState(0);
  const [responseUser, setResponseUser] = useState('Sprint Game');
  const [isLoading, setIsLoading] = useState(true);

  const getNewRandomWord = useCallback((count, items) => {
    const randIndex = randomInteger(0, count);
    const randWord = items[randIndex];
    return randWord;
  }, []);

  useEffect(() => {
    const getWords = async () => {
      const fetchData = getData(level, 6);
      const newWords = await fetchData();
      setWords(newWords);
      const current = newWords[newWords.length - 1];
      setCurrentWord(current);
      setIsLoading(false);
    };
    getWords();
  }, [level]);

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

  return (
    <>
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
      <div className={styles.card_game_sprint_container}>
        <div className={styles.card_game_sprint}>
          <div
            className={
              responseUser === 'Wrong!!!'
                ? `{styles.title_sprint_wrong}`
                : `${styles.title_sprint}`
            }
          >
            {counterExtraPoints > 0
              ? `+ ${counterExtraPoints} points`
              : responseUser}
          </div>
          <div className={styles.head_sprint}>
            {' '}
            <p>Score: {point}</p>
            {isLoading ? <CircularProgress /> : <p>{seconds}</p>}
            <img
              className={styles.sound_sprint}
              onClick={handlerSwichSound}
              src={sound ? onSound : offSound}
              alt='sound-icon'
            />
          </div>
          <div className={styles.game_content_sprint}>
            <div>{currentWord.word}</div>
            <div className={styles.translate_sprint}>{translate}</div>
          </div>
          <div className={styles.control_buttons}>
            <button
              className={styles.wrong_button_sprint}
              onClick={() => handlerClickCheck(false)}
            >
              FALSE
            </button>
            <button
              className={styles.right_button_sprint}
              onClick={() => handlerClickCheck(true)}
            >
              TRUE
            </button>
          </div>
          <div className={styles.progress_sprint}>
            {' '}
            <LinearProgress variant='determinate' value={seconds} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSprint;
