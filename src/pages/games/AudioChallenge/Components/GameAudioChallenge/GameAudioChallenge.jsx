import React, { useState, useEffect, useCallback } from 'react';
import { getData } from '../../../services/services';
import { RandomInteger, RightAnswer } from './helpers';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Correct from '../../../../../assets/games/sprint/audio/correct.mp3';
import ErrorSound from '../../../../../assets/games/sprint/audio/error.mp3';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { CircularProgress, Button } from '@material-ui/core';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { correctWord, wrongWord } from '../../../../../redux/words/thunks';

const audioCorrect = new Audio(Correct);
const audioError = new Audio(ErrorSound);
const pathApi = 'https://api-rslang.pet-projects.ru/';
const GameAudioChallenge = React.memo(
  ({
    startGamePages,
    setRightAnswers,
    setWrongAnswers,
    wrongAnswers,
    rightAnswers,
    setendGamePages,
    setResultScore,
    level,
  }) => {
    const [wordImg, setWordImg] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const [wordEnglish, setWordEnglish] = useState(false);
    const [point, setPoint] = useState(0);
    const [translate, setTranslate] = useState(' ');
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState({
      word: '',
      wordTranslate: '',
      audio: '',
      image: pathApi,
    });
    const handleFullScreen = useFullScreenHandle();
    const [isLoading, setIsLoading] = useState(true);
    const id = useSelector(
      (state) => state.auth.userInfo?.id || state.auth.userInfo?.userId
    );
    const token = useSelector((state) => state.auth.userInfo?.token);
    const dispatch = useDispatch();

    const getNewRandomWord = useCallback((count, items) => {
      const randIndex = RandomInteger(0, count);
      const randWord = items[randIndex];
      return randWord;
    }, []);

    useEffect(() => {
      const pages = RandomInteger(0, 6);
      const getWords = async () => {
        const fetchData = getData(level, pages, id, token);
        const newWords = await fetchData();
        setWords(newWords);
        const current = newWords[newWords.length - 1];
        setCurrentWord(current);
        setIsLoading(false);
      };
      getWords();
    }, [level, id, token]);

    useEffect(() => {
      if (Object.values(currentWord).length && words.length) {
        const addElements = words.length - 1;
        const wrongTranslate = getNewRandomWord(addElements, words);
        const wrongTranslate2 = getNewRandomWord(addElements, words);
        const wrongTranslate3 = getNewRandomWord(addElements, words);
        const wrongTranslate4 = getNewRandomWord(addElements, words);

        const arrayCompareWords = [
          currentWord.wordTranslate,
          wrongTranslate.wordTranslate,
          wrongTranslate2.wordTranslate,
          wrongTranslate3.wordTranslate,
          wrongTranslate4.wordTranslate,
        ];
        const randomWord = arrayCompareWords.sort(() => {
          return Math.random() - 0.5;
        });
        setTranslate(randomWord);
      }
    }, [words, currentWord, getNewRandomWord]);

    const handlerClickWord = useCallback(
      (correctTranslation) => {
        if (correctTranslation === currentWord.wordTranslate) {
          setRightAnswers(words[words.length - 1]);
          dispatch(correctWord(id, words[words.length - 1], token));
          audioCorrect.play();
          setDisabled(true)
          const result = RightAnswer(point);
          setPoint(result);
          setWordImg(true);
          setWordEnglish(true);
        } else {
          audioError.play();
          setWrongAnswers(words[words.length - 1]);
          setDisabled(true)
          dispatch(wrongWord(id, words[words.length - 1], token));

          setWordImg(true);
          setWordEnglish(true);
        }
      },
      [
        currentWord.wordTranslate,
        point,
        words,
        setRightAnswers,
        setWrongAnswers,
        setWordImg,
        setWordEnglish,
        dispatch,
        id,
        token,
      ]
    );

    function Sound() {
      const audioPlay = new Audio(pathApi + currentWord.audio);
      return audioPlay.play();
    }

    const nextWord = useCallback(() => {
      const wordsUpdated = words.filter(
        ({ word }) => word !== currentWord.word
      );
      setWords(wordsUpdated);
      setCurrentWord(wordsUpdated[wordsUpdated.length - 1]);

      setDisabled(false)
      setWordImg(false);
      setWordEnglish(false);
    }, [currentWord.word, words]);

    const next = useCallback(
      (event) => {
        const { keyCode } = event;
        if (keyCode === 13) {
          nextWord();
        }
      },
      [nextWord]
    );

    useEffect(() => {
      if (startGamePages) {
        if (rightAnswers.length + wrongAnswers.length >= 10) {
          setendGamePages(true);

          setResultScore(point);
        }
      }
    }, [
      startGamePages,
      setendGamePages,
      point,
      setResultScore,
      rightAnswers,
      wrongAnswers,
    ]);

    const handleUserKeyPress = useCallback(
      (event) => {
        const { keyCode } = event;

        if (keyCode === 49 || keyCode === 97) {
          handlerClickWord(translate[0]);
        }
        if (keyCode === 50 || keyCode === 98) {
          handlerClickWord(translate[1]);
        }
        if (keyCode === 51 || keyCode === 99) {
          handlerClickWord(translate[2]);
        }
        if (keyCode === 52 || keyCode === 100) {
          handlerClickWord(translate[3]);
        }
        if (keyCode === 53 || keyCode === 101) {
          handlerClickWord(translate[4]);
        }
      },
      [handlerClickWord, translate]
    );

    useEffect(() => {
      window.addEventListener('keyup', handleUserKeyPress);
      window.addEventListener('keyup', next);

      return () => {
        window.removeEventListener('keyup', handleUserKeyPress);
        window.removeEventListener('keyup', next);
      };
    }, [next, handleUserKeyPress]);

    return (
      <>
        {isLoading ? (
          <div className={styles.game_content}>
            {' '}
            <CircularProgress />{' '}
          </div>
        ) : (
          <div className={styles.game_content}>
            <FullscreenIcon
              className={styles.icon__fullScreen}
              onClick={handleFullScreen.enter}
              fontSize='large'
              color='primary'
            />
            <FullScreen handle={handleFullScreen}>
              <div className={styles.fullScreen__content}>
                <audio src={pathApi + currentWord.audio} autoPlay='autoplay'>
                  <track kind='captions' />
                </audio>
                <div className={styles.audio_challenge__panel}>
                  <h1 className={styles.audio_challenge__score}>
                    {' '}
                    Score: {point}{' '}
                  </h1>
                  <Button variant='contained' color='primary' onClick={Sound}>
                    <VolumeUpIcon />
                  </Button>
                </div>
                <div className={styles.audio_challenge__imageWrapper}>
                  {wordImg && (
                    <img
                      src={pathApi + currentWord.image}
                      alt='images'
                      className={styles.image - words}
                    />
                  )}
                  {wordEnglish && (
                    <div className={styles.word_english}>
                      {currentWord.word} - {currentWord.wordTranslate}
                    </div>
                  )}
                </div>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <div style={{ pointerEvents: disabled && "none", opacity: disabled && "70%" }}>
                    <div className={styles.translate_container}>
                      <div
                        style={{
                          background: 'orange',
                        }}
                        className={styles.translate_word}
                        onClick={() => handlerClickWord(translate[0])}
                      >
                        <h4 className={styles.translate_word_text}>
                          1. {translate[0]}
                        </h4>
                      </div>
                      <div
                        style={{
                          background: 'red',
                        }}
                        className={styles.translate_word}
                        onClick={() => handlerClickWord(translate[1])}
                      >
                        <h4 className={styles.translate_word_text}>
                          2. {translate[1]}
                        </h4>
                      </div>
                      <div
                        style={{
                          background: 'green',
                        }}
                        className={styles.translate_word}
                        onClick={() => handlerClickWord(translate[2])}
                      >
                        <h4 className={styles.translate_word_text}>
                          3. {translate[2]}
                        </h4>
                      </div>
                      <div
                        style={{
                          background: 'brown',
                        }}
                        className={styles.translate_word}
                        onClick={() => handlerClickWord(translate[3])}
                      >
                        <h4 className={styles.translate_word_text}>
                          4. {translate[3]}
                        </h4>
                      </div>
                      <div
                        style={{
                          background: 'pink',
                        }}
                        className={styles.translate_word}
                        onClick={() => handlerClickWord(translate[4])}
                      >
                        <h4 className={styles.translate_word_text}>
                          5. {translate[4]}
                        </h4>
                      </div>
                    </div>
                    <div className={styles.text_center} style={{ pointerEvents: "auto", opacity:"100%"}}>
                      <Button
                        variant='contained'
                        color='primary'
                        className={styles.button_next}
                        onClick={nextWord}
                      >
                        NEXT
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </FullScreen>
          </div>
        )}
      </>
    );
  }
);

export default GameAudioChallenge;
