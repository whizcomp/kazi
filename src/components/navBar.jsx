import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md bg-light navbar-light sticky-top ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fa fa-home"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="#navbarResponsive">
           
          <ul className="navbar-nav ml-auto">
            
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/hire/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/hire/register">
                    Register
                  </Link>
                </li>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                 
             
            {user.isHirer&&<li className="nav-item ">
              <Link className="nav-link" to="/hire/create">
                Post Job
              </Link>
            </li>}
                <li className="nav-item">
                  <Link className="nav-link" to="/hire/profile">
                    {user.username||user.firstname}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/hire/logout">
                    logout
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
