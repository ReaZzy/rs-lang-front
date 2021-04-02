import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getAggregatedWords} from "../../redux/words/thunks";
import {useDispatch, useSelector} from "react-redux";
import {useStyles} from "./styles.module";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Word} from "./Word";

export const TextBookPage = React.memo(() => {
    const classes = useStyles();
    let {module, page} = useParams();
    const isFetching = useSelector( state => state.words.wordsFetching )
    const dispatch = useDispatch()
    const aggregatedWords = useSelector( state => state.words.aggregatedWords )

    const token = useSelector( state => state.auth?.userInfo?.token )
    const id = useSelector( state => state.auth?.userInfo?.id || state.auth?.userInfo?.userId )

    useEffect( () => {
        dispatch( getAggregatedWords( page - 1, module - 1, id, token ) )
    }, [page, module] ) //eslint-disable-line

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
                                <Word id={"word"} word={word} key={word._id}/>
                            ))
                        : <div>Loading...</div>
                    }
                </ul>
            </Grid>
        </div>
    )
})
