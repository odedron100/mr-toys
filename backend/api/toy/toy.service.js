// const gToys = require('../../data/toy.json')
const dbService = require('../../services/db.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getById,
  remove,
  update,
  add
}

const PAGE_SIZE = 10;

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('toy')
    var toys = await collection.find(criteria).toArray()
    // })
    return toys
  } catch (err) {
    logger.error('cannot find toys', err)
    throw err
  }
}

// function query(filter) {
//   console.log('filter-SERVICEBACK', filter);
//   var toys = JSON.parse(JSON.stringify(gToys));
//   let toysToShow = toys.filter(toy => {
//     var toyToCheck = toy.name.toLowerCase()
//     if (filter === {} || !filter.name && filter.isInStock === 'all') {
//       return toyToCheck;
//     }
//     else if (filter.name && filter.isInStock === 'all') {
//       return toyToCheck.includes(filter.name)
//     } else if (filter.name && filter.isInStock === 'in Stock') {
//       return toyToCheck.includes(filter.name) && toy.inStock;
//     } else if (!filter.name && filter.isInStock === 'in Stock') {
//       return toy.inStock;
//     } else if (filter.name && filter.isInStock === 'out of Stock') {
//       return toyToCheck.includes(filter.name) && !toy.inStock;
//     } else if (!filter.name && filter.isInStock === 'out of Stock') {
//       return !toy.inStock;
//     }
//   })
//   return Promise.resolve(toysToShow)

// }

async function getById(toyId) {
  try {
    const collection = await dbService.getCollection('toy')
    const toy = await collection.findOne({ '_id': ObjectId(toyId) })
    return toy
  } catch (err) {
    logger.error(`while finding toy ${toyId}`, err)
    throw err
  }
}
// function getById(toyId) {
//   const toy = gToys.find(toy => toy._id === toyId)
//   return Promise.resolve(toy);
// }

async function remove(toyId) {
  try {
    console.log('1111111111111');
    console.log('toyId', toyId);
    const collection = await dbService.getCollection('toy')
    console.log('2222222222222');
    // console.log('collection', collection);
    console.log('collection', collection);
    await collection.deleteOne({ '_id': toyId })
    console.log('3333333333333');
  } catch (err) {
    console.log('BLAHHHHHHHH!!!!!');
    console.log('err', err);
    logger.error(`cannot remove toy ${toyId}`, err)
    throw err
  }
}

// function remove(toyId) {
//   const idx = gToys.findIndex(toy => toy._id === toyId)
//   if (idx === -1) return Promise.reject('No Such toy')
//   gToys.splice(idx, 1)
//   return _saveToysToFile();
// }

async function update(toy) {
  try {
    // peek only updatable fields!
    // const toyToSave = {
    //   _id: ObjectId(toy._id),
    //   name: toy.name,
    //   price: toy.fullname,
    //   score: user.score
    // }
    const collection = await dbService.getCollection('toy')
    console.log('toy to update:', toy);
    await collection.updateOne({ '_id': toy._id }, { $set: toy })
    return toy;
  } catch (err) {
    logger.error(`cannot update user ${toy._id}`, err)
    throw err
  }
}

// function save(toy) {
//   if (toy._id) {
//     const idx = gToys.findIndex(t => t._id === toy._id)
//     if (idx < 0) return Promise.reject('No such toy', toy._id)
//     gToys.splice(idx, 1, toy)
//   } else {
//     toy._id = _makeId()
//     toy.createAt = Date.now()
//     toy.inStock = true
//     console.log('toyyyyyyyyyy', toy);
//     gToys.unshift(toy)
//   }
//   return _saveToysToFile()
//     .then(() => toy)
// }

async function add(toy) {
  try {
    // peek only updatable fields!
    const toyToAdd = {
      name: toy.name,
      type: toy.type,
      price: toy.price,
      createAt: Date.now(),
      inStock: true
    }
    const collection = await dbService.getCollection('toy')
    await collection.insertOne(toyToAdd)
    return toyToAdd
  } catch (err) {
    logger.error('cannot insert toy', err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.name) {
    const nameCriteria = { $regex: filterBy.name, $options: 'i' }
    criteria.$or = [
      {
        name: nameCriteria
      }
    ]
  }
  if (filterBy.isInStock) {
    criteria.isInStock = { $gte: filterBy.isInStock }
  }
  return criteria
}

function _makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}


// function _saveToysToFile() {
//   return new Promise((resolve, reject) => {
//     const fs = require('fs')
//     fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
//       if (err) reject(err)
//       else resolve()
//     })
//   })
// }

// _createTestToys()



// function _createTestToys() {
//   const vendors = ['Audu Mea', 'Fiak Ibasa', 'Subali Pesha', 'Mitsu Bashi']
//   const toys = []
//   for (var i = 0; i < 21; i++) {
//     toys.push(_createToy(vendors[parseInt(Math.random() * vendors.length)] + i, parseInt(Math.random() * 1000)));
//   }
//   toys.forEach(toy => save(toy))
// }

// function _getEmptyToy() {
//   return { _id: '', price: 0, type: '', createAt: null, inStock: true }
// }


// function _createToy(name) {
//   const toy = _getEmptyToy();
//   toy._id = _makeId();
//   toy.name = name;
//   toy.price = getRandomInt(20, 700);
//   toy.type = "funny";
//   toy.createAt = Date.now();
//   toy.inStock = true;
//   return toy;
// }
