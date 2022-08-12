export const displayPlaceLabel = (array) => {
  return array.filter((val) => val && val !== null).join(', ');
}