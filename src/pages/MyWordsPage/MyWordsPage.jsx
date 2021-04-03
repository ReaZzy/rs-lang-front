import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMyWords} from "../../redux/words/thunks";
import {MyWord} from "./MyWord";
import Button from "@material-ui/core/Button";
import {useHistory, useParams} from "react-router-dom"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import classes from "*.module.css";
import { useStyles } from './styles.module';
import Typography from '@material-ui/core/Typography';

const MyWordsPage = () => {
    const classes = useStyles();
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
        <div style={{width:"70%", margin:"0 auto"}}>
            {myWords[currentPage * 10 ] ? <div className={classes.container}>
                    <div className={classes.dictionaryHeaderWrapper}>
                        <Typography variant="h2" className={classes.dictionaryHeader}>
                            Словарь
                        </Typography>
                    </div>
                    {currentPage > 0 && <Button style={{width: "50%", marginTop: "10px"}} onClick={handleBack}>
                                            <KeyboardArrowLeftIcon/>
                                        </Button>}
                    {myWords[currentPage * 10 + 10] && <Button style={{width: "50%", marginTop: "10px"}} onClick={handleClick}>
                                                                <KeyboardArrowRightIcon/>
                                                        </Button>}
                    <div className={classes.dictionaryHeaderWrapper}>
                        <Typography variant="h4" className={classes.dictionaryLearnTitle}>
                            Изучаемые слова
                        </Typography>
                    </div>
                    <div className={classes.dictionaryLearnWords}>
                        {myWords
                        .slice( currentPage * 10, (currentPage * 10) + 10 )
                        .map( word => {
                            if(word.difficulty === "learn") {
                                return <MyWord e={word} key={word.id}/> 
                            }
                        })}
                    </div>
                    <div className={classes.dictionaryHeaderWrapper}>
                        <Typography variant="h4" className={classes.dictionaryLearn}>
                            Сложные слова
                        </Typography>
                    </div>
                    <div className={classes.dictionaryLearnWords}>
                        {myWords
                        .slice( currentPage * 10, (currentPage * 10) + 10 )
                        .map( word => {
                            if(word.difficulty === "hard") {
                                return <MyWord e={word} key={word.id}/> 
                            }
                        })}
                    </div>
                    <div className={classes.dictionaryHeaderWrapper}>
                        <Typography variant="h4" className={classes.dictionaryLearn}>
                            Удаленные слова
                        </Typography>
                    </div>
                    <div className={classes.dictionaryLearnWords}>
                        {myWords
                        .slice( currentPage * 10, (currentPage * 10) + 10 )
                        .map( word => {
                            if(word.difficulty === "deleted") {
                                return <MyWord e={word} key={word.id}/> 
                            }
                        })}
                    </div>
                    {currentPage > 0 && <Button style={{width: "50%", marginTop: "10px"}} onClick={handleBack}>
                                                <KeyboardArrowLeftIcon/>
                                        </Button>}
                    {myWords[currentPage * 10 + 10] && <Button style={{width: "50%", marginTop: "10px"}} onClick={handleClick}>
                                                            <KeyboardArrowRightIcon/>
                                                        </Button>}
                </div>
                :<h3>Empty</h3>
            }
        </div>
    )
}
export default MyWordsPage