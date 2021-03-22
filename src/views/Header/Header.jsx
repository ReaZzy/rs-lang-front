import React from 'react';
import { NavLink } from "react-router-dom";
import { Container } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from '@material-ui/core/AppBar';

export const Header = () => {
  return (
    <header>
      <AppBar color="primary" position="static">
        <Container maxWidth="lg">
          <Toolbar color="primary"  >
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/textbook">Учебник</NavLink>
            <NavLink to="/my-words">Мои слова</NavLink>
          </Toolbar>
          </Container>
      </AppBar>
    </header>
  )
}