import React from 'react';
import { Container, IconButton } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from "@material-ui/icons/GitHub";
import logoSrc from "./rs_school_js.svg";
import { useStyles } from './styles.module'

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer>
      <AppBar className={classes.footer} position="static">
        <Container maxWidth="lg">
          <Toolbar >
            <div className={classes.footerGithubs}>
              <IconButton href="https://github.com/inesterovich" target="_blank">
                <GitHubIcon className={classes.footerGithubIcon}/>
              </IconButton>
              <IconButton href="https://github.com/ReaZzy" target="_blank">
                <GitHubIcon className={classes.footerGithubIcon}/>
              </IconButton>
              <IconButton href="https://github.com/Safwood" target="_blank">
                <GitHubIcon className={classes.footerGithubIcon}/>
              </IconButton>
              <IconButton href="https://github.com/kostyayakimovich" target="_blank">
                <GitHubIcon className={classes.footerGithubIcon}/>
              </IconButton>
            </div>
            <Typography variant="h6" className={classes.title}>
              RSLang
            </Typography>
            <Typography variant="body2" className={classes.footerYear}>
              2021г.
            </Typography>
            <a
            href={"https://rs.school/react/"}
            className={classes.footerLogo}
            target="_blank"
            rel="noreferrer"
          >
            <img src={logoSrc} alt="" className={classes.footerLogo}/>
          </a>
          </Toolbar>
          </Container>
      </AppBar>
    </footer>
  )
}
