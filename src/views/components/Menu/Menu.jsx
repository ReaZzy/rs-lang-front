import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import styles from "./styles.module.css";
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HomeIcon from '@material-ui/icons/Home';

export default function SimpleMenu() {
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
            aria-label="open drawer"
            onClick={handleClick}
            edge="start"
            color="inherit"
            className={styles.menuButton}
          >
          <MenuIcon className={styles.menuIcon}/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem style={{color: "#f7e5ff"}} className={styles.menu__item} onClick={handleClose}>
          <HomeIcon  className={styles.icon}/>
          <NavLink to="/" className={styles.link}>Главная</NavLink>
        </MenuItem>
        <MenuItem style={{color: "#f7e5ff"}} className={styles.menu__item} onClick={handleClose}>
          <MenuBookIcon  className={styles.icon}/>
          <NavLink to="/textbook" className={styles.link}>Учебник</NavLink>
        </MenuItem>
        <MenuItem style={{color: "#f7e5ff"}} className={styles.menu__item} onClick={handleClose}>
          <SpellcheckIcon  className={styles.icon}/>
          <NavLink to="/my-words" className={styles.link}>Мои слова</NavLink>
        </MenuItem>
        <MenuItem style={{color: "#f7e5ff"}} className={styles.menu__item} onClick={handleClose}>
          <GroupIcon  className={styles.icon}/>
          <NavLink to="/team" className={styles.link}>О команде</NavLink>
        </MenuItem>
        <MenuItem style={{color: "#f7e5ff"}} className={styles.menu__item} onClick={handleClose}>
          <EqualizerIcon  className={styles.icon}/>
          <NavLink to="/progress" className={styles.link}>Прогресс</NavLink>
        </MenuItem>
        <MenuItem style={{color: "#f7e5ff"}} className={styles.menu__item} onClick={handleClose}>
          <SettingsIcon  className={styles.icon}/>
          <NavLink to="/settings" className={styles.link}>Настройки</NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}

            
            