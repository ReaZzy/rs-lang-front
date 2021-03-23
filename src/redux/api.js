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

export const updateTokenRequest = (id, token) => {
    return instance.get(`/users/${id}/tokens`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getAggregatedWordsRequest = (page, module, id, token) => {
    return instance.get(`/users/${id}/aggregatedWords?group=${module}&page=${page}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export const setAggregatedWordRequest = (id, wordId, type, token) => {
    return instance.post(`/users/${id}/words/${wordId}`, {
        "difficulty": `${type}`,
        "optional": {}
    }, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
}