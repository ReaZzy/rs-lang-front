import MainPage from './pages/MainPage';
import TextBook from './pages/TextBookPage';
import { Switch, Route, Link } from 'react-router-dom';
import Sprint from './pages/games/Sprint/Sprint';

function App() {
  return (
    <div className='App'>
      <Link to='/'>Главная</Link>
      <Link to='/textbook'>Учебник</Link>
      <Link to='/sprint'>Sprint</Link>
      <Switch>
        <Route exact path='/'>
          <MainPage />
        </Route>
        <Route path='/textbook'>
          <TextBook />
        </Route>
        <Route path='/sprint'>
          <Sprint />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
