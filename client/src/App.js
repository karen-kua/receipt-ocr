import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Upload from "./pages/Upload";
import BrowseBackEnd from "./pages/BrowseBackEnd";
// import Browse from "./pages/Browse";
// import SignIn from "./pages/SignIn";
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/test" component={BrowseBackEnd} />
        {/* <Route exact path="/browse" component={Browse} />
        <Route exact path="/sign-in" component={SignIn} /> */}
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;

