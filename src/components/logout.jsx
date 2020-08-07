import { Component } from "react";
class Logout extends Component {
  state = {};
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/hire/login";
  }
  render() {
    return null;
  }
}

export default Logout;
