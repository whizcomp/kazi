import React, { Component } from "react";
import http from "../services/http";
import { apiEndPoint } from "../services/config.json";
import Post from "./post";
import Pagination from "../common/pagination";
import { paginate } from "../common/paginate";
import ListGroup from "../common/listGroup";
import ListGroups from "../common/listGroups";

const apiUrl = apiEndPoint + "/hire/posts";
class Home extends Component {
  state = {
    posts: [],
    types: [],
    category: [],
    selectedItem: null,
    selectedItems: null,
    currentPage: 1,
    pageSize: 3
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  async componentDidMount() {
    const { data } = await http.get(apiEndPoint + "/hire/types");
    const types = [{ _id: "", name: "All Types" }, ...data];
    const { data: category } = await http.get(apiEndPoint + "/hire/category");

    const { data: posts } = await http.get(apiUrl);
    this.setState({
      posts,
      types,
      category: [{ id: "", name: "Category" }, ...category]
    });
  }
  handleSelect = item => {
    this.setState({ selectedItem: item, currentPage: 1 });
  };
  handleSelects = items => {
    this.setState({ selectedItems: items, currentPage: 1 });
  };
  render() {
    const {
      posts: allPosts,
      pageSize,
      currentPage,
      selectedItem,
      selectedItems
    } = this.state;
    const groups =
      selectedItems && selectedItems._id
        ? allPosts.filter(p => p.category._id === selectedItems._id)
        : allPosts;
    const filtered =
      selectedItem && selectedItem._id
        ? groups.filter(m => m.available._id === selectedItem._id)
        : groups;
    const posts = paginate(filtered, currentPage, pageSize);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.types}
              selectedItem={this.state.selectedItem}
              onItemSelect={this.handleSelect}
            />
          </div>

          <div className="col-6">
            <Post posts={posts} />
            <Pagination
              itemsCount={allPosts.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
          <div className="col-3">
            <ListGroups
              items={this.state.category}
              selectedItem={this.state.selectedItems}
              onItemSelect={this.handleSelects}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
