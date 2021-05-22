import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAudios, deleteAudio, transcribeAudio } from "../../actions/audios";
import { Link } from "react-router-dom";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../layout/Header";
import fileDownload from "js-file-download";
import { timeSince } from "../../utils";

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(8),
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
});

export class Files extends Component {
  static propTypes = {
    audios: PropTypes.array.isRequired,
    getAudios: PropTypes.func.isRequired,
    deleteAudio: PropTypes.func.isRequired,
    transcribeAudio: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAudios();
  }

  handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
        console.log(res.data);
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <main className={classes.content}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Published</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.audios.map((audio) => (
                  <tr key={audio.id}>
                    <td>{audio.id}</td>
                    <td>{audio.title}</td>
                    <td>{audio.type}</td>
                    <td>{timeSince(audio.created_at)} ago</td>
                    <td>
                      <Link
                        to={`/watch/${audio.id}`}
                        key={audio.id}
                        className="btn btn-primary btn-sm"
                      >
                        Play
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          this.handleDownload(
                            audio.video,
                            `${audio.title}.mp4`
                          );
                        }}
                        className="btn btn-primary btn-sm"
                      >
                        Download
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={this.props.deleteAudio.bind(this, audio.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={this.props.transcribeAudio.bind(
                          this,
                          audio.id
                        )}
                        className="btn btn-success btn-sm"
                      >
                        Transcribe
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  audios: state.audios.audios,
});
export default withStyles(useStyles)(
  connect(mapStateToProps, { getAudios, deleteAudio, transcribeAudio })(Files)
);
