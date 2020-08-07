import React, { Component } from "react";
import "../../dashboard.css";
import { Link } from "react-router-dom";
class Dashboard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <section>
          <nav>
            <ul>
              <li>
                <Link to="/hire/profile">profile</Link>
              </li>
              <li>
                <Link to="/hire/create">Post Job</Link>
              </li>
              <li>
                <Link to="/hire/profile">About</Link>
              </li>
            </ul>
          </nav>
        </section>
      </React.Fragment>
    );
  }
}

export default Dashboard;
