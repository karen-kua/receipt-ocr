import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Upload from "./pages/Upload/Upload";
import UploadSuccess from "./pages/Upload/UploadSuccess";
import NoReceipt from "./pages/Upload/NoReceipt.js";
import Browse from "./pages/Browse";
import SignUp from './pages/LogIn/SignUp';
import LogIn from './pages/LogIn/LogIn';
import Home from './pages/Home/Home';
import Sidebar from "./components/Sidebar";

const App = () => (
  <Router>
    <div>
      <Sidebar />
      <Switch>
      <Route exact path="/" component={Home} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/upload-success" component={UploadSuccess} />
        <Route exact path="/upload-user-input" component={NoReceipt} />
        <Route exact path="/browse" component={Browse} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </div>
  </Router>
);

export default App;

