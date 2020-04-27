import React, { Component } from "react";
import Header from "../../common/header/header";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Card,
  // CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Avatar,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Skeleton from "@material-ui/lab/Skeleton";
import { search_group } from "../../services/axios/services";
import { Pie } from "react-chartjs-2";
import "./groups.css";

//these are the api perameter.

const api_key = "b7536fe05933a39887d06b8860742e25";
const per_page = 20;
const page = 1;

const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
  },
  cardContent: {
    display: "flex",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatar: {
    margin: "10px",
  },
});

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      groupsData: [],
      suggestions: [],
      skeleton: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      loader: false,
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    };
  }
  componentDidMount = () => {
    this.searchData();
  };
  handleChangeSearchText = (event, newValue) => {
    this.setState({ searchText: newValue });
  };
  onEnterSearch = (event) => {
    if (event.key === "Enter") {
      this.getGroupData();
    }
  };
  searchData = () => {
    // call search group api from services.js file
    search_group({ api_key, value: "nature", per_page, page })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ suggestions: res.data.groups.group });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  searchGroup = () => {
    this.getGroupData();
  };

  getGroupData = () => {
    if (this.state.searchText) {
      //loader start
      this.setState({ loader: true });
      // call search group api from services.js file
      search_group({ api_key, value: this.state.searchText, per_page, page })
        .then((res) => {
          if (res.status === 200) {
            let labels = [];
            let data = [];
            let backgroundColor = [];
            let response = res.data.groups.group;
            // res.data.groups.group.map((group) => {
            for (let i = 0; i < response.length; i++) {
              labels.push(response[i].name);
              data.push(parseInt(response[i].pool_count)); //these is the graph data...
              backgroundColor.push(
                "rgb(" +
                  Math.floor(Math.random() * 256) +
                  "," +
                  Math.floor(Math.random() * 256) +
                  "," +
                  Math.floor(Math.random() * 256) +
                  ")"
              );
            }
            let datasets = [{ data, backgroundColor }];
            this.setState({
              groupsData: res.data.groups.group,
              labels,
              datasets,
              loader: false,
            }); //loader stop
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("Search text required");
    }
  };
  groupDetail = (id) => {
    this.props.history.push("/gallery/" + id);
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className={"groups-container"}>
          <div className={"groups-search-box"}>
            <div className={"groups-search-field"}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                onChange={this.handleChangeSearchText}
                options={this.state.suggestions.map((option) => option.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Groups"
                    margin="normal"
                    variant="outlined"
                    onKeyUp={this.onEnterSearch}
                    //   fullWidth={false}
                    size={"small"}
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            </div>
            <div className={"groups-search-button"}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.searchGroup}
              >
                Search
              </Button>
            </div>
          </div>
          {/* goups card detail */}
          <div className={"groupCards"}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7} md={7} lg={7}>
                <Grid container spacing={3}>
                  {!this.state.loader
                    ? this.state.groupsData.map((group, index) => (
                        <Grid key={index} item xs={12} sm={12} md={6} lg={6}>
                          <Card>
                            <CardActionArea
                              onClick={() => this.groupDetail(group.nsid)}
                            >
                              <div className={classes.cardContent}>
                                <div className={classes.avatar}>
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={`https://farm${group.iconfarm}.staticflickr.com/${group.iconserver}/buddyicons/${group.nsid}.jpg`}
                                    className={classes.large}
                                  >
                                    {group.name[0]}
                                  </Avatar>
                                </div>
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                  >
                                    {group.name}{" "}
                                  </Typography>
                                  <div style={{ display: "flex", margin: 5 }}>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                    >
                                      members : {group.members}
                                    </Typography>
                                  </div>
                                </CardContent>
                              </div>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))
                    : this.state.skeleton.map((digit, index) => (
                        <Grid key={index} item xs={12} sm={6} md={6} lg={6}>
                          <Skeleton variant="rect" height={100} />
                        </Grid>
                      ))}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={5} md={5} lg={5}>
                {this.state.labels.length !== 0 && (
                  <Card style={{ width: "100%", height: "auto" }}>
                    <Pie
                      data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets,
                      }}
                      height={100}
                      width={100}
                    />
                  </Card>
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Groups);
