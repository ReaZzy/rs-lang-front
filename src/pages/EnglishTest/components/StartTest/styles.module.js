import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  testStartingPage: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6rem'
  },
  testStartingPageText: {
    marginBottom: '2rem'
  },
  testStartingPageButton: {
    color: '#fff'
  }
})) 