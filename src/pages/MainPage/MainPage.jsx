import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styles from "./styles.module.css";


const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fff",
    width: "100%",
    height: "300px",
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.light,
  },
  media: {
    height: 300,
  },
}));

export const MainPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <section className={styles.Mainpage__section} >
        {/* <img src={Picture}></img> */}

      </section>
      <Container maxWidth="lg">
        <Grid container xs={12} spacing={1} className={styles.gridContainer} >
          <Grid container justify="space-between" className={styles.gridContainer} alignContent="space-between" alignItems="center" item xs={12} spacing={5}>
            <Grid item xs >
              <Paper elevation={3} className={classes.paper}/>
            </Grid>
            <Grid item xs >
            <Paper elevation={3} className={classes.paper}/>
          </Grid>
          </Grid>
          <Grid item xs={12} spacing={0}>
            <Paper elevation={3} className={classes.paper}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}