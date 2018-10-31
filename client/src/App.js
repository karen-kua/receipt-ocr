import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Upload from "./pages/Upload";

import BrowseBackEnd from "./pages/BrowseBackEnd";
<<<<<<< HEAD
import Browse from "./pages/Browse";
=======
// import Browse from "./pages/Browse";

>>>>>>> b14566a330f8f01a8a5095b73c3cd18136da6fd0
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
<<<<<<< HEAD
        <Route exact path="/browse" component={Browse}/>
        {/* <Route exact path="/sign-in" component={SignIn} /> */} */}
=======
        {/* <Route exact path="/browse" component={Browse} />
        <Route exact path="/sign-in" component={SignIn} /> */}


>>>>>>> b14566a330f8f01a8a5095b73c3cd18136da6fd0
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;

