// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex

import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import axios from 'axios';
const TOY_URL = 'http://localhost:3031/api/toy/'
const KEY = 'toyDB';

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,

}

// var gToy = _createToys()

// toy: support paging and filtering and sorting
function query(filter) {
  return httpService.get('toy', filter)
  return axios.get(TOY_URL, { params: filter })
    .then(res => res.data)
}

function getById(id) {
  var url = `toy/${id}`
  return httpService.get(url, id)
  return axios.get(TOY_URL + id).then(res => res.data)
}

function remove(id) {
  console.log('remove id in service front', id);
  var url = `toy/${id}`
  console.log('remove url in service front', url);
  return httpService.delete(url, id)
  return axios.delete(TOY_URL + id).then(res => res.data)
}



function save(toy) {
  if (toy._id) {
    var url = `toy/${toy._id}`
    return httpService.put(url, toy)
  } else {
    return httpService.post('toy', toy)
  }
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

// function filter(newFilterBy) {
//   storageService.query(KEY)
//     .then(toys => {
//       console.log('toys', toys);
//       if (newFilterBy === 'all') return toys;
//       else if (newFilterBy === 'in Stock') return toys.filter(toy => toy.inStock)
//       else {
//         return toys.filter(toy => !toy.inStock)
//       }
//     })
//   return newFilterBy;
// }

function getEmptyToy() {
  return {
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
