import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAudios } from "../../actions/audios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../layout/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

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
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

Videos.propTypes = {
  audios: PropTypes.array.isRequired,
  getAudios: PropTypes.func.isRequired,
  deleteAudio: PropTypes.func.isRequired,
};
function Videos(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { audios } = useSelector((state) => state.audios);

  useEffect(() => {
    dispatch(getAudios());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main className={classes.content}>
        <h2>Videos</h2>

        <div>
          {/* {audios.map((video) => (
            <Link to={`/watch/${video.id}`} key={video.id}>
              <VideoCard video={video} />
            </Link>
          ))} */}
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  audios: state.audios.audios,
});

export default connect(mapStateToProps, { getAudios })(Videos);
