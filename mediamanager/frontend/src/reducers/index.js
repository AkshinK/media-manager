import { combineReducers } from "redux";
import contents from "./contents";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import audios from "./audios";

export default combineReducers({
  audios,
  contents,
  errors,
  messages,
  auth,
});
