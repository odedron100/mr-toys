
function makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function sortByName(toys) {
  return toys.sort((a, b) => {
    return a.txt.localeCompare(b.txt)
  })
}

function formatFilter(filterBy) {
  if (!filterBy) return '';
  const filterKeys = Object.keys(filterBy);
  return filterKeys.map(key => `${key}=${filterBy[key]}`).join('&')
}

export const utilService = {
  makeId,
  getRandomInt,
  sortByName,
  formatFilter
}
