import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button } from '@material-ui/core';
import { getData } from '../../../games/services/services';
import staticQuestions from './staticQuestions';
import { useSelector } from 'react-redux';
// import "./style.scss";

let countAnswerMin = 0;
let countAnswerMax = 3;
let countAnswer = 0;
const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max - min);

  return Math.round(rand);
};
const getRandom = (min, max, count) => {
  const arr = [];
  return function getRandomCount() {
    const randomItem = randomInteger(min, max);
    if (arr.includes(randomItem)) {
      getRandomCount();
    } else {
      arr.push(randomItem);
    }
    if (arr.length < count) {
      getRandomCount();
    }
    return arr;
  };
};
const Test = ({ setRightAnswer, setWrongAnswer, setEndTest }) => {
  const id = useSelector(
    (state) => state.auth.userInfo?.id || state.auth.userInfo?.userId
  );
  const token = useSelector((state) => state.auth.userInfo?.token);
  const [testWord, setTestWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [numberQuestion, setNumberQuestion] = useState(0);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [countQuestionStart, setCountQuestionStart] = useState(7);
  const [countQuestionEnd, setCountQuestionEnd] = useState(10);
  const [
    arrRandomIndexForStaticDate,
    setarrRandomIndexForStaticDate,
  ] = useState([]);
  const [questionBlockText, setQuestionBlockText] = useState(
    'translate the word'
  );

  const [question, setQuestion] = useState('');
  const [questionSelect, setQuestionSelect] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');

  useEffect(() => {
    const getTestWords = async () => {
      const fetchData = getData(0, 10, id, token);
      const newWords = await fetchData();
      setQuestionAnswers(newWords);

      const indexRandom = randomInteger(0, 3);

      const arrayRandomItems = getRandom(0, 3, 4)();
      const arrRandomItemsForStaticData = getRandom(0, 14, 5)();
      setarrRandomIndexForStaticDate(arrRandomItemsForStaticData);
      const arrayAnswersRandom = arrayRandomItems.map((item) => {
        return newWords[item];
      });

      setQuestion(newWords[indexRandom].word);
      setTestWord(newWords[indexRandom].wordTranslate);
      setAnswer1(arrayAnswersRandom[0].wordTranslate);
      setAnswer2(arrayAnswersRandom[1].wordTranslate);
      setAnswer3(arrayAnswersRandom[2].wordTranslate);
      setAnswer4(arrayAnswersRandom[3].wordTranslate);
      setIsLoading(false);
    };
    getTestWords();
  }, [id, token]);

  const generateNewAnswer = useCallback(
    (start, end) => {
      if (questionAnswers.length > 0) {
        const indexRandom = randomInteger(start, end);
        const arrayRandomItems = getRandom(start, end, 4)();
        const arrayAnswersRandom = arrayRandomItems.map((item) => {
          return questionAnswers[item];
        });
        if (countAnswer < 6) {
          setQuestion(questionAnswers[indexRandom].word);
          setTestWord(questionAnswers[indexRandom].wordTranslate);
          setAnswer1(arrayAnswersRandom[0].wordTranslate);
          setAnswer2(arrayAnswersRandom[1].wordTranslate);
          setAnswer3(arrayAnswersRandom[2].wordTranslate);
          setAnswer4(arrayAnswersRandom[3].wordTranslate);
        } else if (countAnswer >= 10 && countAnswer < 15) {
          setQuestionSelect(questionAnswers[indexRandom].word);
          const questionChange = questionAnswers[indexRandom].textMeaning
            .replace(/<[^>]+>/g, '')
            .toLowerCase();
          const newQuestion = questionChange.replace(
            questionAnswers[indexRandom].word,
            '...'
          );
          setQuestion(newQuestion);
          setAnswer1(arrayAnswersRandom[0].word);
          setAnswer2(arrayAnswersRandom[1].word);
          setAnswer3(arrayAnswersRandom[2].word);
          setAnswer4(arrayAnswersRandom[3].word);
        }
      }
    },
    [setQuestion, questionAnswers]
  );

  const handleClickAnswer = (answer) => {
    countAnswer += 1;
    setNumberQuestion(countAnswer);
    countAnswerMin += 4;
    countAnswerMax += 4;
    if (answer === testWord) {
      setRightAnswer(testWord);
    } else if (
      countAnswer >= 10 &&
      countAnswer < 15 &&
      answer === questionSelect
    ) {
      setRightAnswer(questionSelect);
    } else {
      setWrongAnswer(answer);
    }
    if (countAnswer < 5) {
      generateNewAnswer(countAnswerMin, countAnswerMax);
    } else if (countAnswer >= 5 && countAnswer < 10) {
      const indexStaticDate = arrRandomIndexForStaticDate[countAnswer - 5];
      setTestWord(staticQuestions[indexStaticDate].answer);
      setQuestionBlockText('Choose a missing word');
      setQuestion(staticQuestions[indexStaticDate].text);
      setAnswer1(staticQuestions[indexStaticDate].options[0]);
      setAnswer2(staticQuestions[indexStaticDate].options[1]);
      setAnswer3(staticQuestions[indexStaticDate].options[2]);
      setAnswer4(staticQuestions[indexStaticDate].options[3]);
    } else if (countAnswer >= 10 && countAnswer < 15) {
      setQuestionBlockText('select a word according to definition');
      setCountQuestionStart(countAnswerMin);
      setCountQuestionEnd(countAnswerMax);
      generateNewAnswer(countQuestionStart, countQuestionEnd);
    } else if (countAnswer >= 15) {
      setEndTest(true);
    }
  };

  return (
    <>
      <div className='test'>
        <Card className='text-center cards-test'>
          <Card className='header-card-test'>Test</Card>
          <Card className='card-body-test-color'>
            {isLoading ? (
              <div animation='border' />
            ) : (
              <Card>{numberQuestion + 1} from 15</Card>
            )}
            <Card>{questionBlockText}</Card>
            <Card>{question}</Card>
            <Button
              className='answer-button'
              onClick={() => handleClickAnswer(answer1)}
            >
              {answer1}
            </Button>
            <Button
              className='answer-button'
              onClick={() => handleClickAnswer(answer2)}
            >
              {answer2}
            </Button>
            <Button
              className='answer-button'
              onClick={() => handleClickAnswer(answer3)}
            >
              {answer3}
            </Button>
            <Button
              className='answer-button'
              onClick={() => handleClickAnswer(answer4)}
            >
              {answer4}
            </Button>
          </Card>
          <Card className='text-muted'>Choose the correct answer</Card>
        </Card>
      </div>
    </>
  );
};

export default Test;
