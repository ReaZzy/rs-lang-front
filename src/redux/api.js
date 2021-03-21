import axios from "axios"

const instance = axios.create({
    baseURL: "https://api-rslang.pet-projects.ru/"
})

export const registerUserRequest = (formData) => {
    return instance.post( "users", formData )
        .catch(err=>err.response.status)
}

export const loginRequest = (email, password) => {
    return instance.post( `https://api-rslang.pet-projects.ru/signin`, {email, password})
        .catch(err=>err.response.status)
}