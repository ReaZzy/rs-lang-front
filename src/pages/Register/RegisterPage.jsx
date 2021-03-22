import React from "react";
import {Field, Form, Formik} from "formik";
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../redux/register/thunks";

export const RegisterPage = () => {
    const dispatch = useDispatch()
    const serverError = useSelector(state=>state.register.error)
    const registrationSchema = yup.object().shape( {
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
    } )


    const handleSubmit = (data) => {
        const formData = new FormData()
        formData.append("email", data.email)
        formData.append("name", data.name)
        formData.append("password", data.password)
        formData.append("avatar", data?.avatar[0])
        dispatch(registerUser(formData))

    }
    return (
        <div>
            <Formik
                initialValues={{email: "", name: "", password: "", avatar: null}}
                onSubmit={handleSubmit}
                validationSchema={registrationSchema}
            >
                {({errors, touched, setFieldValue}) => (

                    <Form style={{display:"flex", flexDirection:"column", width:"50%", margin:"0 auto"}}>
                        <label>Name</label>
                        <Field component={"input"} type={"text"} name={"name"}/>
                        {errors.name && touched.name ? (
                            <div style={{color:"red"}}>{errors.name}</div>
                        ) : null}

                        <label>Email</label>
                        <Field component={"input"} type={"email"} name={"email"}/>
                        {errors.email && touched.email ? (
                            <div style={{color:"red"}}>{errors.email}</div>
                        ) : null}

                        <label>Password</label>
                        <Field component={"input"} type={"password"} name={"password"}/>
                        {errors.password && touched.password ? (
                            <div style={{color:"red"}}>{errors.password}</div>
                        ) : null}

                        <label>Avatar</label>
                        <input accept={"image/*"} id="avatar" name="avatar" type="file" onChange={(event) => {
                            setFieldValue( "avatar", event.currentTarget.files );
                        }}/>
                        {errors.avatar && touched.avatar ? (
                            <div style={{color:"red"}}>{errors.avatar}</div>
                        ) : null}

                        <button type={"submit"}>Submit</button>
                        {serverError && <div style={{color:"red"}}>{serverError}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}