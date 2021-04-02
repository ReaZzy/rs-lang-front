import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Fade, Container } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import MainPicture from '../../assets/img/11070-removebg.png';
import DictionaryPhoto from '../../assets/img/pencil.svg';
import ProgressPhoto from '../../assets/img/growth.svg';
import GamesPhoto from '../../assets/img/brain.svg';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles.module';

export const MainPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={1} className={classes.gridContainer} >
          <Grid container className={classes.mainPageHeroSection}>
            <Grid  className={classes.mainPageTitleWrapper}>
              <Fade in={true} timeout={700}>
                <Grid item className={classes.mainPageTitle}>
                  <Card elevation={3}> 
                    <Typography className={classes.mainPageHeading} variant="h2" gutterBottom>Достигайте лучших возможных результатов в изучении английких слов вместе с RSLang</Typography>
                  </Card>
                </Grid>
              </Fade>
            </Grid>
            <Grid item xs={6} className={classes.pageMainPicture}>
                <Card elevation={3} className={classes.mainPagePhotoContainer}>
                  <img className={classes.mainPagePhoto} alt="main" src={MainPicture}></img>
                </Card>
              </Grid>
          </Grid>
          <Grid className={classes.mainPageDescriptionContainer} item xs={6}>
            <Paper elevation={3} className={classes.mainPageDescription}> 
              <Typography className={classes.mainPageText} variant="body1" gutterBottom>В электронном учебнике RSLang вы найдете шесть модулей по разным словам. Изучайте слово и добавляйте его в свой словарь. Можно добавить слово в список сложных слов и вернуться к нему позднее. Также на странице со списком слов Вы найдете мини-игры, после окончания игры можно посмотреть правильные и неправильные ответы. В списке слов отобразится количество правильных ответов по каждому слову.</Typography>
            </Paper>
          </Grid>
          <Grid className={classes.benefitsCardContainer} item xs={6}>
            <Card className={classes.benefitsCard} id={"block"}>
              <CardMedia
                component="img"
                alt={"dictionary"}
                className={classes.benefitsPhoto}
                image={DictionaryPhoto}
              />
              <CardContent className={classes.benefitsCardContent}>
                <Typography className={classes.benefitsCardText}>Удобное заучивание слов, слова автоматически добавляются в словарь или в список выученных слов.</Typography>
              </CardContent>
            </Card>
            <Card className={classes.benefitsCard} id={"block"}>
              <CardMedia
                component="img"
                alt={"progress"}
                className={classes.benefitsPhoto}
                image={ProgressPhoto}
              />
              <CardContent>
                <Typography className={classes.benefitsCardText}>Возможность отслеживать свой прогресс мотивирует продолжать заниматься.</Typography>
              </CardContent>
            </Card>
            <Card className={classes.benefitsCard} id={"block"}>
                <CardMedia
                    component="img"
                    alt={"progress"}
                    className={classes.benefitsPhoto}
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