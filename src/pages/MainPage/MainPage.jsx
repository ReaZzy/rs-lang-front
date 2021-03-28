import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Fade } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import MainPicture from '../../assets/img/11070-removebg.png';
import DictionaryPhoto from '../../assets/img/pencil.svg';
import ProgressPhoto from '../../assets/img/growth.svg';
import GamesPhoto from '../../assets/img/brain.svg';
import styles from "./styles.module.css";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({}));

export const MainPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={1} className={styles.gridContainer} >
          <Grid container justify="space-between" className={styles.mainPageHeroSection} alignContent="space-between" alignItems="center"  spacing={7}>
            <Fade in={true} timeout={700}>
              <Grid item xs={6} className={classes.mainPageTitle}>
                <Card elevation={3}> 
                  <Typography className={styles.mainPageHeading} variant="h2" gutterBottom>Достигайте лучших возможных результатов в изучении английких слов вместе с RSLang</Typography>
                </Card>
              </Grid>
            </Fade>
            <Grid item xs={6} className={classes.pageMainPicture}>
                <Card elevation={3} className={styles.mainPagePhotoContainer}>
                  <img className={styles.mainPagePhoto} alt="main" src={MainPicture}></img>
                </Card>
              </Grid>
          </Grid>
          <Grid className={styles.mainPageVideoContainer} item xs={6}>
            <Paper elevation={3} className={styles.mainPageVideo}> 
              Video
            </Paper>
          </Grid>
          <Grid className={styles.benefitsCardContainer} item xs={6}>
            <Card className={styles.benefitsCard}>
              <CardMedia
                component="img"
                alt={"dictionary"}
                className={styles.benefitsPhoto}
                image={DictionaryPhoto}
              />
              <CardContent className={classes.benefitsCardContent}>
                <Typography className={classes.benefitsCardText}>Удобное заучивание слов, слова автоматически добавляются в словарь или в список выученных слов.</Typography>
              </CardContent>
            </Card>
            <Card className={styles.benefitsCard}>
              <CardMedia
                component="img"
                alt={"progress"}
                className={styles.benefitsPhoto}
                image={ProgressPhoto}
              />
              <CardContent>
                <Typography className={classes.benefitsCardText}>Возможность отслеживать свой прогресс мотивирует продолжать заниматься.</Typography>
              </CardContent>
            </Card>
            <Card className={styles.benefitsCard}>
                <CardMedia
                    component="img"
                    alt={"progress"}
                    className={styles.benefitsPhoto}
                    image={GamesPhoto}
                />
                <CardContent>
                  <Typography className={classes.benefitsCardText}>Интересные игры для лучшего запоминания слов.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
  )
}