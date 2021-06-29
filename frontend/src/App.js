import {BrowserRouter} from 'react-router-dom';
import routes from './routes';
import theme from "./theme";
import {TopBar, Footer} from './layout'
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container} from './components';
import {production} from './config';

function App() {
  if(production && !window.location.href.includes('rukos.tv')){
    window.location.href = 'http://www.rukos.tv/'
  }
  return (
    <>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <div>
            <TopBar />
            <Container>
              {routes()}
            </Container>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
    </>
  );
}

export default App;
