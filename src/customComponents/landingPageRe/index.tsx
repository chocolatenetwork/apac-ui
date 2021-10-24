import { loader, message } from 'chocolate/App';
import { useSubstrate } from 'chocolate/substrate-lib';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import About from '../About';
import Gallery from '../Gallery';
import MenuBar from '../menuBar';
import ProjectProfile from '../ProjectProfile';
import ProjectsRe from '../ProjectsRe';
import Team from '../Team';
import WallOfShame from '../WallOfShame';
import './landing.css';

const queryCache = new QueryCache();
const client = new QueryClient({ queryCache });

function Main(): JSX.Element {
  const { apiState, apiError } = useSubstrate();

  if (apiState === 'ERROR') return message(apiError);
  if (apiState !== 'READY') return loader('Connecting to Substrate');
  return (
    <div className='root-wrap'>
      <QueryClientProvider contextSharing client={client}>
        <Router>
          <MenuBar />
          <Switch>
            <Redirect exact from='/substrate-front-end-template' to='/' />
            <Route exact path='/'>
              <ProjectsRe />
            </Route>
            <Route path='/gallery'>
              <Gallery />
            </Route>
            <Route path='/wall-of-shame'>
              <WallOfShame />
            </Route>
            <Route path='/project/:id'>
              <ProjectProfile />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/team'>
              <Team />
            </Route>
            <Route path='*'>{message('404! Not found', true)}</Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default Main;
