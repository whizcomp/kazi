import React, { Component } from "react";
import http from "../services/http";
import { apiEndPoint } from "../services/config.json";
class Apply extends Component {
  state = {
    applied:[]
  };
  async componentDidMount() {
    const { data } = await http.get(apiEndPoint + '/seek/apply/');
    console.log(data);
  }
  render() {
    return <h1>applied successfully</h1>;
  }
}

export default Apply;
