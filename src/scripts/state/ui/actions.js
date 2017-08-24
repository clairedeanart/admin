import Constants from './constants';

export let openLightbox = function openLightbox(image) {
  return {
    image,
    type: Constants.OPEN_LIGHTBOX,
  }
}

export let closeLightbox = function closeLightbox() {
  return {
    type: Constants.CLOSE_LIGHTBOX,
  }
}

export default {
  openLightbox,
  closeLightbox,
}
