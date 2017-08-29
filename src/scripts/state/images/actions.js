import Constants from './constants';

export let append = function append(images) {
  return {
    images,
    type: Constants.ADD_TO_IMAGES,
  }
}

export let updateImageData = function updateImageData(image) {
  return {
    image,
    type: Constants.UPDATE_IMAGE_DATA,
  }
}

export default {
  append,
  updateImageData
}
