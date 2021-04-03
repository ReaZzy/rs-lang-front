
import React, {useEffect, useState} from "react";
import {getWordByIdRequest} from "../../redux/api";
import {Word} from "../TextBookPage/Word";
import { Container } from "@material-ui/core";


export const MyWord = React.memo(({e}) => {
    const [word, setWord] = useState(null)

    useEffect( ()=>{
        const getData = async () => {
            const data = await getWordByIdRequest(e.wordId)
            setWord(data.data)
        }
       getData()
    }, [e.wordId])

    return(

        <Container  maxWidth="md">
            {word && <Word word={word} userWord={e} my key={e._id}/>}
        </Container>
    )
})
