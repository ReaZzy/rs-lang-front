import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams, Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import PaginationItem from '@material-ui/lab/PaginationItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextBookPage } from '../TextBookPage/TextBookPage';
import { Container } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import { useStyles } from './styles.module';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {useSelector} from "react-redux";

export const TextBookPageWrapper = () => {
  const classes = useStyles();
  let { module, page } = useParams();
  const [isUrlReady, setUrlBool] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const count = useSelector(state=> state.words.aggregatedWords?.totalCount[0]?.count)

  const validationHandler = useCallback(
    () => {
      let redirectModule = Number(module);
      let redirectPage = Number(page);
  
      if (redirectModule === 0 || redirectModule > 6) {
        redirectModule = 1;
      }
  
      if (redirectPage === 0 || redirectPage > Math.ceil(count/10) || !redirectPage) {
        redirectPage = 1;
      }
  
  
      return `/textbook/${redirectModule}/${redirectPage}`
  
    }, [module, page, count])
    
  useEffect(() => {
    const redirectUrl = validationHandler();
    if (redirectUrl !== location.pathname) {
      history.replace(redirectUrl);
    }
    
    setUrlBool(true);
    
    }, [history, location.pathname, validationHandler])
 
  if (!isUrlReady) {
    return (
      <CircularProgress />
    )
  }

  const gamesLinkConfig = [
    {
      text: 'Savannah',
      to: '/savanna'
    },
    {
      text: 'Audio challenge',
      to: '/audio-challenge',
    },
    {
      text: 'Sprint',
      to: '/sprint'
    },
    {
      text: 'Memory',
      to: '/our-game'
    }
  ]

  return (
    <>
    <Container  maxWidth="md">
        <section className={classes.gamesNav}>
         <Grid container>
            <Grid item xs={11}>
              <nav>
                <ul className={classes.gamesNavList}>
                  {
                    gamesLinkConfig.map((linkItem, key) => (
                      <li className={classes.gamesNavItem} key={key}>
                        <Link className={classes.gamesNavLink} to={linkItem.to}>
                          <Typography variant="h4" className={classes.gamesNavLinText}>
                            { linkItem.text }
                          </Typography>
                        </Link>
                      </li>
                      )
                    )
                  }
                </ul>
              </nav>
            </Grid>
            <Grid item xs={1} className={classes.settings}>
              <Link to="/settings">
                <SettingsIcon className={classes.menuItemIcon} />
              </Link>
            </Grid>
         </Grid>
        </section>
        <section className={classes.textBookSection}>
          <TextBookPage />
          <Pagination
          count={Math.ceil(count/10)||0}
          page = {Number(page)}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/textbook/${module}/${item.page}`}
              {...item}
            />
          )}
        />
        </section>
      </Container>
    </>
  )
}