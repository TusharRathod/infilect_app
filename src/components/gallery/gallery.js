import React, { Component } from "react";
import Header from "../../common/header/header";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Avatar,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { group_info, gallery_data } from "../../services/axios/services";
import "./gallery.css";

const useStyles = (theme) => ({
  card: {
    width: "100%",
    height: "auto",
    // backgroundColor: "red",
  },
  // root: {
  //   maxWidth: 345,
  // },
  cardContent: {
    display: "flex",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatar: {
    margin: "10px",
  },
  groupInfoContent: {
    width: "40%",
    padding: "16px",
  },
});
//these are the api perameter.
const api_key = "b7536fe05933a39887d06b8860742e25";
const per_page = 300;
const page = 1;

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupInfo: {},
      galleryData: [],
      id: "",
      skeleton: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      loader: true,
      errorMsg: "",
      stat: "",
    };
  }
  componentDidMount = () => {
    var { id } = this.props.match.params; //id extract from url..
    this.groupInfo(id);
    this.getGalleryData(id);
  };
  groupInfo = (group_id) => {
    this.setState({ loader: true }); //loader start...
    group_info({ api_key, group_id }) //call group info api from services.js
      .then((res) => {
        if (res.data.stat === "ok") {
          this.setState({ groupInfo: res.data.group, loader: false }); //loader stop
        } else if (res.data.stat === "fail") {
          this.setState({ errorMsg: res.data.message, stat: res.data.stat });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getGalleryData = (group_id) => {
    gallery_data({ api_key, group_id, per_page, page }) //call gallery data api from services.js
      .then((res) => {
        if (res.data.stat === "ok") {
          this.setState({ galleryData: res.data.photos.photo });
        } else if (res.data.stat === "fail") {
          this.setState({ errorMsg: res.data.message, stat: res.data.stat });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  mouseEnter = (id) => {
    this.setState({ id }); //Mouse Enter on the photo then show thier name and authar.
  };
  mouseLeave = () => {
    this.setState({ id: "" });
  };
  back = () => {
    this.props.history.push("/groups");
  };
  render() {
    const { classes } = this.props;
    var { groupInfo, galleryData } = this.state;
    return (
      <div>
        <Header back={true} backButton={this.back} />
        <div className={"gallery-container"}>
          {this.state.stat !== "fail" ? (
            <div>
              <div className={"group_info_detail"}>
                {this.state.loader ? (
                  <Skeleton variant="rect" height={100} /> // skelton loading...
                ) : (
                  <Card className={classes.card}>
                    <div className={classes.cardContent}>
                      <div className={classes.avatar}>
                        {groupInfo && (
                          <Avatar
                            alt="Remy Sharp"
                            src={`https://farm${groupInfo.iconfarm}.staticflickr.com/${groupInfo.iconserver}/buddyicons/${groupInfo.nsid}.jpg`}
                            className={classes.large}
                          />
                        )}
                      </div>
                      <div className={classes.groupInfoContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {groupInfo && groupInfo.name._content}{" "}
                        </Typography>

                        <div className={"group_info_body"}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {groupInfo && groupInfo.members._content} Members
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {groupInfo && groupInfo.pool_count._content} Photos
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {groupInfo && groupInfo.topic_count._content}{" "}
                            Discussions
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
              <div className={"gallery-grid-list"}>
                <GridList
                  cellHeight={250}
                  className={classes.gridList}
                  cols={3}
                >
                  {galleryData.length
                    ? galleryData.map((tile, index) => (
                        <GridListTile
                          onMouseEnter={() => this.mouseEnter(tile.id)}
                          onMouseLeave={() => this.mouseLeave()}
                          key={tile.id}
                          cols={index % 5 === 0 ? 2 : 1}
                        >
                          <img
                            src={`https://farm${tile.farm}.staticflickr.com/${tile.server}/${tile.id}_${tile.secret}.jpg`}
                            alt={tile.title}
                            style={{ width: "100%", height: "100%" }}
                          />
                          {tile.id === this.state.id && ( //checking id and show name and authar.
                            <GridListTileBar
                              title={tile.title}
                              subtitle={<span>author: {tile.ownername}</span>}
                            />
                          )}
                        </GridListTile>
                      ))
                    : this.state.skeleton.map((index) => (
                        <GridListTile
                          key={index}
                          cols={index % 5 === 0 ? 2 : 1}
                        >
                          <Skeleton key={index} variant="rect" height={250} />{" "}
                          {/* skelton loading...*/}
                        </GridListTile>
                      ))}
                </GridList>
              </div>
            </div>
          ) : (
            <div className={"group_info_detail"}>
              {" "}
              <h1>{this.state.errorMsg}</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Gallery);
