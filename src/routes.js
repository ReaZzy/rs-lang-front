import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './pages/MainPage';
import EnglishTestPage from './pages/EnglishTest';
import TextBookMain from './pages/TextBookMain';
import RegisterPage from './pages/Register';
import { LoginPage } from './pages/Login/LoginPage';
import MyWordsPage from './pages/MyWordsPage';
import TeamPage from './pages/TeamPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import TextBookPageWrapper from './pages/TextBookPageWrapper';
import Savanna from './pages/games/Savanna';
import Sprint from './pages/games/Sprint';

import AudioChallenge from './pages/games/AudioChallenge/AudioChallenge';
import OurCustomGame from './pages/games/OurCustomGame/OurCustomGame';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    // TextBook - просто список модулей. Менюшка для перемещения по учебнику

    return (
      <Switch>
        <Route path='/' exact>
          <MainPage />
        </Route>
        <Route path='/textbook' exact>
          <TextBookMain /> 
        </Route>
        <Route path='/textbook/:module/:page?'>
          <TextBookPageWrapper />
        </Route>
        <Route path='/my-words/:page'>
          <MyWordsPage />
        </Route>
        <Route path='/team'>
          <TeamPage />
        </Route>
        <Route path='/progress'>
          <ProgressPage />
        </Route>
        <Route path='/settings'>
          <SettingsPage />
        </Route>
        <Route path='/sprint'>
          <Sprint />
        </Route>
        <Route path='/savanna'>
          <Savanna />
        </Route>
        <Route path='/audio-challenge'>
          <AudioChallenge />
        </Route>
        <Route path='/english-test'> 
          <EnglishTestPage />
        </Route>
        <Route path='/our-game'>
          <OurCustomGame />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path='/' exact>
        <MainPage />
      </Route>
      <Route path='/register' exact>
        <RegisterPage />
      </Route>
      <Route path='/login' exact>
        <LoginPage />
      </Route>
      <Route path='/team'>
          <TeamPage />
        </Route>
      <Redirect to='/' />
    </Switch>
  );
};
