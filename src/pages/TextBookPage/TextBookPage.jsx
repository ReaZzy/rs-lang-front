import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {AudioComponent} from "./audioComponent";
import {deleteWord, getAggregatedWords, setAggregatedWord} from "../../redux/words/thunks";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

export const TextBookPage = React.memo(() => {
    let {module, page} = useParams();
    const isFetching = useSelector( state => state.words.wordsFetching )
    const dispatch = useDispatch()
    const aggregatedWords = useSelector( state => state.words.aggregatedWords )
    const correctWords = useSelector( state => state.words.correct )
    const wrongWords = useSelector( state => state.words.wrong )
    const token = useSelector( state => state.auth.userInfo?.token )
    const id = useSelector( state => state.auth.userInfo?.id || state.auth.userInfo?.userId )

    const handleSetWord = (wordId, type) => {
        dispatch( setAggregatedWord( id, wordId, type, token, page - 1, module - 1 ) )
    }


    useEffect( () => {
        dispatch( getAggregatedWords( page - 1, module - 1, id, token ) )
    }, [page, module] )

    return (
        <div>
            <h1>Раздел {module}</h1>
            <h2> Страница {page}</h2>
            {!isFetching
                ?
                    aggregatedWords?.paginatedResults?.map( e => (
                        
                        <div key={e._id} style={{backgroundColor: e.userWord?.difficulty === "hard" && "red"}}>
                            <img src={`https://api-rslang.pet-projects.ru/${e.image}`} alt={""}/>
                            <AudioComponent
                                audio={e.audio}
                                id={e._id}
                                audioExample={e.audioExample}
                                audioMeaning={e.audioMeaning}
                            />
                            <h3> {correctWords?.find(f=> f.id === e._id)?.correctTimes
                                ? `Correct times ${correctWords?.find(f=> f.id === e._id)?.correctTimes}`
                                : ``
                            }</h3>
                            <h3> {wrongWords?.find(f=> f.id === e._id)?.wrongTimes
                                ? `Wrong times ${wrongWords?.find(f=> f.id === e._id)?.wrongTimes}`
                                : ``
                            }</h3>
                            <b>{e.word}</b>
                            <b> {e.wordTranslate}</b>
                            {e.transcription}
                            <p>{e.textMeaning}</p>
                            <p>{e.textMeaningTranslate}</p>
                            <p>{e.textExample}</p>
                            <p>{e.textExampleTranslate}</p>

                            {
                                e.userWord?.difficulty === "hard"
                                    ? <button onClick={() => {
                                        dispatch( deleteWord( id, e._id, token ) )
                                    }}>UNHARD</button>
                                    : <button onClick={() => {
                                        handleSetWord( e._id, "hard" )
                                    }}>HARD</button>
                            }

                            <button onClick={() => {
                                handleSetWord( e._id, "deleted" )
                            }}>DELETE
                            </button>
                            {console.log(e.textMeaning)}
                        </div>
                        
                    ) )

                : <div>Loading...</div>
            }
        </div>
    )
})
