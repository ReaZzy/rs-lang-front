import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useStyles } from './styles.module';
import Test from './components/Test';
import StartTest from './components/StartTest';
import EndTest from './components/EndTest';

const EnglishTestPage = () => {
  const [userLevel, setUserLevel] = useState('');
  const classes = useStyles();
  const [rightAnswer, setRightAnswer] = useState([]);
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const [startTest, setStartTest] = useState(false);
  const [endTest, setEndTest] = useState(false);
  const [resultTest, setResultTest] = useState(0);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    setResultTest(rightAnswer.length);
  }, [rightAnswer]);

  return (
    <Container maxWidth='md' className={classes.moduleContainer}>
        {!startTest && !endTest && (
          <StartTest setStartTest={setStartTest} userLevel={userLevel} />
        )}
        {startTest && !endTest && (
          <Test
            setRightAnswer={(word) => setRightAnswer([...rightAnswer, word])}
            setWrongAnswer={(word) => setWrongAnswer([...wrongAnswer, word])}
            startTest={startTest}
            setEndTest={setEndTest}
            setResultTest={setResultTest}
          />
        )}
        {startTest && endTest && (
          <EndTest
            resultTest={resultTest}
            setStartTest={setStartTest}
            setEndTest={setEndTest}
            setLevel={setLevel}
            level={level}
            setUserLevel={setUserLevel}
            rightAnswer={rightAnswer}
            wrongAnswer={wrongAnswer}
            userLevel={userLevel}
          />
        )}
    </Container>
  );
};

export default EnglishTestPage;
