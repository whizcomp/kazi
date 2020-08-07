import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { Link } from "react-router-dom";
import http from "../services/http";
const apiEndPoint = "http://localhost:9000/hire/login";
class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .email()
      .max(255)
      .trim()
      .required()
      .min(3),
    password: Joi.string()
      .required()
      .min(6)
      .max(255)
  };

  doSubmit = async () => {
    const { data } = this.state;
    try {
      const { data: jwt } = await http.post(apiEndPoint, data);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="container justify-content-lg-center">
        <h1>Login Employer</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
          <Link to="/seek/login" className="btn btn-primary btn-md m-2">
            apply job
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
