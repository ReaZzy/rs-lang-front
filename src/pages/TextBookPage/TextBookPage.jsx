import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getAggregatedWords} from "../../redux/words/thunks";
import {useDispatch, useSelector} from "react-redux";
import {Word} from "./Word";

export const TextBookPage = React.memo(() => {
    let {module, page} = useParams();
    const isFetching = useSelector( state => state.words.wordsFetching )
    const dispatch = useDispatch()
    const aggregatedWords = useSelector( state => state.words.aggregatedWords )

    const token = useSelector( state => state.auth.userInfo?.token )
    const id = useSelector( state => state.auth.userInfo?.id || state.auth.userInfo?.userId )

    useEffect( () => {
        dispatch( getAggregatedWords( page - 1, module - 1, id, token ) )
    }, [page, module] )

    return (
        <div>
            <h1>Раздел {module}</h1>
            <h2> Страница {page}</h2>
            {!isFetching
                ?
                    aggregatedWords?.paginatedResults?.map( e => <Word e={e}/> )

                : <div>Loading...</div>
            }
        </div>
    )
})
