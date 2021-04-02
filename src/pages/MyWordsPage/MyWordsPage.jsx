import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMyWords} from "../../redux/words/thunks";
import {MyWord} from "./MyWord";
import Button from "@material-ui/core/Button";
import {useHistory, useParams} from "react-router-dom"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';


const MyWordsPage = () => {
    const {page} = useParams()
    const [currentPage, setCurrentPage] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch()
    const id = useSelector( state => state.auth.userInfo?.userId || state.auth.userInfo?.id)
    const token = useSelector( state => state.auth.userInfo?.token)
    const myWords = useSelector( state => state.words?.myWords)
    const handleClick = () => {
        setCurrentPage(prevState => prevState+1)
        history.push(`${currentPage+1}`)
    }
    const handleBack = () => {
        setCurrentPage(prevState => prevState-1)
        history.push(`${currentPage-1}`)
    }
    useEffect(()=>{setCurrentPage(+page||0)},[page])
    useEffect( ()=>{
        dispatch(getMyWords(id, token))
    }, [id]) //eslint-disable-line
    return(
        <div style={{width:"80%", margin:"0 auto"}}>
            {myWords[currentPage * 10 ] ? <div>
                    {currentPage > 0 && <Button style={{width: "100%", marginTop: "10px"}}
                                                onClick={handleBack}><KeyboardArrowLeftIcon/></Button>}
                    {myWords[currentPage * 10 + 10] && <Button style={{width: "100%", marginTop: "10px"}}
                                                               onClick={handleClick}><KeyboardArrowRightIcon/></Button>}
                    {myWords?.slice( currentPage * 10, (currentPage * 10) + 10 )?.map( e => <MyWord e={e} key={e.id}/> )}
                    {currentPage > 0 && <Button style={{width: "100%", marginTop: "10px"}}
                                                onClick={handleBack}><KeyboardArrowLeftIcon/></Button>}
                    {myWords[currentPage * 10 + 10] && <Button style={{width: "100%", marginTop: "10px"}}
                                                               onClick={handleClick}><KeyboardArrowRightIcon/></Button>}
                </div>
                :<h3>Empty</h3>
            }
        </div>
    )
}
export default MyWordsPage