import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
     
  menuItemIcon: {
    color: "#fff",
    marginRight: '17px', 
  },
  
  menuLink: {
    textDecoration: 'none',
    color:'#f7e5ff',
    fontWeight: 'bold',
    fontFamily: "Roboto",
    
  },
  
  menu: {
    background: '#5c75f4',
    borderRadius: '4px',
  },
  
  menuItem: {
    display: 'flex',
  },
}))