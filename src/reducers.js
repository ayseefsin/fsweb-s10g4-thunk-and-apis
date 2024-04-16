import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  CLEAR_FAVS,
} from "./actions";

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}
function clearFavsFromLocalStorage(state) {
  localStorage.removeItem("s10g4");
}
function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}
const initial = {
  //short circuiting
  favs: readFavsFromLocalStorage() || [],
  current: null,
  error: null,
  loading: true,
};

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const updatedFavs = { ...state, favs: [...state.favs, action.payload] };
      writeFavsToLocalStorage(updatedFavs);
      return updatedFavs;

    case FAV_REMOVE:
      const remainingFavs = state.favs.filter(
        (item) => item.id !== action.payload
      );
      const remainingFavsState = { ...state, favs: remainingFavs };
      writeFavsToLocalStorage(remainingFavsState);
      return remainingFavsState;

    case FETCH_SUCCESS:
      return { ...state, loading: false, current: action.payload, error: null };

    case FETCH_LOADING:
      return { ...state, loading: true, current: null };

    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload, current: null };

    case GET_FAVS_FROM_LS:
      return { ...state };
    case CLEAR_FAVS:
      clearFavsFromLocalStorage();
      return { ...state, favs: [] };

    default:
      return state;
  }
}
