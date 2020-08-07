import React from "react";

import http from "../services/http";
import { apiEndPoint } from "../services/config.json";
import Form from "../seek/form";

class Details extends Form {
  state = {
    data: {
      postId: "",
      user: ""
    },
    details: []
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const { data: details } = await http.get(apiEndPoint + "/hire/posts/" + id);

    this.setState({ details });
  }
  onSubmit = () => {
    console.log("submitted");
  };
  handleData = id => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        this.props.history.push("/seek/login");
      } else {
        http.post(apiEndPoint + "/seek/apply", { postId: id });
        this.props.history.push("/seek/applied");
      }
    } catch (error) {
      if (error.response && error.response.data === 401) {
        this.props.history.push("/seek/login");
      }
    }
  };
  render() {
    const { details } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-0 col-sm-0 col-md-3 col-lg-3 col-xl-3"></div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  ">
            <p
              className="lead text-center"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              {details.title}
              <br />
              <i
                className="fa fa-map-marker"
                style={{ color: "black", textDecoration: "none" }}
              >
                {details.place} {details.experience}
              </i>
            </p>

            <p className="lead text-center">requirements</p>
            {details.requirements}
            <p className="lead text-center">responsibilities</p>
            {details.responsibilities}
            <p className="lead text-center">qualification</p>
            {details.qualification}
            <p className="lead text-center">qualification</p>
            {details.qualification}
            <p>
              <button
                onClick={() => this.handleData(this.props.match.params.id)}
                className="btn btn-outline-secondary btn-sm"
              >
                Apply
              </button>
            </p>
          </div>
          <div className="col-xs-0 col-sm-0 col-md-3 col-lg-3 col-xl-3"></div>
        </div>
      </div>
    );
  }
}
export default Details;
