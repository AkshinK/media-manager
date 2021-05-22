import React, { Component, Fragment } from "react";
import SignUp from "./components/user/SignUp";
import SignIn from "./components/user/SignIn";
import NotFound from "./components/pages/NotFound";
import { Provider as AlertProvider } from "react-alert";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import Alerts from "./components/layout/Alerts";
import AlertMUITemplate from "react-alert-template-mui";
import PrivateRoute from "./components/common/PrivateRouter";
import HomePage from "./components/pages/HomePage";
import { createBrowserHistory } from "history";
import Player from "./components/pages/Player";
import Create from "./components/pages/Create";
import Files from "./components/pages/Files";
import WatchVideo from "./components/pages/WatchVideo";
import Subtitles from "./components/pages/Subtitles";
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

export const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertMUITemplate} {...alertOptions}>
          <Router history={history}>
            <Fragment>
              <Alerts />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <PrivateRoute path="/player" component={Player} />
                <PrivateRoute path="/create" component={Create} />
                <PrivateRoute path="/watch/:videoId" component={WatchVideo} />
                <PrivateRoute path="/files" component={Files} />
                <PrivateRoute path="/subtitles" component={Subtitles} />
                <Route component={NotFound} />
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
