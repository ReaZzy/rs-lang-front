import words from "./redux/words";

describe("Words reducer", ()=>{
    let initialState
    beforeEach(()=>{
        initialState = {
            words: null,
            myWords: null,
            aggregatedWords: {paginatedResults: [{_id:123}, {_id:1}, {_id:2}], totalCount:1},
            wordsFetching: false,
        }
    })

    it("should set words", ()=>{
        const action = {type: "words/SET_WORDS", payload: [{},{},{}]}
        const newState = words(initialState, action)
        expect(newState.words).toHaveLength(3)
    })

    it("should edit word", ()=>{
        const action = {type:"words/EDIT_AGGREGATED_WORDS", payload: {id:123, type:"hard", correctTimes:1, wrongTimes:0}}
        const newState = words(initialState, action)
        expect(newState.aggregatedWords.paginatedResults[0])
            .toEqual({_id:123, userWord:{difficulty: "hard", optional: { correctTimes: 1, wrongTimes: 0}}})
        expect(newState.aggregatedWords.paginatedResults[1])
            .toEqual({_id:1})
    })
})