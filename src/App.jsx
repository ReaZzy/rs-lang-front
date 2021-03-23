import React, { Suspense, useEffect } from "react";
import MainPage from "./pages/MainPage";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import RegisterPage from "./pages/Register";
import { LoginPage } from "./pages/Login/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateToken } from "./redux/auth/thunks";
import MyWordsPage from "./pages/MyWordsPage";

const TextBookPage = React.lazy(() => import("./pages/TextBookPage"));

function App() {
    const name = useSelector((state) => state.auth.userInfo?.name);
    const isFetching = useSelector((state) => state.register.isFetching);
    const token = useSelector((state) => state.auth.userInfo?.refreshToken);
    const id = useSelector(
        (state) => state.auth.userInfo?.id || state.auth.userInfo?.userId
    );
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logout());
    };
    useEffect(() => {
        dispatch(updateToken(id, token));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Link to="/">Главная</Link>
                <Link to="/textbook">Учебник</Link>
                <Link to="/my-words">Мои слова</Link>
                {name ? (
                    <>
                        {name} <button onClick={handleClick}>Log out</button>
                    </>
                ) : (
                    <Redirect to={"/login"} />
                )}
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route path="/textbook/:module?/:page?">
                        <Suspense fallback={isFetching}>
                            <TextBookPage />
                        </Suspense>
                    </Route>
                    <Route path={"/register"}>
                        <RegisterPage />
                    </Route>
                    <Route path={"/login"}>
                        <LoginPage />
                    </Route>
                    <Route path={"/my-words"}>
                        <MyWordsPage />
                    </Route>
                </Switch>
            </div>
        </ThemeProvider>
    );
}

export default App;
