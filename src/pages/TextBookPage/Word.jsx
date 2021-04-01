import {AudioComponent} from "./audioComponent";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAggregatedWord} from "../../redux/words/thunks";
import {useParams} from "react-router-dom";
import {useStyles} from "./styles.module";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


export const Word = React.memo( ({word, userWord, my}) => {
    const IMG_API = 'https://api-rslang.pet-projects.ru/'
    const classes = useStyles();
    let {module, page} = useParams();
    const token = useSelector( state => state.auth.userInfo?.token )
    const id = useSelector( state => state.auth.userInfo?.id || state.auth.userInfo?.userId )
    const dispatch = useDispatch()


    const handleSetWord = (word, type) => {
        dispatch( setAggregatedWord( id, word, type, token, page - 1, module - 1 ) )
    }
    return (
        <li id={"word"} className={`classes.TextBookWordItem ${word.userWord?.difficulty === "hard" || userWord?.difficulty === "hard" ? "hard" : ""}`} key={word._id ? word._id : word.id}>
            <Card className={classes.TextBookWordCard}>
                <Grid container className={classes.TextBookWordMedia}>
                    <Grid className={classes.TextBookWordImageWrapper}>
                        <img className={classes.TextBookWordImage} src={`${IMG_API + word.image}`} alt={""}/>
                    </Grid>
                    <Grid className={classes.TextBookWordResultWrapper}>
                        <Grid className={classes.TextBookWordResult}>
                            <Typography variant='h5'
                                        className={classes.TextBookWordRight}>Correct: {my ? userWord?.optional?.correctTimes || 0 : word.userWord?.optional?.correctTimes  || 0}</Typography>
                            <Typography variant='h5'
                                        className={classes.TextBookWordWrong}>Wrong: {my ? userWord?.optional?.wrongTimes || 0 : word.userWord?.optional?.wrongTimes || 0}</Typography>
                        </Grid>
                        <AudioComponent
                            audio={word.audio}
                            id={word._id ? word._id : word.id}
                            audioExample={word.audioExample}
                            audioMeaning={word.audioMeaning}
                        />
                    </Grid>
                </Grid>
                <Grid className={classes.TextBookWordContent}>
                    <Grid className={classes.TextBookWordHeding}>
                        <h2 className={classes.TextBookWordMeaning} dangerouslySetInnerHTML={{__html: word.word}}/>
                        <h3 className={classes.TextBookWordTranslation}
                            dangerouslySetInnerHTML={{__html: word.wordTranslate}}/>
                        <p dangerouslySetInnerHTML={{__html: word.transcription}}/>
                    </Grid>
                    <p className={classes.TextBookWordText} dangerouslySetInnerHTML={{__html: word.textMeaning}}/>
                    <p className={classes.TextBookWordText}
                       dangerouslySetInnerHTML={{__html: word.textMeaningTranslate}}/>
                    <p className={classes.TextBookWordText} dangerouslySetInnerHTML={{__html: word.textExample}}/>
                    <p className={classes.TextBookWordText}
                       dangerouslySetInnerHTML={{__html: word.textExampleTranslate}}/>
                </Grid>
                {!my && <Grid className={classes.TextBookWordButtons}>
                    {
                        word.userWord?.difficulty === "hard" || userWord?.difficulty === "hard"
                            ? <Button
                                className={classes.TextBookWordButton}
                                onClick={() => {
                                    handleSetWord( word, "learn" )
                                }}>UNHARD</Button>
                            : <Button
                                className={classes.TextBookWordButton}
                                onClick={() => {
                                    handleSetWord( word, "hard" )
                                }}>HARD</Button>

                    }

                    <Button
                        className={classes.TextBookWordButton}
                        onClick={() => {
                            handleSetWord( word, "deleted" )
                        }}>DELETE
                    </Button>
                </Grid>}
            </Card>
        </li>
    )
} )
