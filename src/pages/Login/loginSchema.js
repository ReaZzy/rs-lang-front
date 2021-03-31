import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
  password: Yup.string()
      .required( "Password is required" )
      .min( 8, "Password is too short" )
      .max( 20, "Password is too long" ),
})