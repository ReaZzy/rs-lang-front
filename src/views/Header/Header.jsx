import React, { useCallback } from 'react';
import { Container } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import SimpleMenu from '../components/Menu'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles.module';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/thunks';

export const Header = () => {
  const classes = useStyles();
  const isAuthenticated = !!useSelector(
    (state) => state.auth.userInfo?.token
  );
  
  const history = useHistory();
  const dispatch = useDispatch();

  const loginHandler = useCallback(() => {
    history.push('/login')
  }, [history]);
  const logoutHandler = useCallback(() => {
    dispatch(logout());
    history.push('/login');
   }, [dispatch, history]);

  return (
    <header className={classes.header} id={"header"}>
      <AppBar color="primary" position="static">
        <Container maxWidth="lg">
          <Toolbar color="primary.main"  >
            <SimpleMenu />
            <Typography variant="h6" className={classes.title}>
              RSLang
            </Typography>
            <Button color='inherit' onClick={ isAuthenticated ? logoutHandler : loginHandler } id={"login"}>
              { !isAuthenticated ? 'Login' : 'Logout'}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};
