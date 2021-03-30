import React from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth/thunks";
import {Link} from "react-router-dom";
import {Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export const LoginPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const error = useSelector(state=>state.auth.error)
    const handleSubmit = (data) => {
        dispatch(login(data.email, data.password))
    }
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .required( "Password is required" )
            .min( 8, "Password is too short" )
            .max( 20, "Password is too long" ),
    })

    return (
        <>
            <Container maxWidth="sm" className={classes.logInContainer}>
                <Formik onSubmit={handleSubmit} initialValues={{email:"",password:""}} validationSchema={loginSchema}>
                    {({errors, touched}) => (
                    <Form style={{display:"flex", flexDirection:"column", width:"80%", margin:"0 auto"}}>
                        <label>Email</label>
                        <Field name={"email"} component={"input"} type={"email"}/>
                        {errors.email && touched.email ? (
                            <div style={{color:"red"}}>{errors.email}</div>
                        ) : null}
                        <label>Password</label>
                        <Field name={"password"} component={"input"} type={"password"}/>
                        {errors.password && touched.password ? (
                            <div style={{color:"red"}}>{errors.password}</div>
                        ) : null}
                        <button type={"submit"}>Submit</button>
                    </Form>
                    )}
                </Formik>
                {error && <div style={{color:"red"}}>{error}</div>}
                <Link to={"/register"}>Registration</Link>
            </Container>
        </>
    )
}