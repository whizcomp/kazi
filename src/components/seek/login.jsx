import React from "react";
import { Link } from "react-router-dom";
import { apiEndPoint } from "../services/config.json";
import http from "../services/http";
import Joi from "joi-browser";
import Form from "./form";
export default class LoginJobSeeker extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  };
  doSubmit = async () => {
    const { data } = this.state;
    try {
      const { data: jwt } = await http.post(apiEndPoint + "/seek/login", data);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Apply Job</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
          <Link to="/hire/login" className="btn btn-primary btn-md m-2">
            Hire Employer
          </Link>
        </form>
      </div>
    );
  }
}
