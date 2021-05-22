import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player/lazy";
import Header from "../layout/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  video: {
    height: "80%",
    width: "100%",
  },

  fixedHeight: {
    height: 240,
  },
}));
export default function Player() {
  const ref = React.createRef();
  const [url, seturl] = useState("");
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <div className={classes.video}>
            <ReactPlayer
              ref={ref}
              url={url}
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Insert Media Link"
              variant="outlined"
              onChange={(e) => seturl(e.target.value)}
            />
          </form>
        </main>
      </div>
    </Fragment>
  );
}
