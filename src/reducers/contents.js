import {
  GET_CONTENTS,
  DELETE_CONTENT,
  ADD_CONTENT,
  CLEAR_CONTENTS,
} from "../actions/types.js";

const initialState = {
  CONTENTs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTENTS:
      return {
        ...state,
        CONTENTs: action.payload,
      };
    case DELETE_CONTENT:
      return {
        ...state,
        CONTENTs: state.CONTENTs.filter(
          (CONTENT) => CONTENT.id !== action.payload
        ),
      };
    case ADD_CONTENT:
      return {
        ...state,
        CONTENTs: [...state.CONTENTs, action.payload],
      };
    case CLEAR_CONTENTS:
      return {
        ...state,
        CONTENTs: [],
      };
    default:
      return state;
  }
}
