import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player/lazy";

import { clearAudios, getAudio, transcribeAudio } from "../../actions/audios";
import { timeSince } from "../../utils";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../layout/Header";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    paddingTop: theme.spacing(4),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  video: {
    height: "80%",
    width: "100%",
  },
  control: {
    padding: theme.spacing(2),
  },
  fixedHeight: {
    height: 240,
  },
}));
const styles = {
  display: "inline",
  width: "30%",
  height: 50,
  float: "left",
  padding: 5,
  border: "0.5px solid black",
  marginBottom: 10,
  marginRight: 10,
};

function WatchVideo(props) {
  const ref = React.createRef();
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);

  const classes = useStyles();

  const { videoId } = useParams();

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = allData.filter((data) => {
      return data[0].search(value) !== -1;
    });
    setFilteredData(result);
    console.log(filteredData);
  };
  const dispatch = useDispatch();
  const usersInfo = useSelector((state) => state.audios.audios);

  let cnt = 0;
  const url = usersInfo.text;

  const handleFind = () => {
    if (cnt === filteredData.length) {
      cnt = 0;
    }
    ref.current.seekTo(filteredData[cnt][1]);
    cnt++;
  };

  const handleText = () => {
    axios(`${url}`)
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error getting data: " + error);
      });
  };
  useEffect(() => {
    dispatch(getAudio(videoId));
    return () => {
      dispatch(clearAudios());
    };
  }, [dispatch, videoId]);
  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <div className={classes.video}>
            <ReactPlayer
              ref={ref}
              url={usersInfo.video}
              width="100%"
              height="100%"
              controls={true}
              onSeek={(e) => console.log("onSeek", e)}
            />
          </div>
          <div className="video-info">
            <div className="video-info-stats">
              <p>
                <h3>{usersInfo.title}</h3>
                <span>{timeSince(usersInfo.created_at)} ago</span>
              </p>
            </div>
          </div>{" "}
          {usersInfo.text === null ? (
            <div>
              <Button
                onClick={dispatch(transcribeAudio(videoId))}
                variant="contained"
              >
                TRANSCRIBE
              </Button>
              <Button onClick={handleText} variant="contained">
                FETCH
              </Button>
            </div>
          ) : (
            <Button onClick={handleText} variant="contained">
              FETCH
            </Button>
          )}
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  <TextField
                    id="standard-basic"
                    label="Search word"
                    onChange={(event) => handleSearch(event)}
                  />
                  <Button onClick={handleFind} variant="contained">
                    Find Next
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ padding: 10 }}>
            {filteredData.slice(0, 5).map((value) => {
              return (
                <div key={value.id}>
                  <div style={styles}>
                    {value[0]} {value[1]}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </Fragment>
  );
}

export default WatchVideo;
