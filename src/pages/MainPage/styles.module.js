import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  gridContainer: {
    margin: '0',
    marginBottom: '20px',
  },
  mainPageHeroSection: {
    margin: '0',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: "space-between" ,
    [theme.breakpoints.down('lg')]: {
      flexDirection: "column-reverse",
      alignItems:'center',
    },
  },
  mainPageTitle: {
    display: 'flex',
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: '31px',

    [theme.breakpoints.down('lg')]: {
      maxWidth: '100%',
    },
  },

  mainPageTitleWrapper: {
    display: 'flex',
    maxWidth: '50%',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '74%',
    }
  },
  pageMainPicture: {
    display: 'flex',
    maxWidth: '50%',
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: '31px',

    [theme.breakpoints.down('lg')]: {
      maxWidth: '74%',
    },
  },
  
  mainPageDescriptionContainer: {
    margin: '0',
    marginBottom: '20px',

    [theme.breakpoints.down('lg')]: {
      maxWidth: '100%',
      flexGrow: '1',
      display:  'flex',
      justifyContent:'center',
    },  
  },
  mainPagePhoto: {
    height: '100%',
    width: '100%',
  },
  
  mainPagePhotoContainer: {
    maxHeight: '352px',
    objectFit: 'cover',
  },
  
  mainPageDescription: {
    maxWidth: '500px',
    backgroundColor: 'white',
    padding: '1rem'
  },
  benefitsPhoto: {
    width: '105px',
    height: '105px' ,

    [theme.breakpoints.down('xl')]: {
      width: '91px',
      height: '91px' ,
    },

    [theme.breakpoints.down('lg')]: {  
        width: '83px',
        height: '83px' ,
    },

    [theme.breakpoints.down('sm')]: {
      width: '78px',
      height: '78px' ,
    }, 

    [theme.breakpoints.down('xs')]: {
      width: '76px',
      height: '76px',
    }, 
  },
  
  benefitsCard: {
    display: 'flex',
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: '31px',
    '&:first-child': {
      marginBottom: '10px',
    },
    [theme.breakpoints.down('xl')]: {
      width: '66%',
    },
  },
  benefitsCardContainer: {
    [theme.breakpoints.down('xl')]: {
      flexGrow: '1',
      maxWidth: '100%',
      display:  'flex',
      flexDirection: 'column',
      alignItems:'center',
    }
  },
    
  mainPageHeading: {
    [theme.breakpoints.down('lg')]: {
    textAlign:'center',
    fontSize: '34px',
    },    

    [theme.breakpoints.down('md')]: {
        fontSize: '31px',
    },

    [theme.breakpoints.down('sm')]: {
        fontSize: '27px',
    },

    [theme.breakpoints.down('xs')]: {
        fontSize: '24px',
    }
  },
  
  benefitsCardText: {
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },

    [theme.breakpoints.down('xs')]: {
        fontSize: '16px',
    }
  }, 
  
})) 