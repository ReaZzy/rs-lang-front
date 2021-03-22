import MainPage from './pages/MainPage'
import TextBook from './pages/TextBookPage'
import {Switch, Route, Link, Redirect} from "react-router-dom";
import RegisterPage from "./pages/Register";
import {LoginPage} from "./pages/Login/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./redux/auth/thunks";
import MyWordsPage from "./pages/MyWordsPage";

function App() {
    const name = useSelector( state => state.auth.userInfo?.name)

    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(logout())
    }

    return (
        <div className="App">
            <Link to="/">Главная</Link>
            <Link to="/textbook">Учебник</Link>
            <Link to="/my-words">Мои слова</Link>
            {name
                ? <>{name} <button onClick={handleClick}>Log out</button></>
                : <Redirect to={"/login"}/>
            }
            <Switch>
                <Route exact path="/">
                    <MainPage/>
                </Route>
                <Route path="/textbook">
                    <TextBook/>
                </Route>
                <Route path={"/register"}>
                    <RegisterPage/>
                </Route>
                <Route path={"/login"}>
                    <LoginPage/>
                </Route>
                <Route path={"/my-words"}>
                    <MyWordsPage/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
