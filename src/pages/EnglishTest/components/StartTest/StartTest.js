import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "@material-ui/core";
// import "./style.scss";

const StartTest = ({ setStartTest, userLevel }) => {
  const handleClickStart = useCallback(() => {
    setStartTest(true);
  }, [setStartTest]);
  const history = useHistory();
  const handleOnClick = (path) => {
    history.push(`/${path}`);
  };
  return (
    <Card className="text-center cards-test">
      {!userLevel && (
        <>
          <Card className="header-card-test">Test</Card>
          <Card className="card-body-test-color">
            <Card>
              This test will determine your approximate level of English
            </Card>
            <Card>Choose the correct answer</Card>
            <Button
              variant="outline-primary"
              className="start-button"
              onClick={handleClickStart}
            >
              START TEST
            </Button>
          </Card>
        </>
      )}

      {userLevel && (
        <>
          <Card className="header-gameover-sprint">
            Cool result
          </Card>
          <Card>
            <Card>Your level: {userLevel} </Card>
            <Card>I like you</Card>

            <Button
              variant="outline-primary"
              className="home-button"
              onClick={() => handleOnClick("home")}
            >
              Home
            </Button>
          </Card>
        </>
      )}
    </Card>
  );
};
export default StartTest;
