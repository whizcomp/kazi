import React, { Component } from "react";
import jwtdecode from "jwt-decode";
import http from "../services/http";
import { apiEndPoint } from "../services/config.json";
class Applied extends Component {
  state = {
    applied: [],
    user: []
  };
  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtdecode(jwt);
        const { data: applied } = await http.get(apiEndPoint + "/seek/apply/");
        console.log(applied)
      this.setState({ applied, user });
      
    } catch (error) {}
  }
  render() {
      const { applied } = this.state;
    return (
      <div>
        <table className="table">
            <thead>
                    <tr>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                 
                </thead>
                
                <tbody>
                    {applied.map(apply => <tr>
                        <td>{apply.job.title}</td>
                        <td> <i className="fa fa-trash"></i> </td>
                    </tr>)}
                   
                    
                    
                </tbody>
        </table>
      </div>
    );
  }
}

export default Applied;
