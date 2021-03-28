import React, { useState, useEffect, useCallback } from 'react';
import { getData } from '../../../services/services';
import { RandomInteger, RightAnswer } from './helpers';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Correct from '../../../../../assets/games/sprint/audio/correct.mp3';
import ErrorSound from '../../../../../assets/games/sprint/audio/error.mp3';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { CircularProgress, Button, Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import styles from './styles.module.css';
const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const audioCorrect = new Audio(Correct);
const audioError = new Audio(ErrorSound);
const pathApi = 'https://api-rslang.pet-projects.ru/';
const GameSavanna = React.memo(
  ({
    startGamePages,
    setRightAnswers,
    setWrongAnswers,
    setendGamePages,
    setResultScore,
    level,
  }) => {
    const [isDisabled, setDisabled] = useState(false);
    const [wordImg, setWordImg] = useState(false);
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

    const getNewRandomWord = useCallback((count, items) => {
      const randIndex = RandomInteger(0, count);
      const randWord = items[randIndex];
      return randWord;
    }, []);

    useEffect(() => {
      const pages = RandomInteger(0, 6);
      const getWords = async () => {
        const fetchData = getData(level, pages);
        const newWords = await fetchData();
        setWords(newWords);
        const current = newWords[newWords.length - 1];
        setCurrentWord(current);
        setIsLoading(false);
      };
      getWords();
    }, [level]);

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
          audioCorrect.play();
          const result = RightAnswer(point);
          setPoint(result);
          setDisabled(true);
          setWordImg(true);
          setWordEnglish(true);
        } else {
          audioError.play();
          setWrongAnswers(words[words.length - 1]);
          setDisabled(true);
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
      ]
    );

    const nextWord = useCallback(() => {
      const wordsUpdated = words.filter(
        ({ word }) => word !== currentWord.word
      );
      setWords(wordsUpdated);
      setCurrentWord(wordsUpdated[wordsUpdated.length - 1]);
      setDisabled(false);
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
        if (
          words.length === 10 ||
          words.length === 110 ||
          words.length === 70 ||
          words.length === 50 ||
          words.length === 90 ||
          words.length === 30 ||
          point === 10
        ) {
          setendGamePages(true);
          setResultScore(point);
        }
      }
    }, [level, startGamePages, words, setendGamePages, point, setResultScore]);

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
                <div className={styles.savanna__panel}>
                  <h1 className={styles.audio_challenge__score}>
                    {' '}
                    Score: {point}{' '}
                  </h1>
                  <Box component='fieldset' mb={3} borderColor='transparent'>
                    <StyledRating
                      name='customized-color'
                      defaultValue={5}
                      precision={1}
                      icon={<FavoriteIcon fontSize='inherit' />}
                    />
                  </Box>
                </div>
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
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <div>
                    <div className={styles.run_container}>word</div>
                    <div className={styles.button_translate_container}>
                      <ol>
                        <Button
                          variant='outlined'
                          color='primary'
                          style={{
                            color: '#fff',
                            background: 'orange',
                            margin: '0 10px',
                          }}
                          className={styles.button_translate_word}
                          disabled={isDisabled}
                          onClick={() => handlerClickWord(translate[0])}
                        >
                          <li className={styles.text__translate}>
                            {translate[0]}
                          </li>
                        </Button>
                        <Button
                          variant='outlined'
                          color='primary'
                          style={{
                            color: '#fff',
                            background: 'red',
                            margin: '0 10px',
                          }}
                          className={styles.button_translate_word}
                          disabled={isDisabled}
                          onClick={() => handlerClickWord(translate[1])}
                        >
                          <li className={styles.text__translate}>
                            {translate[1]}
                          </li>
                        </Button>
                        <Button
                          variant='outlined'
                          color='primary'
                          style={{
                            color: '#fff',
                            background: 'green',
                            margin: '0 10px',
                          }}
                          className={styles.button_translate_word}
                          disabled={isDisabled}
                          onClick={() => handlerClickWord(translate[2])}
                        >
                          <li className={styles.text__translate}>
                            {translate[2]}
                          </li>
                        </Button>
                        <Button
                          variant='outlined'
                          color='primary'
                          style={{
                            color: '#fff',
                            background: 'brown',
                            margin: '0 10px',
                          }}
                          className={styles.button_translate_word}
                          disabled={isDisabled}
                          onClick={() => handlerClickWord(translate[3])}
                        >
                          <li className={styles.text__translate}>
                            {translate[3]}
                          </li>
                        </Button>
                        <Button
                          variant='outlined'
                          color='primary'
                          style={{
                            color: '#fff',
                            background: 'pink',
                            margin: '0 10px',
                          }}
                          className={styles.button_translate_word}
                          disabled={isDisabled}
                          onClick={() => handlerClickWord(translate[4])}
                        >
                          <li className={styles.text__translate}>
                            {translate[4]}
                          </li>
                        </Button>
                      </ol>
                    </div>
                    <div className={styles.text_center}>
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

export default GameSavanna;
