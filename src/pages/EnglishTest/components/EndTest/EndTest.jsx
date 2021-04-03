import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles.module';

const EndTest = ({
  rightAnswer,
  wrongAnswer,
  resultTest,
  setLevel,
  level,
  setUserLevel,
  userLevel,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const handleOnClick = (path) => {
    history.push(`/${path}`);
  };

  const [isArrayWords, setArrayWords] = useState(0);
  const handlerClickCheck = useCallback((isCheck) => {
    if (isCheck) setArrayWords(1);
    else setArrayWords(2);
  }, []);

  useEffect(() => {
    if (resultTest < 4) {
      setLevel(0);

      setUserLevel('Beginner');
    } else if (resultTest >= 4 && resultTest < 6) {
      setLevel(1);

      setUserLevel('Elementary');
    } else if (resultTest >= 6 && resultTest < 9) {
      setLevel(2);

      setUserLevel('Pre-Intermediate');
    } else if (resultTest >= 9 && resultTest < 12) {
      setLevel(3);

      setUserLevel('Intermediate');
    } else if (resultTest >= 12 && resultTest < 14) {
      setLevel(4);

      setUserLevel('Upper Intermediate');
    } else if (resultTest >= 14) {
      setLevel(5);

      setUserLevel('Advanced');
    }
  }, [resultTest, setLevel, setUserLevel]);

  return (
    <>
      <Grid  className={classes.testResult}>
        <Typography variant="h3">
          Your level: {userLevel} ({level}).{' '}
        </Typography>
        <Typography className={classes.testResultAnswers} variant="body1">Your result: {resultTest} correct answers.</Typography>
        <Grid className={classes.testResultButtons}>
          <Button
            className={classes.testResultButton}
            onClick={() => handlerClickCheck(true)}
          >
            Right answers
          </Button>
          <Button
            className={classes.testResultButton}
            onClick={() => handlerClickCheck(false)}
          >
            Wrong answers
          </Button>
        </Grid>
        <Grid>
          {isArrayWords === 1 &&
            rightAnswer.map((item) => <Typography variant="body1" key={item}>{item}</Typography>)}
          {isArrayWords === 2 &&
            wrongAnswer.map((item) => <Typography variant="body1" key={item}>{item}</Typography>)}
        </Grid>
      </Grid>
    </>
  );
};

export default EndTest;