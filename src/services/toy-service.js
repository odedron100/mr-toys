// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex

import { storageService } from './async-storage.service.js'
// import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

const KEY = 'toyDB';

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

var gToy = _createToys()

// toy: support paging and filtering and sorting
function query() {
  return storageService.query(KEY)
}

function getById(id) {
  return storageService.get(KEY, id)
}

function remove(id) {
  return storageService.remove(KEY, id)
}


// function ontoyClicked(id) {
//     let toyToOverride = [];
//     gtoys.forEach(toy => {
//         console.log('toy', toy);
//         if (toy._id === id) {
//             toy.isDone = !toy.isDone;
//         }
//         toyToOverride.push(toy);
//     });
//     storageService.store(KEY, toyToOverride)
// }

function save(toy) {
  // const savedToy = (toy._id) ? storageService.put(KEY, toy) : storageService.post(KEY, toy)
  // return savedToy;
  let savedToy = null
  if (toy._id) {
    savedToy = storageService.put(KEY, toy)
  } else {
    var newToy = _createToy(toy.name);
    savedToy = storageService.post(KEY, newToy)
  }
  return savedToy;
}


// function _add(toy) {
//     toy._id = utilService.makeId()
//     gtoys.push(toy)
//     return toy
// }

// function _update(toy) {
//     const idx = gtoys.findIndex(currtoy => currtoy._id === toy._id)
//     gtoys.splice(idx, 1, toy)
//     return toy
// }

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    price: '',
    type: '',
    createAt: '',
    inStock: false,
  }
}

function _createToys() {
  var toys = JSON.parse(localStorage.getItem(KEY))
  if (!toys || !toys.length) {
    toys = [
      _createToy('oded', 'fuuny', 32),
      _createToy('noam', 'angry', 532),
      _createToy('shahar', 'kids', 123),
    ]
    localStorage.setItem(KEY, JSON.stringify(toys))
  }
  return toys;
}

function _createToy(name) {
  return {
    _id: utilService.makeId(),
    name,
    price: utilService.getRandomInt(20, 700),
    type: "funny",
    createAt: Date.now(),
    inStock: true,
  }
}
