import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from './styles.module';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import SettingsIcon from '@material-ui/icons/Settings';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { useSelector } from 'react-redux';

export default function SimpleMenu (){
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isAuthenticated = !!useSelector(
    (state) => state.auth.userInfo?.token
);

  

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='open drawer'
        onClick={handleClick}
        edge='start'
        color='inherit'
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isAuthenticated && <>
          
        <NavLink to='/textbook' className={classes.menuLink}>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <MenuBookIcon className={classes.menuItemIcon} />
            Textbook
        </MenuItem>
        </NavLink>
        <NavLink to='/my-words/0' className={classes.menuLink}>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <SpellcheckIcon className={classes.menuItemIcon} />
            My words
        </MenuItem>
        </NavLink>
        <NavLink to='/sprint' className={classes.menuLink}>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <SportsEsportsIcon className={classes.menuItemIcon} />
            Sprint game
        </MenuItem>
        </NavLink>
        <NavLink to='/savanna' className={classes.menuLink}>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          {' '}
          <SportsEsportsIcon className={classes.menuItemIcon} />
            Savanna
        </MenuItem>
        </NavLink>
        <NavLink to='/audio-challenge' className={classes.menuLink}>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <SportsEsportsIcon className={classes.menuItemIcon} />
            Audio challenge
        </MenuItem>
        </NavLink>
        <NavLink to='/our-game' className={classes.menuLink}>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <SportsEsportsIcon className={classes.menuItemIcon} />
            Memory game
        </MenuItem>
        </NavLink>
       
        <NavLink to='/settings' className={classes.menuLink}>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <SettingsIcon className={classes.menuItemIcon} />
            Settings
        </MenuItem>
        </NavLink>
        <NavLink to='/english-test' className={classes.menuLink}>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <BorderColorIcon className={classes.menuItemIcon} />
            Enlish Test
        </MenuItem>
        </NavLink>
        </>
        
        }
        <NavLink to='/' className={classes.menuLink}>
          <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
          >

          <HomeIcon className={classes.menuItemIcon} />
            Main
        </MenuItem>
        </NavLink>
        
        
        <NavLink to='/team' className={classes.menuLink}>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <GroupIcon className={classes.menuItemIcon} />
            Team
        </MenuItem>
        </NavLink>
      
      
      
      </Menu>
    </div>
  );
}
