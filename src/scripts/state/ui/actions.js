import Constants from './constants';

export let openLightbox = function openLightbox(image, listType) {
  return {
    image,
    listType,
    type: Constants.OPEN_LIGHTBOX,
  }
}

export let closeLightbox = function closeLightbox() {
  return {
    type: Constants.CLOSE_LIGHTBOX,
  }
}

export let updateLightboxImageData = function updateLightboxImageData(image) {
  return {
    image,
    type: Constants.UPDATE_IMAGE_DATA,
  }
}

export let saveLightboxImageData = function saveLightboxImageData(image) {
  return {
    image,
    type: Constants.SAVE_IMAGE_DATA,
  }
}

export default {
  openLightbox,
  closeLightbox,
  updateLightboxImageData,
  saveLightboxImageData,
}
