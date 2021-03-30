import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  gamesNav: {
    padding: '1rem 0'
  },
  gamesNavList: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    alignItems: 'center',
  },
  gamesNavLink: {
    color: 'rgba(0, 0, 0, 0.768)'
  },
  gamesNavItem: {
    marginRight: '1rem'
  },
  settings: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  
  menuItemIcon: {
    color: "rgba(0, 0, 0, 0.768)",
    marginRight: '1rem', 
  },
  textBookSection: {
    display: "flex",
    alignItems: 'center',
    flexDirection: "column"
  },
  

})) 