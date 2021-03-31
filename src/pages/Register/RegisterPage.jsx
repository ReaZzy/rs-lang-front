import React from "react";
import {Field, Form, Formik} from "formik";
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../redux/register/thunks";
import {Container, Button} from '@material-ui/core';
import { useStyles } from './styles.module';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

export const RegisterPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const serverError = useSelector(state=>state.register.error)
    const registrationSchema = yup.object().shape({
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

    const handleSubmit = (data) => {
        const formData = new FormData()
        formData.append("email", data.email)
        formData.append("name", data.name)
        formData.append("password", data.password)
        formData.append("avatar", data?.avatar[0])
        dispatch(registerUser(formData))
    }
    return (
        <>
            <Container maxWidth="sm" className={classes.logInContainer}>
                <Formik
                    initialValues={{email: "", name: "", password: "", avatar: null}}
                    onSubmit={handleSubmit}
                    validationSchema={registrationSchema}
                >
                    {({errors, touched, setFieldValue}) => (
                        <Form  className={classes.form}>
                            <div className={classes.formField} >
                                <label htmlFor="name">
                                    <Typography  className={classes.formInputTitle} variant="h5">Name</Typography>
                                </label>
                                <Field className={classes.formInput} id="name" name={"name"} component={"input"} type={"text"}/>
                                {errors.name && touched.name ? (
                                    <div className={classes.formInputError}>{errors.name}</div>
                                ) : null}
                            </div>
                            <div className={classes.formField} >
                                <label htmlFor="email">
                                    <Typography  className={classes.formInputTitle} variant="h5">Email</Typography>
                                </label>
                                <Field className={classes.formInput} id="email" name={"email"} component={"input"} type={"email"}/>
                                {errors.email && touched.email ? (
                                <div className={classes.formInputError}>{errors.email}</div>
                                ) : null}
                            </div>
                            <div className={classes.formField} >
                                <label htmlFor="password">
                                <Typography  className={classes.formInputTitle} variant="h5">Password</Typography>
                                </label>
                                <Field className={classes.formInput} id="password" name={"password"} component={"input"} type={"password"}/>
                                {errors.password && touched.password ? (
                                    <div className={classes.formInputError}>{errors.password}</div>
                                ) : null}
                            </div>
                            <div className={classes.formField} >
                                <label htmlFor="avatar">
                                    <Typography  className={classes.formInputTitle} variant="h5">Avatar</Typography>
                                </label>
                                <input className={classes.formInputFile} id="avatar" accept={"image/*"} id="avatar" name="avatar" type="file" onChange={(event) => {
                                    setFieldValue( "avatar", event.currentTarget.files );
                                }}/>
                                {errors.avatar && touched.avatar ? (
                                    <div className={classes.formInputError}>{errors.avatar}</div>
                                ) : null}
                            </div>
                            <div  className={classes.formButtonField}>
                                <Button className={classes.formButton} type={"submit"}>Submit</Button>
                                <Button className={classes.formRegButton}>
                                    <Link className={classes.formLink} to={"/login"}>Login</Link>
                                </Button>
                            </div>
                            {serverError && <div style={{color:"red"}}>{serverError}</div>}
                        </Form>
                    )}
                </Formik>
            </Container>
        </>
    )
}