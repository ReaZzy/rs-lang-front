import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  logInContainer: {
    paddingTop: '10rem',
  },
  form: {
    display:"flex", 
    flexDirection:"column", 
    width:"73%", 
    margin:"0 auto",
    padding: '3rem',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgb(0 0 0 / 41%)',

  },
  formButton: {
    color: '#fff',
    marginTop: '1rem',
    width: '6rem',
    marginRight: '1rem'
  },
  formRegButton: {
    color: '#fff',
    marginTop: '1rem',
    width: '9.5rem'
  },
  formButtonField:{ 
    display:'flex',
    justifyContent: 'center'
  },
  formInput: {
    height: "2rem",
    width: '100%',
    border: '2px rgba(0, 0, 0, 0.768) solid',
    fontSize: '1rem'
  },
  formInputTitle: {
    marginBottom: '3px'
  },
  formInputError: {
    color:"red"
  },
  formField: {
    height: '4rem',
    width: '100%',
    marginBottom: '1rem',
  },
  formLink: {
    textDecoration: 'none',
    color: '#fff'
  }
})) 