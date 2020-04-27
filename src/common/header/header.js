import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
// import Button from '@material-ui/core/Button';
import { KeyboardBackspace } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {props.back && (
            <IconButton onClick={() => props.backButton()}>
              <KeyboardBackspace style={{ color: "white" }} />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Infilect_app
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
