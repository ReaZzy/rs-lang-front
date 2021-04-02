import React from "react";
import {render} from '@testing-library/react'
import configureStore from "redux-mock-store"

import words from "./redux/words";
import {TextBookMain} from "./pages/TextBookMain/TextBookMain";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {Word} from "./pages/TextBookPage/Word";
import settings from "./redux/settings";
import {Header} from "./views/Header/Header";
import {MainPage} from "./pages/MainPage/MainPage";

let initialState, settingsState, reduxStore
const storeMock = configureStore( [thunk] )

beforeEach(()=>{
    reduxStore = storeMock( {words: {...initialState}, settings:{...settingsState}, auth:{userInfo:{token:123}}} )
})

describe( "Words reducer", () => {
    beforeEach( () => {
        initialState = {
            words: null,
            myWords: null,
            aggregatedWords: {
                paginatedResults: [
                    {_id: 123}, {_id: 1}, {_id: 2}, {_id: 13}, {_id: 23}, {_id: 1233}, {_id: 1123}, {_id: 14523}, {_id: 1623}, {_id: 1823}
                ], totalCount: 1
            },
            wordsFetching: false,
        }
    } )

    it( "should set words", () => {
        const action = {type: "words/SET_WORDS", payload: [{}, {}, {}]}
        const newState = words( initialState, action )
        expect( newState.words ).toHaveLength( 3 )
    } )

    it( "should edit word", () => {
        const action = {
            type: "words/EDIT_AGGREGATED_WORDS",
            payload: {id: 123, type: "hard", correctTimes: 1, wrongTimes: 0}
        }
        const newState = words( initialState, action )
        expect( newState.aggregatedWords.paginatedResults[0] )
            .toEqual( {_id: 123, userWord: {difficulty: "hard", optional: {correctTimes: 1, wrongTimes: 0}}} )
        expect( newState.aggregatedWords.paginatedResults[1] )
            .toEqual( {_id: 1} )
    } )
} )

describe( "Textbook", () => {
    let word
    beforeEach( () => {
        settingsState= {checkedWordTranslate: true}

        word = {
            audio: "files/30_1191.mp3",
            audioExample: "files/30_1191_example.mp3",
            audioMeaning: "files/30_1191_meaning.mp3",
            group: 1,
            image: "files/30_1191.jpg",
            page: 29,
            textExample: "The kangaroo quickly <b>hopped</b> away from danger.",
            textExampleTranslate: "Кенгуру быстро отскочил от опасности",
            textMeaning: "To <i>hop</i> means to jump a short distance.",
            textMeaningTranslate: "Прыгать - значит прыгать на короткое расстояние",
            transcription: "[hɔp]",
            word: "hop",
            wordTranslate: "хоп",
            userWord:{
                difficulty: "hard",
                optional: {
                    correctTimes:0,
                    wrongTimes:0
                }
            },
            _id: "5e9f5ee35eb9e72bc21af946"
        }
    } )

    it("should render 6 modules", () => {
        const {container} = render( <BrowserRouter><TextBookMain/></BrowserRouter> )
        expect( container.querySelectorAll( "#module" ) ).toHaveLength( 6 )
    } )

    it("should render word", ()=>{
        const {container} = render( <BrowserRouter><Provider store={reduxStore}><Word word={word}/></Provider></BrowserRouter> )
        expect(container.querySelectorAll("#word")).toHaveLength(1)
    })

    it("should be red if word is hard", ()=>{
        const {container} = render( <BrowserRouter><Provider store={reduxStore}><Word word={word}/></Provider></BrowserRouter> )
        expect(container.querySelectorAll("#word")[0]).toHaveClass("hard")
    })
    it("should change settings",()=>{
        const action = {type:"settings/SET_SETTINGS", payload:{checkedWordTranslate: false}}
        const newState = settings(settingsState, action)
        expect(newState.checkedWordTranslate).toBeFalsy()
    })
    it("should show word translate if it`s on", ()=>{
        const {container} = render( <BrowserRouter><Provider store={reduxStore}><Word word={word}/></Provider></BrowserRouter> )
        expect(container.querySelectorAll("#wordTranslate")).toHaveLength(1)
    })

})

describe("Header", ()=>{
    let containerHeader
    beforeEach(()=>{
        const {container} = render(<BrowserRouter><Provider store={reduxStore}><Header/></Provider></BrowserRouter>)
        containerHeader = container
    })

    it("should show header", ()=>{
        expect(containerHeader.querySelector("#header")).toBeTruthy()
    })
    it("should show login button", ()=>{
        expect(containerHeader.querySelector("#login").textContent).toBe("Logout")
    })
})

describe("Main page", ()=>{
    it("should show 3 blocks about us", ()=>{
        const {container} = render(<MainPage/>)
        expect(container.querySelectorAll("#block")).toHaveLength(3)
    })
})