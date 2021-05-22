import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAudios } from "../../actions/audios";
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

export class Subtitles extends Component {
  static propTypes = {
    audios: PropTypes.array.isRequired,
    getAudios: PropTypes.func.isRequired,
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
                  <th>Media ID</th>
                  <th>Media Title</th>
                  <th>Published</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.audios.map((audio) =>
                  audio.full_text !== null ? (
                    <tr key={audio.id}>
                      <td>{audio.id}</td>
                      <td>{audio.title}</td>
                      <td>{timeSince(audio.created_at)} ago</td>
                      <td>
                        <button
                          onClick={() => {
                            this.handleDownload(
                              audio.full_text,
                              `${audio.title}_text.txt`
                            );
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          Download full text
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            this.handleDownload(
                              audio.text,
                              `${audio.title}_text.json`
                            );
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          Download as json
                        </button>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )
                )}
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
  connect(mapStateToProps, { getAudios })(Subtitles)
);
