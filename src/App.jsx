import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "./redux/auth/thunks";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core";
import { useRoutes } from "./routes";
import { Header } from "./views/Header/Header";
import { Footer } from "./views/Footer/Footer";

function App() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.userInfo?.refreshToken);
    const id = useSelector(
        (state) => state.auth.userInfo?.id || state.auth.userInfo?.userId
    );

    useEffect(() => {
        dispatch(updateToken(id, token));
    }, []); //eslint-disable-line

    const isAuthenticated = !!useSelector(
        (state) => state.auth.userInfo?.token
    );

    const routes = useRoutes(isAuthenticated);

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Header />
                <main className="Main">{routes}</main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;