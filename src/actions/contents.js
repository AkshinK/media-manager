import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig, tokenConfigMedia } from "./auth";

import { GET_CONTENTS, DELETE_CONTENT, ADD_CONTENT, ADD_AUDIO } from "./types";

// GET CONTENTS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("/api/contents/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CONTENTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE CONTENT
export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/contents/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteLead: "Lead Deleted" }));
      dispatch({
        type: DELETE_CONTENT,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD CONTENT
export const addLead = (content) => (dispatch, getState) => {
  axios
    .post("/api/contents/", content, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: "Lead Added" }));
      dispatch({
        type: ADD_CONTENT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// // ADD Audio
// export const addAudio = (form_data) => (dispatch, getState) => {
//   axios
//     .post("/api/media/", form_data, tokenConfigMedia(getState))
//     .then((res) => {
//       dispatch(createMessage({ addAudio: "Audio Added" }));
//       dispatch({
//         type: ADD_AUDIO,
//         payload: res.data,
//       });
//       console.log(res.data);
//     })
//     .catch((err) =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

// // GET AUDIOS
// export const getAudios = () => (dispatch, getState) => {
//   axios
//     .get("/api/media/", tokenConfig(getState))
//     .then((res) => {
//       dispatch({
//         type: GET_CONTENTS,
//         payload: res.data,
//       });
//     })
//     .catch((err) =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
