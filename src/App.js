import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import jwtdecode from "jwt-decode";
import "./App.css";
import Navbar from "./components/navBar";
import Home from "./components/hire/home";
import Login from "./components/hire/login";
import Register from "./components/hire/register";
import Logout from "./components/logout";
import Details from "./components/hire/details";
import PostJob from "./components/hire/postjob";
import LoginJobSeeker from "./components/seek/login";
import Apply from "./components/seek/apply";
import Applied from "./components/seek/applied";
import Registers from "./components/seek/register";
import Dashboard from "./components/hire/dashboard";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtdecode(jwt);
      this.setState({ user });
    } catch (error) {}
  }
  render() {
    return (
      <div>
        <Navbar user={this.state.user} />
        <Switch>
          <Route path="/seek/register" component={Registers}></Route>
          <Route path="/hire/dashboard" component={Dashboard}></Route>
          <Route path="/seek/applied" component={Applied}></Route>
          <Route path="/seek/apply/:id" component={Apply}></Route>
          <Route path="/seek/login" component={LoginJobSeeker}></Route>
          <Route path="/hire/post/:id" component={Details}></Route>
          <Route path="/hire/create" component={PostJob}></Route>
          <Route path="/hire/login" component={Login}></Route>
          <Route path="/hire/logout" component={Logout}></Route>
          <Route path="/hire/register" component={Register}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
