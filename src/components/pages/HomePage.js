import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./../layout/Header";
import CssBaseline from "@material-ui/core/CssBaseline";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    marginTop: "20px",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "#3f51b5",
  },
}));

function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main className={classes.content}>
        <div>
          <Paper className={classes.container}>
            <Typography variant="h2" gutterBottom>
              Speech-To-Text featured Media Manager
            </Typography>
            <Typography variant="h4" gutterBottom>
              About us
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Media Manager is a modern media manager and player which supports
              text keyword searching inside the video/audio. To enjoy our
              services and explore many features we provide, you need to{" "}
              <NavLink className={classes.link} to="/signup">
                {" "}
                sign up
              </NavLink>{" "}
              into Media Manager.
            </Typography>
            <Typography variant="h4" gutterBottom>
              <br></br>
              Services
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              With just registering to Media Manager, you can upload, download,
              transcribe and modify your media files with great ease. With the
              help of a built-in Media Player in the application, you can
              retrieve and play any media files with the provided URL. You can
              download the whole text file in JSON or TEXT format for further
              use.
            </Typography>
            <Typography variant="h4" gutterBottom>
              <br></br>
              Contact us
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Our support team:
              <a className={classes.link} href="mailto:substansiya@gmail.com">
                {" "}
                substansiya@gmail.com{" "}
              </a>
              <br />
              Phone number:
              <a className={classes.link} href="/">
                {" "}
                +36 20 417 03 39{" "}
              </a>
              <br />
              Other products:
              <a className={classes.link} href="https://github.com/AkshinK">
                {" "}
                Products{" "}
              </a>
              <br />
            </Typography>
          </Paper>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
