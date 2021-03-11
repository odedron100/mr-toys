
// import { toyService } from "../services/toy-service.js";

// export const toystore = {
//   state: {
//     toyList: null,
//     currentFilterBy: 'text',
//   },
//   getters: {
//     toys(state) {
//       return state.toyList
//     },
//     doneToys(state) {
//       if (!state.toyList) return;
//       return state.toyList.filter(toy => toy.isDone).length
//     },
//   },
//   mutations: {
//     setToys(state, payload) {
//       state.toyList = payload.toys;
//     },
//     removetoy(state, { toyId }) {
//       toyService.remove(toyId);
//       const idxToRemove = state.toyList.findIndex(toy => {
//         return toy._id === toyId;
//       })
//       state.toyList.splice(idxToRemove, 1);
//     },
//     addToy(state, { toy }) {
//       toy.at = Date.now();
//       state.toyList.push(toy);
//     },
//     done(state, { toyId }) {
//       // toyService.onToyClicked(toyId);
//       const toyToToggle = state.toyList.find(toy => {
//         return toy._id === toyId;
//       })
//       toyToToggle.isDone = !toyToToggle.isDone
//       toyService.save(toyToToggle);
//     },
//     updateToy(state, { toy }) {
//       const idxToUpdate = state.toyList.findIndex(toyFromArray => {
//         return toyFromArray._id === toy._id;
//       })
//       toyService.save(toy)
//       state.toyList.splice(idxToUpdate, 1, toy);
//     },
//   },
//   actions: {
//     loadToys(context) {
//       toyService.query()
//         .then(toys => {
//           // console.log('toys', toys);
//           context.commit({ type: 'setToys', toys });
//         })
//         .catch(err => {
//           console.log('Store: Cannot load toys', err);
//           throw new Error('Cannot load toys');
//         })
//     },
//     saveToys(context, { toy }) {
//       // toy: support EDIT
//       const type = (toy._id) ? 'updateToy' : 'addToy';
//       return toyService.save(toy)
//         .then(savedtoy => {
//           context.commit({ type, toy: savedtoy })
//         })
//         .catch(err => {
//           console.log('Store: Cannot save toy', err);
//           throw new Error('Cannot save toy');
//         })
//     },
//     // onToyClicked(context, { toyId }) {
//     //   context.commit({ type: 'done', toyId })
//     // },
//     remove(context, { toyId }) {
//       return toyService.remove(toyId)
//         .then(() => {
//           context.commit({ type: 'removetoy', toyId })
//         })
//         .catch(err => {
//           console.log('Store: Cannot remove toy', err);
//           throw new Error('Cannot remove toy');
//         })
//     },
//   }
// }
