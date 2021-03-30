import {AudioComponent} from "./audioComponent";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAggregatedWord} from "../../redux/words/thunks";
import {useParams} from "react-router-dom";


export const Word = React.memo( ({e, userWord, my}) => {
    let {module, page} = useParams();
    const token = useSelector( state => state.auth.userInfo?.token )
    const id = useSelector( state => state.auth.userInfo?.id || state.auth.userInfo?.userId )
    const dispatch = useDispatch()

    const handleSetWord = (word, type) => {
        dispatch( setAggregatedWord( id, word, type, token, page - 1, module - 1 ) )
    }
    return (
        <div key={e._id ? e._id : e.id}
             style={{backgroundColor: e.userWord?.difficulty === "hard" && "red" ||userWord?.difficulty === "hard" && "red"}}>
            <img src={`https://api-rslang.pet-projects.ru/${e.image}`} alt={""}/>
            <AudioComponent
                audio={e.audio}
                id={e._id ? e._id : e.id}
                audioExample={e.audioExample}
                audioMeaning={e.audioMeaning}
            />
            { e.userWord?.difficulty}
            {userWord?.difficulty}
            <h3>Correct {my? userWord?.optional?.correctTimes :e.userWord?.optional?.correctTimes }</h3>
            <h3>Wrong {my? userWord?.optional?.wrongTimes :e.userWord?.optional?.wrongTimes}</h3>
            <b dangerouslySetInnerHTML={{__html: e.word}}/>
            <b dangerouslySetInnerHTML={{__html: e.wordTranslate}}/>
            <p dangerouslySetInnerHTML={{__html: e.transcription}}/>
            <p dangerouslySetInnerHTML={{__html: e.textMeaning}}/>
            <p dangerouslySetInnerHTML={{__html: e.textMeaningTranslate}}/>
            <p dangerouslySetInnerHTML={{__html: e.textExample}}/>
            <p dangerouslySetInnerHTML={{__html: e.textExampleTranslate}}/>
            {!my && <>
                { e?.userWord?.difficulty === "hard" || userWord?.difficulty === "hard"
                ? <button onClick={() => {
                handleSetWord( e, "learn" )
            }}>UNHARD</button>
                : <button onClick={() => {
                handleSetWord( e, "hard" )
            }}>HARD</button>}
                <button onClick={() => {
                    handleSetWord( e, "deleted" )
                }}>DELETE
                </button>
            </>
            }

        </div>
    )
} )
