import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  testContainer: {
    height: '100%',
    padding: '2rem 5rem',
    display: 'flex',
    justifyContent: 'center'
  },
  testHeading: {
    textAlign: 'center'
  },
  testQuestionNumber: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  testAnswerButtons: {
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center'
  },
  testAnswerButton: {
    color: '#fff',
    marginRight: '1rem',
    '&:last-child': {
      marginRight: '0'
    }
  },
  testQuetionWord: {
    color: theme.palette.primary.main,
    marginBottom: '2rem',
    textAlign: 'center',
  },
  testTaskType: {
    display: 'flex',
    marginBottom: '2rem',
    justifyContent: 'center'
  },
  testTaskTypeText: {
    marginRight: '0.5rem',
  }
})) 