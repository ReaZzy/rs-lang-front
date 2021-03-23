import React from 'react';
import { Container } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from '@material-ui/core/AppBar';
import Menu from '../components/Menu'
import styles from "./styles.module.css";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export const Header = () => {
  const classes = useStyles();

  return (
    <header>
      <AppBar color="primary" position="static">
        <Container maxWidth="lg">
          <Toolbar className={styles.toolbar} color="primary.main"  >
            <Menu />
            <Typography variant="h6" className={classes.title}>
              RSLang
            </Typography>
            <Button color="inherit">
              <Link className={styles.link} to={"/login"}>Login</Link>
            </Button>
          </Toolbar>
          </Container>
      </AppBar>
    </header>
  )
}