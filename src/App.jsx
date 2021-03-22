import MainPage from './pages/MainPage'
import TextBook from './pages/TextBookPage'
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, Container } from "@material-ui/core";
import { theme } from "./theme";
import { Header } from './views/Header/Header'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main className="App">
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/textbook">
              <TextBook />
            </Route>
          </Switch>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default App;
