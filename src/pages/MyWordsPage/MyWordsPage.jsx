import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getWords} from "../../redux/words/thunks";

const MyWordsPage = () => {
    const dispatch = useDispatch()
    const id = useSelector( state => state.auth.userInfo?.userId || state.auth.userInfo?.id)
    const token = useSelector( state => state.auth.userInfo?.token)
    const myWords = useSelector( state => state.words?.myWords)

    useEffect( ()=>{
        dispatch(getWords(id, token))
    }, [id]) //eslint-disable-line
    return(
        <pre >
            {JSON.stringify(myWords)}
        </pre>
    )
}
export default MyWordsPage