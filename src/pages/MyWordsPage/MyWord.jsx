
import React, {useEffect, useState} from "react";
import {getWordByIdRequest} from "../../redux/api";
import {Word} from "../TextBookPage/Word";


export const MyWord = React.memo(({e}) => {
    const [word, setWord] = useState(null)

    useEffect(async ()=>{
        const data = await getWordByIdRequest(e.wordId)
       setWord(data.data)
    }, [])
    return(
        <div>
        {word && <Word e={word} userWord={e} my/>}
        </div>
    )
})
