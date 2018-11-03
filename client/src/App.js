import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Upload from "./pages/Upload";
import Browse from "./pages/Browse";
import BrowseBackEnd from "./pages/BrowseBackEnd";
// import SignIn from "./pages/SignIn";
import SignUp from './pages/LogIn/SignUp';
import LogIn from './pages/LogIn/LogIn';
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/browse" component={Browse} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/sign-up" component={SignUp} />
        {/* <Route exact path="/sign-in" component={SignIn} /> */}
        <Route exact path="/test" component={BrowseBackEnd} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;

