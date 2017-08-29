import Constants from './constants';

const initialState = {
  isLoading: false,
  lightboxOpen: false,
  lightboxImage: {},
  lightboxImageList: null, // One of ['live', 'unedited', 'hidden']
}

function ui(state = initialState, action) {
  switch (action.type) {

    case Constants.OPEN_LIGHTBOX:
      return {
        ...state,
        lightboxOpen: true,
        lightboxImage: action.image,
        lightboxImageList: action.listType,
      }
    case Constants.CLOSE_LIGHTBOX:
      return {
        ...state,
        lightboxOpen: initialState.lightboxOpen,
        lightboxImage: initialState.lightboxImage,
        lightboxImageList: null,
      }
    default: return state;
  }
  return state;
}

export default ui;
