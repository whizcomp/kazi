import React from "react";
import { Link } from "react-router-dom";
const Post = ({ posts }) => {
  return (
    <React.Fragment>
      {posts.map(post => (
        <div key={post._id}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                <Link to={`/hire/post/${post._id}`}>{post.title}</Link>
                <span style={{ float: "right" }}>{post.company}</span>
              </h4>
              <small>{post.place}</small> | <small>{post.available.name}</small>
              <br />
              <small>{post.experience}</small>
              <p className="card-text"></p>
            </div>
          </div>
          <br />{" "}
        </div>
      ))}
    </React.Fragment>
  );
};

export default Post;
