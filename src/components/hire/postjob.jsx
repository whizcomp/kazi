import React from "react";
import Joi from "joi-browser";
import http from "../services/http";
import Form from "./form";
import { apiEndPoint } from "../services/config";
class PostJob extends Form {
  state = {
    data: {
      title: "",
      availableId: "",
      categoryId: "",
      place: "",
      requirements: "",
      responsibilities: "",
      qualification: "",
      experience: "",
      numberOfemployees: "",
      company: ""
    },
    available: [],
    category: [],
    errors: {}
  };
  schema = {
    title: Joi.string()
      .required()
      .min(2)
      .max(25),
    availableId: Joi.string().required(),
    categoryId: Joi.string().required(),
    place: Joi.string()
      .required()
      .min(2)
      .max(25),
    requirements: Joi.string()
      .required()
      .min(10)
      .max(1000),
    responsibilities: Joi.string()
      .required()
      .min(10)
      .max(100),
    qualification: Joi.string()
      .required()
      .min(10)
      .max(100),
    experience: Joi.string()
      .required()
      .min(2)
      .max(25),
    numberOfemployees: Joi.number()
      .required()
      .min(1)
      .max(10000),
    company: Joi.string()
      .required()
      .min(2)
      .max(25)
  };
  doSubmit = async () => {
    try {
      const job = await http.post(apiEndPoint + "/hire/posts", this.state.data);
      this.setState({ job });
      alert('job successfully submitted')
      this.props.history.push('/')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.title = error.response.data;
        this.setState({ errors });
      }
    }
  };
  async componentDidMount() {
    const { data: available } = await http.get(apiEndPoint + "/hire/types");
    const { data: category } = await http.get(apiEndPoint + "/hire/category");
    this.setState({ available, category });
  }
  render() {
    return (
      <div className="container">
        <p className="lead justify-content-lg-center ">Post job</p>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="col-6">
                {this.renderInput("title", "Title", "text")}
                {this.renderSelect(
                  "availableId",
                  "Availability",
                  this.state.available
                )}
                {this.renderSelect(
                  "categoryId",
                  "Category",
                  this.state.category
                )}
                {this.renderInput("place", "Place", "text")}
                {this.renderInput("numberOfemployees", "Employees", "number")}
                {this.renderInput("company", "Company", "text")}
              </div>
            </div>
            <div className="col-xs-0 col-sm-0 col-md-6 col-lg-6 col-xl-6">
              <div className="col-6">
                {this.renderInput("requirements", "Requirements", "textarea")}
                {this.renderInput("qualification", "Qualification", "textarea")}
                {this.renderInput(
                  "responsibilities",
                  "responsibilities",
                  "textarea"
                )}
                {this.renderInput("experience", "Experience", "textarea")}

                {this.renderButton("Submit")}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default PostJob;
