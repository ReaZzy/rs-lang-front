export const authSetError = (error) => ({type:"auth/SET_ERROR", payload: error})
export const authSetUserInfo = (data) => ({type:"auth/SET_USER_INFO", payload: data})