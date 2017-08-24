import Constants from './constants';

const initialState = {
  isLoading: false,
  lightboxOpen: false,
  lightboxImage: {},
}

function ui(state = initialState, action) {
  switch (action.type) {

    case Constants.OPEN_LIGHTBOX:
      return {
        ...state,
        lightboxOpen: true,
        lightboxImage: action.image,
      }
    case Constants.CLOSE_LIGHTBOX:
      return {
        ...state,
        lightboxOpen: initialState.lightboxOpen,
        lightboxImage: initialState.lightboxImage,
      }
    default: return state;
  }
  return state;
}

export default ui;
