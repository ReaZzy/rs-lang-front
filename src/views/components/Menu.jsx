import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import styles from './styles.module.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}> */}
      <IconButton
        color='#fff'
        aria-label='open drawer'
        onClick={handleClick}
        edge='start'
        color='inherit'
        className={styles.menuButton}
      >
        <MenuIcon className={styles.MenuIcon} />
      </IconButton>
      {/* </Button> */}
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to='/' className={styles.link}>
            Главная
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to='/textbook' className={styles.link}>
            Учебник
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to='/my-words' className={styles.link}>
            Мои слова
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to='/sprint' className={styles.link}>
            Sprint game
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
