import Constants from './constants';
const initialState = {
  isLoading: false,
  list: [],
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

    case Constants.ADD_TO_IMAGES:
      return {
        ...state,
        list: [...state.list, ...action.images],
      }

    case Constants.UPDATE_IMAGE_DATA:
    case Constants.SAVE_IMAGE_DATA:
      return {
        ...state,
        list: (state.list.map((img, index) => {
          if (img.id && action.image && parseInt(img.id, 10) === parseInt(action.image.id, 10)) {
            return image(img, action)
          } else return img;
        })),
      }

    default:

  }
  return state;
}


function image(state = {}, action) {
  switch (action.type) {
    case Constants.UPDATE_IMAGE_DATA:
      return {
        ...state,
        ...action.image,
      }
    case Constants.SAVE_IMAGE_DATA:
      return action.image
    default:
  return state;
  }
}

export default images;
