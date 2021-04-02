import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardActions } from "@material-ui/core";
// import "./style.scss";

const EndTest = ({
  rightAnswer,
  wrongAnswer,
  resultTest,
  setLevel,
  level,
  setUserLevel,
}) => {
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

      setUserLevel("Beginner");
    } else if (resultTest >= 4 && resultTest < 6) {
      setLevel(1);

      setUserLevel("Elementary");
    } else if (resultTest >= 6 && resultTest < 9) {
      setLevel(2);

      setUserLevel("Pre-Intermediate");
    } else if (resultTest >= 9 && resultTest < 12) {
      setLevel(3);

      setUserLevel("Intermediate");
    } else if (resultTest >= 12 && resultTest < 14) {
      setLevel(4);

      setUserLevel("Upper Intermediate");
    } else if (resultTest >= 14) {
      setLevel(5);

      setUserLevel("Advanced");
    }
  }, [resultTest, setLevel, setUserLevel]);
  return (
    <>
      <Card className="text-center cards-test">
        <CardActions className="header-gameover-sprint">
          Cool result
        </CardActions>
        <Card className="card-body-test-color">
          <Card>Your level {level} </Card>
          <Card>I like you</Card>

          <Button
            className="home-button"
            onClick={() => handleOnClick("home")}
          >
            Home
          </Button>
        </Card>
      </Card>

      <div className="result-buttons">
        <Button
          className="button-sprint"
          onClick={() => handlerClickCheck(true)}
        >
          right answers
        </Button>
        <Button
          className="button-sprint"
          onClick={() => handlerClickCheck(false)}
        >
          wrong answers
        </Button>
      </div>
      <div>
        {isArrayWords === 1 &&
          rightAnswer.map((item) => (
            <div key={item}>{item}</div>
          ))}
        {isArrayWords === 2 &&
          wrongAnswer.map((item) => (
            <div key={item}>{item}</div>
          ))}
      </div>
    </>
  );
};

export default EndTest;
