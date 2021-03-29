import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams, Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import PaginationItem from '@material-ui/lab/PaginationItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextBookPage } from '../TextBookPage/TextBookPage';
import { Container } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import { useStyles } from './styles.module';


export const TextBookPageWrapper = () => {
  const classes = useStyles();
  let { module, page } = useParams();
  const [isUrlReady, setUrlBool] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const validationHandler = useCallback(
    () => {
      let redirectModule = Number(module);
      let redirectPage = Number(page);
  
      if (redirectModule === 0 || redirectModule > 6) {
        redirectModule = 1;
      }
  
      if (redirectPage === 0 || redirectPage > 30 || !redirectPage) {
        redirectPage = 1;
      }
  
  
      return `/textbook/${redirectModule}/${redirectPage}`
  
    }, [module, page])
    
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
      text: 'Саванна',
      to: '/game/savanna'
    },
    {
      text: 'Аудиовызов',
      to: '/game/audiogame',
    },
    {
      text: 'Спринт',
      to: '/game/sprint'
    },
    {
      text: 'Своя игра',
      to: '/game/svoia_igra'
    }
  ]

  return (
    <>
    <Container  maxWidth="lg">
        <section className="settings-link">
          <SettingsIcon className={classes.menuItemIcon} />
          <Link to="/textbook/settings">Settings</Link>
        </section>
        <section className="games-nav">
          <nav>
            <ul>
              {
                gamesLinkConfig.map((linkItem, key) => (
                  <li key={key}><Link to={linkItem.to}>{ linkItem.text }</Link></li>
                  )
                )
              }
            </ul>
          </nav>
        </section>
        <section>
          <TextBookPage />
        </section>
        <Pagination
          count={30}
          page = {Number(page)}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/textbook/${module}/${item.page}`}
              {...item}
            />
          )}
        />
      </Container>
    </>
  )
}