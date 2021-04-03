import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  testResult: {
    height: '100%',
    padding: '4rem 5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  testResultAnswers: {
    marginBottom: '2rem',
  },
  testResultButtons: {
    display: "flex",
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  testResultButton: {
    color: '#fff',
    marginRight: '1rem',
    '&:last-child': {
      marginRight: '0'
    }
  }
  
})) 