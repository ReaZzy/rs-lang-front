import React from 'react';
import { Container } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import SimpleMenu from '../components/Menu'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useStyles } from './styles.module';

export const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <AppBar color="primary" position="static">
        <Container maxWidth="lg">
          <Toolbar color="primary.main"  >
            <SimpleMenu />
            <Typography variant="h6" className={classes.title}>
              RSLang
            </Typography>
            <Button color='inherit'>
              <Link className={classes.link} to={'/login'}> 
                Login
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};
