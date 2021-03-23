<<<<<<< HEAD
import MainPage from './pages/MainPage';
import TextBook from './pages/TextBookPage';
import { ThemeProvider, Container } from '@material-ui/core';
import { theme } from './theme';
import { Header } from './views/Header/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterPage from './pages/Register';
import { LoginPage } from './pages/Login/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/auth/thunks';
import MyWordsPage from './pages/MyWordsPage';
import Sprint from './pages/games/Sprint';

function App() {
  const name = useSelector((state) => state.auth.userInfo?.name);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Header />
        <Container maxWidth='lg'>
          {name ? (
            <>
              {name} <button onClick={handleClick}>Log out</button>
            </>
          ) : (
            <Redirect to={'/login'} />
          )}

          <Switch>
            <Route exact path='/'>
              <MainPage />
            </Route>
            <Route path='/textbook'>
              <TextBook />
            </Route>
            <Route path={'/register'}>
              <RegisterPage />
            </Route>
            <Route path={'/login'}>
              <LoginPage />
            </Route>
            <Route path={'/my-words'}>
              <MyWordsPage />
            </Route>
            <Route path={'/sprint'}>
              <Sprint />
            </Route>
          </Switch>
        </Container>
      </div>
    </ThemeProvider>
  );
=======

import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import { Header } from './views/Header/Header'
import { useSelector } from "react-redux";
import { useRoutes } from './routes';


function App() {
   
    const isAuthenticated = !!useSelector(state => state.auth.userInfo?.token);
   

    const routes = useRoutes(isAuthenticated);

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
            <main>
                {routes}
            </main>
        </div>
      </ThemeProvider>
    );
>>>>>>> 8c7b2fb1dd12c8b8753c5604b6bdccccdc1f44f9
}

export default App;
