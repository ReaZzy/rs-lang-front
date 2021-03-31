import React from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth/thunks";
import {Link} from "react-router-dom";
import {Container, Button} from '@material-ui/core';
import { useStyles } from './styles.module';
import Typography from '@material-ui/core/Typography';
import {loginSchema} from './loginSchema'

export const LoginPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const error = useSelector(state=>state.auth.error)
    const handleSubmit = (data) => {
        dispatch(login(data.email, data.password))
    }

    return (
        <>
            <Container maxWidth="sm" className={classes.logInContainer}>
                <Formik onSubmit={handleSubmit} initialValues={{email:"", password:""}} validationSchema={loginSchema}>
                    {({errors, touched}) => (
                    <Form className={classes.form}>
                       <div className={classes.formField} >
                            <label htmlFor="email">
                                <Typography  className={classes.formInputTitle} variant="h5">Email</Typography>
                            </label>
                            <Field className={classes.formInput} id="email" name="email" component="input" type="email"/>
                            {errors.email && touched.email ? (
                                <div className={classes.formInputError}>{errors.email}</div>
                            ) : null}
                       </div>
                        <div className={classes.formField}>
                            <label htmlFor="password">
                                <Typography  className={classes.formInputTitle} variant="h5">Password</Typography>
                            </label>
                            <Field className={classes.formInput} id="password" name="password" component="input" type="password"/>
                            {errors.password && touched.password ? (
                                <div className={classes.formInputError}>{errors.password}</div>
                            ) : null}
                        </div>
                        <div  className={classes.formButtonField}>
                            <Button className={classes.formButton} type="submit">Submit</Button>
                            <Button className={classes.formRegButton}>
                                <Link className={classes.formLink} to={"/register"}>Registration</Link>
                            </Button>
                        </div>
                    </Form>
                    )}
                </Formik>
                {error && <div style={{color:"red"}}>{error}</div>}
            </Container>
        </>
    )
}