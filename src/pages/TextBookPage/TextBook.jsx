import React, {useEffect} from 'react';
import ModulePage from '../ModulePage'
import {Switch, Route, Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAggregatedWords, getWords, setAggregatedWord} from "../../redux/words/thunks";
import {AudioComponent} from "./audioComponent";

export const TextBook = () => {
    const dispatch = useDispatch()
    const {page, module} = useParams()
    const aggregatedWords = useSelector( state => state.words.aggregatedWords )
    const token = useSelector( state => state.auth.userInfo?.token)
    const id = useSelector( state => state.auth.userInfo?.id || state.auth.userInfo?.userId)

    const handleSetWord = (wordId, type) => {
        dispatch(setAggregatedWord(id,wordId,type,token))
    }

    const moduleNumbers = [0, 1, 2, 3, 4, 5]

    useEffect( () => {
        dispatch( getWords( page ? page : 0, module ? module : 0 ) )
        dispatch( getAggregatedWords(page ? page : 0, module ? module : 0, id, token) )
    }, [page, module] )

    return (
        <div>
            <h1>Страница учебника</h1>
            {moduleNumbers.map( module => module <= moduleNumbers.length
                ?
                <Link key={module} to={`/textbook/${module}`}>Раздел {module}</Link>
                :
                null )}

            <Switch>
                {moduleNumbers.map( module => module <= moduleNumbers.length
                    ?
                    <Route key={module} path={`/textbook/${module}`}><ModulePage moduleNumber={module}/></Route>
                    : null
                )}
            </Switch>
            {aggregatedWords.paginatedResults.map( e => (
                e.userWord?.difficulty !== "deleted" &&
               <div key={e._id} style={{backgroundColor: e.userWord?.difficulty === "hard" && "red"}}>
                    <img src={`https://api-rslang.pet-projects.ru/${e.image}`} alt={""}/>
                    <AudioComponent
                        audio={e.audio}
                        id={e.id}
                        audioExample={e.audioExample}
                        audioMeaning={e.audioMeaning}
                    />

                    <b>{e.word}</b>
                    <b> {e.wordTranslate}</b>
                    {e.transcription}
                    <p>{e.textMeaning}</p>
                    <p>{e.textMeaningTranslate}</p>
                    <p>{e.textExample}</p>
                    <p>{e.textExampleTranslate}</p>

                    <button onClick={()=>{handleSetWord(e._id, "hard")}}>HARD</button>
                    <button onClick={()=>{handleSetWord(e._id, "deleted")}}>DELETE</button>
                </div>
            ) )}
        </div>
    )
}

