import MainPage from './pages/MainPage'
import TextBook from './pages/TextBookPage'
import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Link to="/">Главная</Link>
      <Link to="/textbook">Учебник</Link>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/textbook">
          <TextBook />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
