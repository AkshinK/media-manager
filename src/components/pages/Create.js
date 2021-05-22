import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import PageviewIcon from "@material-ui/icons/Pageview";
import { pink } from "@material-ui/core/colors";
import { addAudio } from "../../actions/audios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../layout/Header";
import Input from "@material-ui/core/Input";

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pink: {
    marginTop: theme.spacing(1),
    marginButtom: theme.spacing(1),
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", type: "video", video: null };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
  }
  state = {
    title: "",
    type: "",
    video: null,
  };
  static propTypes = {
    addAudio: PropTypes.func.isRequired,
  };

  handleTitleChange(event) {
    console.log(this.state);
    this.setState({ title: event.target.value });
  }
  handleTypeChange(event) {
    console.log(this.state);
    this.setState({ type: event.target.value });
  }
  handleMediaChange = (e) => {
    this.setState({
      video: e.target.files[0],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("video", this.state.video, this.state.video.name);
    form_data.append("title", this.state.title);
    form_data.append("type", this.state.type);
    this.props.addAudio(form_data);
    this.setState({
      title: "",
      type: "",
      video: null,
    });
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.pink}>
                <PageviewIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Upload New Media
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="title"
                      label="Video Title"
                      name="title"
                      autoComplete="title"
                      onChange={this.handleTitleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <select
                        value={this.state.type}
                        onChange={this.handleTypeChange}
                      >
                        <option value="video">video</option>
                        <option value="audio">audio</option>
                      </select>
                      <FormHelperText>Please select media type!</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      accept="video/*"
                      id="video"
                      onChange={this.handleMediaChange}
                      name="video"
                      type="file"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                  Upload Video
                </Button>
              </form>
            </div>
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(useStyles)(connect(null, { addAudio })(Create));
