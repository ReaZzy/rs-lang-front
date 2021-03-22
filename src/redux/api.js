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

export const getWordsRequest = (id, token) => {
    return instance.get( `/users/${id}/words` , {
        headers:{
          "Authorization": `Bearer ${token}`
        }
    }).catch(err=>err.response.status)
}