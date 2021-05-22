import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig, tokenConfigMedia } from "./auth";

import {
  GET_AUDIOS,
  GET_AUDIO,
  DELETE_AUDIO,
  ADD_AUDIO,
  TRANSCRIBE_AUDIO,
  CLEAR_AUDIOS,
} from "./types";

// DELETE AUDIO
export const deleteAudio = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/media/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteLead: "Audio Deleted" }));
      dispatch({
        type: DELETE_AUDIO,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// CLEAR AUDIOS
export const clearAudios = () => (dispatch, getState) => {
  dispatch({
    type: CLEAR_AUDIOS,
    payload: [],
  });
};

// ADD AUDIO
export const addAudio = (form_data) => (dispatch, getState) => {
  axios
    .post("/api/media/", form_data, tokenConfigMedia(getState))
    .then((res) => {
      dispatch(createMessage({ addAudio: "Audio Added" }));
      dispatch({
        type: ADD_AUDIO,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET AUDIOS
export const getAudios = () => (dispatch, getState) => {
  axios
    .get("/api/media/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_AUDIOS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//RETRIEVE AUDIO
export const getAudio = (id) => (dispatch, getState) => {
  axios
    .get(`/api/media/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteLead: "Audio fetched" }));
      dispatch({
        type: GET_AUDIO,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const transcribeAudio = (id) => (dispatch, getState) => {
  axios
    .post(`/api/media/${id}/transcribe/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ transcribeAudio: "Audio transcribed" }));
      dispatch({
        type: TRANSCRIBE_AUDIO,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
