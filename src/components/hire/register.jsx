import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { register } from "../middleService/registerService";
import Form from "./form";
class Register extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {}
  };
  doSubmit = async () => {
    try {
      const result = await register(this.state.data);
      localStorage.setItem("token", result.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;

        this.setState({ errors });
      }
    }
  };
  schema = {
    username: Joi.string()
      .required()
      .min(5)
      .max(255)
      .trim(),
    email: Joi.string()
      .required()
      .email()
      .min(3)
      .max(255)
      .trim(),
    password: Joi.string()
      .required()
      .min(6)
      .max(255)
  };
  render() {
    return (
      <div className="container">
        <h1>Register </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("email", "Email", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
          <Link to="/seek/register" className="btn btn-primary btn-md m-2">
            sign up for a job
          </Link>
        </form>
      </div>
    );
  }
}

export default Register;
