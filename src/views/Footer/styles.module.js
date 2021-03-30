import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.light,
  },
  footerGithubs: {
    marginRight: '20px',
  },
  footerGithubIcon: {
    color: '#fff',
  },
  title: {
    flexGrow: 1,
  },
  footerYear: {
    fontWeight: 'bold',
    marginBottom: 0,
    marginRight: '10px',
    marginLeft: '10px',
  },
  footerLogo: {
    width: '50px',
    color: '#fff',
    opacity: '0.7',
    transition: 'all 0.3s ease',
    '&:hover': {
      opacity: '0.99',
    },
  },
}));
