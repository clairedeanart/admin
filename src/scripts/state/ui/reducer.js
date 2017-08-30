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
        lightboxImage: {
          ...state.image,
          ...action.image
        },
      }
    case Constants.CLOSE_LIGHTBOX:
      return {
        ...state,
        lightboxOpen: initialState.lightboxOpen,
        lightboxImage: initialState.lightboxImage,
      }
    case Constants.UPDATE_IMAGE_DATA:
      return {
        ...state,
        lightboxImage: {
          ...state.image,
          ...action.image
        },
      }
    case Constants.SAVE_IMAGE_DATA:
      return {
        ...state,
        lightboxImage: action.image,
      }
    default:
  }
  return state;
}

export default ui;
