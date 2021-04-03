import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  dictionaryHeaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: "2rem 0"
  },
  dictionaryLearnWords: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  
  TextBookPageHeading: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '1rem'
  },
  TextBookWordList: {
    listStyle: 'none'
  },
  TextBookWordItem: {
    marginBottom: '1rem'

  },
  TextBookWordCard: {
    padding: '2rem',
    borderRadius: "4px",
    boxShadow: '0 2px 4px rgba(0, 0, 0, .2)',
  },
  TextBookWordMedia: {
    marginBottom: '2rem'
  },
  TextBookWordImageWrapper: {
    marginRight: '2rem'
  },
  TextBookWordHeding: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  TextBookWordMeaning: {
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    margin: '0 0 1rem',
  },
  TextBookWordTranslation: {
    textTransform: 'uppercase',
    color: '#8d8d8d',
    margin: '0',
  },
  TextBookWordImage: {
    height: '11rem',
    width: '16rem'
  },
  TextBookWordContent: {
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  TextBookWordButtons: {
    display: 'flex',
    justifyContent: 'center'
  },
  TextBookWordButton: {
    marginRight: '1rem',
    '&:last-child': {
      marginRight: '0'
    },
    color: 'fff'
  },
  TextBookWordText: {
    margin: '0 0 1rem'
  },
  TextBookWordResult: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  TextBookWordResultWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextBookWordRight: {
    marginRight: '5rem',
    color: theme.palette.secondary.green,
  },
  TextBookWordWrong: {
    color: theme.palette.secondary.main,
  }
  

})) 