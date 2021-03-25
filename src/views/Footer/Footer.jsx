import React from 'react';
import { Container, IconButton } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from '@material-ui/core/AppBar';
import styles from "./styles.module.css";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from "@material-ui/icons/GitHub";
import logoSrc from "./rs_school_js.svg";


const useStyles = makeStyles((theme) => ({
  footer:{
    backgroundColor: theme.palette.primary.light
  },
  title: {
    flexGrow: 1,
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer>
      <AppBar className={classes.footer} position="static">
        <Container maxWidth="lg">
          <Toolbar className={styles.toolbar} color="primary.main"  >
            <div className={styles.footer__githubs}>
              <IconButton href="https://github.com/inesterovich" target="_blank">
                <GitHubIcon />
              </IconButton>
              <IconButton href="https://github.com/ReaZzy" target="_blank">
                <GitHubIcon />
              </IconButton>
              <IconButton href="https://github.com/Safwood" target="_blank">
                <GitHubIcon />
              </IconButton>
              <IconButton href="https://github.com/kostyayakimovich" target="_blank">
                <GitHubIcon />
              </IconButton>
            </div>
            <Typography variant="h6" className={classes.title}>
              RSLang
            </Typography>
            <Typography variant="body2" className={styles.footer__year}>
              2021г.
            </Typography>
            <a
            href={"https://rs.school/react/"}
            className={styles.footer__logo}
            target="_blank"
            rel="noreferrer"
          >
            <img src={logoSrc} alt="" />
          </a>
          </Toolbar>
          </Container>
      </AppBar>
    </footer>
  )
}
