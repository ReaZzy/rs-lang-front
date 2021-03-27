import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {AudioComponent} from "./audioComponent";
import {deleteWord, getAggregatedWords, setAggregatedWord} from "../../redux/words/thunks";
import {useDispatch, useSelector} from "react-redux";

export const TextBookPage = React.memo(() => {
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
                            <h3>Correct {e.userWord?.optional?.correctTimes}</h3>
                            <h3>Wrong {e.userWord?.optional?.wrongTimes}</h3>
                            <b dangerouslySetInnerHTML={{__html:e.word}}/>
                            <b dangerouslySetInnerHTML={{__html:e.wordTranslate}}/>
                            <p dangerouslySetInnerHTML={{__html:e.transcription}}/>
                            <p dangerouslySetInnerHTML={{__html:e.textMeaning}}/>
                            <p dangerouslySetInnerHTML={{__html:e.textMeaningTranslate}}/>
                            <p dangerouslySetInnerHTML={{__html:e.textExample}}/>
                            <p dangerouslySetInnerHTML={{__html:e.textExampleTranslate}}/>

                            {
                                e.userWord?.difficulty === "hard"
                                    ? <button onClick={() => {
                                        handleSetWord( e, "learn" )
                                    }}>UNHARD</button>
                                    : <button onClick={() => {
                                        handleSetWord( e, "hard" )
                                    }}>HARD</button>
                            }

                            <button onClick={() => {
                                handleSetWord( e, "deleted" )
                            }}>DELETE
                            </button>
                        </div>
                    ) )

                : <div>Loading...</div>
            }
        </div>
    )
})
