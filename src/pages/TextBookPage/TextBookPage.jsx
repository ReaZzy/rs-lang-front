import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {AudioComponent} from "./audioComponent";
import {getAggregatedWords, setAggregatedWord} from "../../redux/words/thunks";
import {useDispatch, useSelector} from "react-redux";
import {Grid, Card, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles.module';

export const TextBookPage = React.memo(() => {
    const IMG_API = 'https://api-rslang.pet-projects.ru/'
    const classes = useStyles();
    let {module, page} = useParams();
    const isFetching = useSelector( state => state.words.wordsFetching )
    const dispatch = useDispatch()
    const aggregatedWords = useSelector( state => state.words.aggregatedWords )

    const token = useSelector( state => state.auth.userInfo?.token )
    const id = useSelector( state => state.auth.userInfo?.id || state.auth.userInfo?.userId )

    const handleSetWord = (word, type) => {
        dispatch( setAggregatedWord( id, word, type, token, page - 1, module - 1 ) )
    }

    useEffect( () => {
        dispatch( getAggregatedWords( page - 1, module - 1, id, token ) )
    }, [page, module] )

    return (
        <div>
            <Grid className={classes.TextBookPageHeading}>
                <Typography variant="h1">Раздел {module}</Typography>
                <Typography  variant="h3">Страница {page}</Typography>
            </Grid>
            <Grid className={classes.TextBookWordListWrapper}>
                <ul className={classes.TextBookWordList}>
                    {!isFetching
                        ?
                            aggregatedWords?.paginatedResults?.map( word => (
                                <li className={classes.TextBookWordItem} key={word._id} style={{border: word.userWord?.difficulty === "hard" && '1px #ff5f56 solid'}}>
                                    <Card className={classes.TextBookWordCard}>
                                       <Grid container className={classes.TextBookWordMedia}>
                                            <Grid className={classes.TextBookWordImageWrapper}>
                                                <img className={classes.TextBookWordImage} src={`${IMG_API+word.image}`} alt={""}/>
                                            </Grid>
                                            <Grid className={classes.TextBookWordResultWrapper}>
                                                <Grid  className={classes.TextBookWordResult}>
                                                    <Typography variant='h5' className={classes.TextBookWordRight}>Correct: {word.userWord?.optional?.correctTimes || '0'}</Typography>
                                                    <Typography variant='h5' className={classes.TextBookWordWrong}>Wrong: {word.userWord?.optional?.wrongTimes || '0'}</Typography>
                                                </Grid>
                                                <AudioComponent
                                                audio={word.audio}
                                                id={word._id}
                                                audioExample={word.audioExample}
                                                audioMeaning={word.audioMeaning}
                                                />
                                            </Grid>
                                       </Grid>
                                        <Grid className={classes.TextBookWordContent}>
                                            <Grid className={classes.TextBookWordHeding}>
                                                <h2 className={classes.TextBookWordMeaning} dangerouslySetInnerHTML={{__html:word.word}}/>
                                                <h3 className={classes.TextBookWordTranslation}dangerouslySetInnerHTML={{__html:word.wordTranslate}}/>
                                                <p dangerouslySetInnerHTML={{__html:word.transcription}}/>
                                            </Grid>
                                            <p className={classes.TextBookWordText} dangerouslySetInnerHTML={{__html:word.textMeaning}}/>
                                            <p className={classes.TextBookWordText} dangerouslySetInnerHTML={{__html:word.textMeaningTranslate}}/>
                                            <p className={classes.TextBookWordText} dangerouslySetInnerHTML={{__html:word.textExample}}/>
                                            <p className={classes.TextBookWordText} dangerouslySetInnerHTML={{__html:word.textExampleTranslate}}/>
                                        </Grid>
                                        <Grid className={classes.TextBookWordButtons}>
                                            {
                                                word.userWord?.difficulty === "hard"
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
                                        </Grid>
                                    </Card>
                                </li>
                            ) )

                        : <div>Loading...</div>
                    }
                </ul>
            </Grid>
        </div>
    )
})
