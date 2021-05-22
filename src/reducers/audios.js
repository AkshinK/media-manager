import {
  DELETE_AUDIO,
  ADD_AUDIO,
  GET_AUDIOS,
  CLEAR_AUDIOS,
  GET_AUDIO,
  TRANSCRIBE_AUDIO,
} from "../actions/types.js";

const initialState = {
  audios: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AUDIOS:
      return {
        ...state,
        audios: action.payload,
      };
    case GET_AUDIO:
      return {
        ...state,
        audios: action.payload,
      };
    case DELETE_AUDIO:
      return {
        ...state,
        audios: state.audios.filter((audio) => audio.id !== action.payload),
      };
    case ADD_AUDIO:
      return {
        ...state,
        audios: [...state.audios, action.payload],
      };
    case CLEAR_AUDIOS:
      return {
        ...state,
        audios: action.payload,
      };
    case TRANSCRIBE_AUDIO:
      return {
        ...state,
        audios: state.audios.map((audio) =>
          audio.id === action.payload
            ? { ...audio, text: action.payload }
            : audio
        ),
      };

    default:
      return state;
  }
}
