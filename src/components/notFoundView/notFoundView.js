import React, { Component } from "react";
import Link from "@material-ui/core/Link";
import "./notFoundView.css";

class NotFoundView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toGroups = () => {
    this.props.history.push("/groups");
  };
  render() {
    return (
      <div>
        <div className={"link-div"}>
          <Link href="#" onClick={this.toGroups}>
            Groups
          </Link>
        </div>
        <hr />
        <div className={"view-content"}>
          <h1>404</h1>
          <h2> Page Not Found</h2>
        </div>
      </div>
    );
  }
}

export default NotFoundView;
