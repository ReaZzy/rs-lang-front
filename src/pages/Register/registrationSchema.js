import * as yup from "yup"

export const registrationSchema = yup.object().shape({
  email: yup.string().email( "Invalid email" )
      .required( "Email is required" ),
  password: yup.string()
      .required( "Password is required" )
      .min( 8, "Password is too short" )
      .max( 20, "Password is too long" ),
  name: yup.string()
      .required( "Name is required" )
      .min( 3, "Name is too short" )
      .max( 20, "Name is too long" ),
  avatar: yup.mixed().required( "Avatar is required" ).test( "fileSize", "Avatar size is too large", (value) => {
      if (!value?.length) return true
      return value[0].size <= 5242880
  } )
})