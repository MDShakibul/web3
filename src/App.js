import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Admin from './views/Admin';
import Mint from './views/Mint';
import Test from './views/Text';
import Test2 from './views/Test2';



/* Moralis.start({
  apiKey: process.env.REACT_APP_MORALIS_APY_KEY,
}); */

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Mint} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/test2" component={Test2} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
