import React, { useState, useEffect, useCallback } from 'react';
import { getData } from '../../../services/services';
import { lifesIconColor, RandomInteger, RightAnswer } from './helpers';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Correct from '../../../../../assets/games/sprint/audio/correct.mp3';
import ErrorSound from '../../../../../assets/games/sprint/audio/error.mp3';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { CircularProgress } from '@material-ui/core';
import Diamond from '../../../../../assets/games/savanna/diamond.png';
import styles from './styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import {correctWord, wrongWord} from "../../../../../redux/words/thunks";

const audioCorrect = new Audio(Correct);
const audioError = new Audio(ErrorSound);
const pathApi = 'https://api-rslang.pet-projects.ru/';
const GameSavanna = React.memo(
  ({
    setRightAnswers,
    setWrongAnswers,
    setEndGame,
    setResultScore,
    level,
    rightAnswers,
    wrongAnswers,
  }) => {
    const token = useSelector( state => state.auth.userInfo?.token )
    const id = useSelector( state => state.auth.userInfo?.id || state.auth.userInfo?.userId )
    const dispatch = useDispatch()
    const [sizeDiamond, setSizeDiamond] = useState(0);
    const [wordImg, setWordImg] = useState(false);
    const [wordEnglish, setWordEnglish] = useState(false);
    const [point, setPoint] = useState(0);
    const [translate, setTranslate] = useState(' ');
    const [words, setWords] = useState([]);
    const [positionWord, setPositionWord] = useState(0);
    const [currentWord, setCurrentWord] = useState({
      word: '',
      wordTranslate: '',
      audio: '',
      image: pathApi,
    });
    const handleFullScreen = useFullScreenHandle();
    const [isLoading, setIsLoading] = useState(true);
    const [isNextWord, setIsNextWord] = useState(false);
    const [lifes, setLifes] = useState(5);

    const getNewRandomWord = useCallback((count, items) => {
      const randIndex = RandomInteger(0, count);
      const randWord = items[randIndex];
      return randWord;
    }, []);

    useEffect(() => {
      const pages = RandomInteger(0, 6);
      const getWords = async () => {
        const fetchData = getData(level, pages,id,token);
        const newWords = await fetchData();
        setWords(newWords);
        const current = newWords[newWords.length - 1];
        setCurrentWord(current);
        setIsLoading(false);
      };
      getWords();
    }, [level]); // eslint-disable-line

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
          setSizeDiamond(sizeDiamond + 2);
          setRightAnswers(words[words.length - 1]);
          dispatch(correctWord(id, words[words.length - 1], token))
          audioCorrect.play();
          const result = RightAnswer(point);
          setIsNextWord(true);
          setPoint(result);
        } else {
          setLifes(lifes - 1);
          audioError.play();
          setWrongAnswers(words[words.length - 1]);
          dispatch(wrongWord(id, words[words.length - 1], token))
          setIsNextWord(true);
        }
      },
      [ // eslint-disable-line
        currentWord?.wordTranslate,
        point,
        words,
        setRightAnswers,
        setWrongAnswers,
        lifes,
        sizeDiamond,
      ]
    );

    const nextWord = useCallback(() => {
      const wordsUpdated = words.filter(
        ({ word }) => word !== currentWord?.word
      );
      setWords(wordsUpdated);
      setCurrentWord(wordsUpdated[wordsUpdated.length - 1]);

      setWordImg(false);
      setWordEnglish(false);
    }, [currentWord?.word, words]);

    const next = useCallback(
      (event) => {
        const { keyCode } = event;
        if (keyCode === 13) {
          nextWord();
        }
      },
      [nextWord]
    );

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

    useEffect(() => {
      let timer = setTimeout(() => {
        setPositionWord(positionWord + 1);
      }, 100);
      if (positionWord >= 90) {
        setLifes(lifes - 1);
        setWrongAnswers(words[words.length - 1]);
      }
      if (positionWord >= 90 || isNextWord) {
        clearTimeout(timer);
        setPositionWord(0);
        nextWord();
        setIsNextWord(false);
      }
      return () => clearTimeout(timer);
    }, [positionWord, nextWord, isNextWord, lifes, setWrongAnswers, words]);

    useEffect(() => {
      if (lifes === 0 || rightAnswers.length + wrongAnswers.length === 20) {
        setResultScore(point);
        setEndGame(true);
      }
    }, [lifes, setEndGame, point, setResultScore, rightAnswers, wrongAnswers]);

    const history = useHistory();
    const handleOnClickHome = (path) => {
      history.push(`/${path}`);
    };
    return (
      <>
        {isLoading ? (
          <div className={styles.game_content}>
            {' '}
            <CircularProgress />{' '}
          </div>
        ) : (
          <div className={styles.game_content}>
            <div className={styles.return_home}>
              <IconButton>
                <CloseIcon onClick={handleOnClickHome} />
              </IconButton>
            </div>
            <div className={styles.icon__fullScreen}>
              {' '}
              <FullscreenIcon
                onClick={handleFullScreen.enter}
                fontSize='large'
                color='primary'
              />
            </div>
            <FullScreen handle={handleFullScreen}>
              <div className={styles.fullScreen__content}>
                <audio src={pathApi + currentWord?.audio} autoPlay='autoplay'>
                  <track kind='captions' />
                </audio>
                <div className={styles.savanna__panel}>
                  <h1 className={styles.savanna__score}> Score: {point} </h1>

                  <div className={styles.life_block}>
                    {lifesIconColor.length &&
                      lifesIconColor.map((item, index) => {
                        if (index >= lifes) {
                          return (
                            <FavoriteIcon
                              fontSize='large'
                              key={item}
                              style={{ color: `white` }}
                            />
                          );
                        }
                        return (
                          <FavoriteIcon
                            fontSize='large'
                            key={item}
                            style={{ color: `${item}` }}
                          />
                        );
                      })}
                  </div>
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
                    <div className={styles.run_container}>
                      <div className={styles.run_container_way}>
                        {' '}
                        <h3
                          className={styles.run_word}
                          style={{ top: `${positionWord}%` }}
                        >
                          {currentWord.word}
                        </h3>
                      </div>
                    </div>

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

                    <div className={styles.icon_end}>
                      <img
                        style={{
                          width: `${30 + sizeDiamond}px`,
                          height: `${30 + sizeDiamond}px`,
                        }}
                        src={Diamond}
                        alt='Diamond'
                        className={styles.diamond}
                      />
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
