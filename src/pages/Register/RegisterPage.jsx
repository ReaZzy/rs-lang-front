import React, { useEffect } from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../redux/register/thunks";
import {Container, Button} from '@material-ui/core';
import { useStyles } from './styles.module';
import Typography from '@material-ui/core/Typography';
import {Link, useHistory} from "react-router-dom";
import {registrationSchema} from './registrationSchema'

export const RegisterPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const serverError = useSelector(state => state.register.error);

    const handleSubmit = (data) => {
        const formData = new FormData()
        formData.append("email", data.email)
        formData.append("name", data.name)
        formData.append("password", data.password)
        formData.append("avatar", data?.avatar[0])
        dispatch(registerUser(formData))
    }

    const isRegistered = !!useSelector(
        (state) => state.auth.userInfo?.id
    );

    const history = useHistory();

    useEffect(() => {
        if (isRegistered) {
        history.push('/login');
        } 
    }, [history, isRegistered])


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
                                <Field className={classes.formInput} id="name" name="name" component="input" type="text"/>
                                {errors.name && touched.name ? (
                                    <div className={classes.formInputError}>{errors.name}</div>
                                ) : null}
                            </div>
                            <div className={classes.formField} >
                                <label htmlFor="email">
                                    <Typography  className={classes.formInputTitle} variant="h5">Email</Typography>
                                </label>
                                <Field className={classes.formInput} id="email" name="email" component="input" type="email"/>
                                {errors.email && touched.email ? (
                                <div className={classes.formInputError}>{errors.email}</div>
                                ) : null}
                            </div>
                            <div className={classes.formField} >
                                <label htmlFor="password">
                                <Typography  className={classes.formInputTitle} variant="h5">Password</Typography>
                                </label>
                                <Field className={classes.formInput} id="password" name="password" component="input" type="password"/>
                                {errors.password && touched.password ? (
                                    <div className={classes.formInputError}>{errors.password}</div>
                                ) : null}
                            </div>
                            <div className={classes.formField} >
                                <label htmlFor="avatar">
                                    <Typography  className={classes.formInputTitle} variant="h5">Avatar</Typography>
                                </label>
                                <input className={classes.formInputFile} accept={"image/x-png,image/jpeg"} id="avatar" name="avatar" type="file"
                                    onChange={(event) => {
                                        setFieldValue( "avatar", event.currentTarget.files );
                                    }}
                                />
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