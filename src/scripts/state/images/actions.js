import Constants from './constants';

export let addTo = function addTo(list, images) {
  return {
    images,
    type: Constants[`ADD_TO_${list.toUpperCase()}`]
  }
}

export default {
  addTo,
}
