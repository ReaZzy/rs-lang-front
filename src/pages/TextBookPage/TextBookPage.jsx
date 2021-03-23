import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import PaginationItem from '@material-ui/lab/PaginationItem';


export const TextBookPage = () => {

 
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
      <div>
        <p>Page is Loading</p>
      </div>
    )
  }

  return (
    <div>
      <p>Page content</p>
      <Pagination count={30}
      />

    
    </div>
  )

  
}
