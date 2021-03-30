import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from './styles.module';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

export default function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <HomeIcon className={classes.menuItemIcon} />
          <NavLink to='/' className={classes.menuLink}>
            Main
          </NavLink>
        </MenuItem>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <MenuBookIcon className={classes.menuItemIcon} />
          <NavLink to='/textbook' className={classes.menuLink}>
            Textbook
          </NavLink>
        </MenuItem>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <SpellcheckIcon className={classes.menuItemIcon} />
          <NavLink to='/my-words' className={classes.menuLink}>
            My words
          </NavLink>
        </MenuItem>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <SportsEsportsIcon className={classes.menuItemIcon} />
          <NavLink to='/sprint' className={classes.menuLink}>
            Sprint game
          </NavLink>
        </MenuItem>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          {' '}
          <SportsEsportsIcon className={classes.menuItemIcon} />
          <NavLink to='/savanna' className={classes.menuLink}>
            Savanna
          </NavLink>
        </MenuItem>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <SportsEsportsIcon className={classes.menuItemIcon} />
          <NavLink to='/audio-challenge' className={classes.menuLink}>
            Audio challenge
          </NavLink>
        </MenuItem>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <SportsEsportsIcon className={classes.menuItemIcon} />
          <NavLink to='/our-game' className={classes.menuLink}>
            Memory game
          </NavLink>
        </MenuItem>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <GroupIcon className={classes.menuItemIcon} />
          <NavLink to='/team' className={classes.menuLink}>
            Team
          </NavLink>
        </MenuItem>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <EqualizerIcon className={classes.menuItemIcon} />
          <NavLink to='/progress' className={classes.menuLink}>
            Progress
          </NavLink>
        </MenuItem>
        <MenuItem
          style={{ color: '#f7e5ff' }}
          className={classes.menuItem}
          onClick={handleClose}
        >
          <SettingsIcon className={classes.menuItemIcon} />
          <NavLink to='/settings' className={classes.menuLink}>
            Settings
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
