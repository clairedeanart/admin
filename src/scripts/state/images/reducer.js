import Constants from './constants';
const initialState = {
  isLoading: false,
  live: [],
  unedited: [],
  hidden: [],
}

function images(state = initialState, action) {
  switch (action.type) {

    case Constants.IS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case Constants.IS_LOADING_COMPLETE:
      return {
        ...state,
        isLoading: false
      }

    case Constants.ADD_TO_LIVE:
      return {
        ...state,
        live: [...state.live, ...action.images],
      }
    case Constants.REMOVE_FROMTO_LIVE:
      // FIXME:
      // return {
      //   ...state,
      //   live: [...state.live, ...action.images],isLoading: true
      // }

    case Constants.ADD_TO_UNEDITED:
      return {
        ...state,
        unedited: [...state.unedited, ...action.images],
      }
    case Constants.REMOVE_FROMNEDITED:
      // FIXME:
      // return {
      //   ...state,
      //   isLoading: true
      // }

    case Constants.ADD_TO_HIDDEN:
      return {
        ...state,
        hidden: [...state.hidden, ...action.images],
      }
    case Constants.REMOVE_FROM_HIDDEN:
      // FIXME:
      // return {
      //   ...state,
      //   isLoading: true
      // }

    default: return state;

  }
  return state;
}

export default images;
