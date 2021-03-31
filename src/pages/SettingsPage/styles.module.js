import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: '5rem 0'
  },
  settingsOption: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    '&:last-child': {
      marginBottom: '2rem'
    }
  },
  settingsTitle: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  settingsButtons: {
    display: 'flex',
    justifyContent: 'center'
  },
  settingsBackButton: {
    color: '#fff'
  }
})) 