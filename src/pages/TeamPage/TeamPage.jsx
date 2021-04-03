import React from "react";
import { Container, Grid, Card, CardMedia  } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles.module'
import memberPhoto2 from '../../assets/img/Anastasia.jpg'
import memberPhoto1 from '../../assets/img/Ilya.jpg'
import memberPhoto3 from '../../assets/img/Kostya.jpg'
import memberPhoto4 from '../../assets/img/Max.jpg'

const TeamPage = () => {
    const classes = useStyles();
    
    return(
        <>
            <Container maxWidth='md'  className={classes.container}>
                <Grid container>
                    <Grid xs="12" className={classes.teamHeading}>
                        <Typography className={classes.teamTitle} variant="h2">О команде</Typography>
                    </Grid>
                    <Grid xs="12" className={classes.teamMembers}>
                        <Grid xs="12" md='5' className={classes.teamMember}>
                            <Card className={classes.teamMemberCard}>
                                <Grid className={classes.teamMemberPhotoWrapper}>
                                    <CardMedia
                                    className={classes.teamMemberPhoto}
                                    image={memberPhoto1}
                                    title="team-member"
                                    />
                                </Grid>
                                <Typography className={classes.teamMemberName} variant="h4">Илья Нестерович</Typography>
                                <Typography className={classes.teamMemberPosition} variant="h5">Full-stack Developer</Typography>
                                <Typography className={classes.teamMemberContribution} variant="body1">Вклад в проект: настройка сервера, навигация по страницам учебника, router.</Typography>
                            </Card>
                        </Grid>
                        <Grid xs="12" md='5' className={classes.teamMember}>
                            <Card className={classes.teamMemberCard}>
                                <Grid className={classes.teamMemberPhotoWrapper}>
                                    <CardMedia
                                    className={classes.teamMemberPhoto}
                                    image={memberPhoto3}
                                    title="team-member"
                                    />
                                </Grid>
                                <Typography className={classes.teamMemberName} variant="h4">Константин Якимович</Typography>
                                <Typography className={classes.teamMemberPosition} variant="h5">Frontend Developer</Typography>
                                <Typography className={classes.teamMemberContribution} variant="body1">Вклад в проект: мини-игры "Savannah", "Audio Challenge", "Sprint", "MemoryGame", тест на определение уровня английского.</Typography>
                            </Card>
                        </Grid>
                        <Grid xs="12" md='5' className={classes.teamMember}>
                            <Card className={classes.teamMemberCard}>
                                <Grid className={classes.teamMemberPhotoWrapper}>
                                    <CardMedia
                                    className={classes.teamMemberPhoto}
                                    image={memberPhoto4}
                                    title="team-member"
                                    />
                                </Grid>
                                <Typography className={classes.teamMemberName} variant="h4">Максим Небела</Typography>
                                <Typography className={classes.teamMemberPosition} variant="h5">Frontend Developer</Typography>
                                <Typography className={classes.teamMemberContribution} variant="body1">Вклад в проект: Redux, вывод слов на страницу учебника, авторизация, тесты, словарь.</Typography>
                            </Card>
                        </Grid>
                        <Grid xs="12" md='5' className={classes.teamMember}>
                            <Card className={classes.teamMemberCard}>
                                <Grid className={classes.teamMemberPhotoWrapper}>
                                    <CardMedia
                                    className={classes.teamMemberPhoto}
                                    image={memberPhoto2}
                                    title="team-member"
                                    />
                                </Grid>
                                <Typography className={classes.teamMemberName} variant="h4">Анастасия Бурдина</Typography>
                                <Typography className={classes.teamMemberPosition} variant="h5">Frontend Developer</Typography>
                                <Typography className={classes.teamMemberContribution} variant="body1">Вклад в проект: верстка сайта, material UI, настройки, словарь, router.</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default TeamPage