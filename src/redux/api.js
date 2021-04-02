import axios from "axios"


const instance = axios.create({
    baseURL: "https://api-rslang.pet-projects.ru/",
    headers:{
        withCredentials: true,
    }
})

export const registerUserRequest = (formData) => {
    return instance.post( "/users", formData )
        .catch(err=>err.response.status)
}

export const loginRequest = (email, password) => {
    return instance.post( `/signin`, {email, password})
        .catch(err=>err.response.status)
}

export const getMyWordsRequest = (id, token) => {
    return instance.get( `/users/${id}/words` , {
        headers:{
          "Authorization": `Bearer ${token}`
        }
    }).catch(err=>err.response.status)
}
export const getWordsRequest = (page,module) => {
    return instance.get( `/words?group=${module}&page=${page}`)
}
export const getWordByIdRequest = (id) => {
    return instance.get( `/words/${id}`)
}

export const updateTokenRequest = (id, token) => {
    return instance.get(`/users/${id}/tokens`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export const deleteWordRequest = (id,wordId, token) => {
    return instance.delete(`/users/${id}/words/${wordId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getAggregatedWordsRequest = (page, module, id, token) => {
    return instance.get(`/users/${id}/aggregatedWords?group=${module}&page=${page}&filter=%7B%20%22%24or%22%3A%20%5B%20%7B%20%22userWord.difficulty%22%3A%20null%20%7D%2C%20%7B%20%22userWord.difficulty%22%3A%20%22hard%22%20%7D%2C%20%7B%22userWord.difficulty%22%3A%22learn%22%7D%20%5D%20%7D`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export const setAggregatedWordRequest = (id, wordId, type, token,  correctTimes=0, wrongTimes=0) => {
    return instance.post(`/users/${id}/words/${wordId}`, {
        "difficulty": `${type}`,
        "optional": {
            correctTimes: correctTimes,
            wrongTimes: wrongTimes
        }
    }, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
}

export const updateAggregatedWord = (id, wordId, type,token, correctTimes=0, wrongTimes=0) => {
    return instance.put(`/users/${id}/words/${wordId}`, {
        "difficulty": `${type}`,
        "optional": {
            "correctTimes": correctTimes,
            "wrongTimes": wrongTimes
        }
    }, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
}