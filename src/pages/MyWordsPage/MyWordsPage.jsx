import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMyWords} from "../../redux/words/thunks";
import {MyWord} from "./MyWord";

const MyWordsPage = () => {
    const dispatch = useDispatch()
    const id = useSelector( state => state.auth.userInfo?.userId || state.auth.userInfo?.id)
    const token = useSelector( state => state.auth.userInfo?.token)
    const myWords = useSelector( state => state.words?.myWords)

    useEffect( ()=>{
        dispatch(getMyWords(id, token))
    }, [id]) //eslint-disable-line
    return(
        <pre >
            {myWords?.map(e=><MyWord e={e}/>)}
        </pre>
    )
}
export default MyWordsPage