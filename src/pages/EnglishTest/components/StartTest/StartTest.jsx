import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles.module';

const StartTest = ({ setStartTest, userLevel }) => {
  const classes = useStyles();

  const handleClickStart = useCallback(() => {
    setStartTest(true);
  }, [setStartTest]);

  const history = useHistory();
  const handleOnClick = (path) => {
    history.push(`/${path}`);
  };

  return (
    <Grid>
      {!userLevel && (
        <Grid  className={classes.testStartingPage}>
          <Typography variant="h2" className={classes.testStartingPageHeading}>
            Test
          </Typography>
          <Typography  variant="body1" className={classes.testStartingPageText}>
            This test will determine your approximate level of English.
          </Typography>
          <Button
            className={classes.testStartingPageButton}
            onClick={handleClickStart}
          >
            START TEST
          </Button>
        </Grid>
      )}

      {userLevel && (
        <>
          <Grid  className={classes.testStartingPage}>
            <Typography variant="h2">Your level: {userLevel} </Typography>
            <Button
              className={classes.testStartingPageButton}
              onClick={() => handleOnClick("home")}
            >
              Home
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default StartTest;
