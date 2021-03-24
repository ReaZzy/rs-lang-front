
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import  Header  from './views/Header'
import  Footer  from './views/Footer'
import { useSelector } from "react-redux";
import { useRoutes } from './routes';

function App() {
   
    const isAuthenticated = !!useSelector(state => state.auth.userInfo?.token);
   
    const routes = useRoutes(isAuthenticated);

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
            <main>
                {routes}
            </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
}

export default App;