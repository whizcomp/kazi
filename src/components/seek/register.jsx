import React from "react";
import http from "../services/http";
import { apiEndPoint } from "../services/config.json";
import Joi from "joi-browser";
import Form from "../hire/form";
class Registers extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      email: "",
      categoryId: "",
      password: ""
    },
    errors: {},
    category: []
  };
  schema = {
    firstname: Joi.string()
      .min(3)
      .max(25)
      .required(),
    lastname: Joi.string()
      .min(3)
      .max(25)
      .required(),
    email: Joi.string()
      .email()
      .min(3)
      .max(255)
      .required(),
    categoryId: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  };
  async componentDidMount() {
    const { data: category } = await http.get(apiEndPoint + "/hire/category");
    this.setState({ category });
  }
  doSubmit = async () => {
    const { data } = this.state;
    try {
        const result = await http.post(apiEndPoint + "/seek/register", data);
        localStorage.setItem('token', result.headers['x-auth-token']);
        window.location = '/';
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
      <div className="container">
        <h5>Register to apply</h5>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstname", "Firstname", "text")}
          {this.renderInput("lastname", "Lastname", "text")}
          {this.renderSelect("categoryId", "Category", this.state.category)}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Registers;
