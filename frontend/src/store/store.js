import Vue from 'vue'
import Vuex from 'vuex'
import { toyService } from "../services/toy-service.js";
import { utilService } from '../services/util.service.js';
import { userStore } from "../store/user.store.js";
import { reviewStore } from "../store/review.store.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toyList: null,
    filter: {
      name: '',
      isInStock: 'all'
    }
  },
  getters: {
    toys(state) {
      return state.toyList
    },
    doneToys(state) {
      if (!state.toyList) return;
      return state.toyList.filter(toy => toy.isDone).length
    },
    currPage(state) {
      return state.currPage;
    }
  },
  mutations: {
    updateCurrPage(state, { page }) {
      state.currPage = page;
    },
    setToys(state, payload) {
      state.toyList = payload.toys;
    },
    removeToy(state, { toyId }) {

      const idxToRemove = state.toyList.findIndex(toy => {
        return toy._id === toyId;
      })
      state.toyList.splice(idxToRemove, 1);
    },
    addToy(state, { toy }) {

      state.toyList.push(toy);
    },
    done(state, { toyId }) {
      // toyService.onToyClicked(toyId);
      const toyToToggle = state.toyList.find(toy => {
        return toy._id === toyId;
      })
      toyToToggle.isDone = !toyToToggle.isDone
      toyService.save(toyToToggle);
    },
    updateToy(state, { toy }) {
      const idxToUpdate = state.toyList.findIndex(toyFromArray => {
        return toyFromArray._id === toy._id;
      })
      toyService.save(toy)
      state.toyList.splice(idxToUpdate, 1, toy);
    },
    setFilter(state, { filterBy }) {
      state.filter = filterBy;
    }
  },
  actions: {
    loadToys({ commit, state }) {
      toyService.query(state.filter || undefined)
        .then(toys => {
          commit({ type: 'setToys', toys });
        })
        .catch(err => {
          console.log('Store: Cannot load toys', err);
          throw new Error('Cannot load toys');
        })
    },
    saveToys(context, { toy }) {
      // toy: support EDIT
      const type = (toy._id) ? 'updateToy' : 'addToy';
      return toyService.save(toy)
        .then(savedToy => {
          console.log('savedToy', savedToy);
          context.commit({ type, toy: savedToy })
        })
        .catch(err => {
          console.log('Store: Cannot save toy', err);
          throw new Error('Cannot save toy');
        })
    },
    remove(context, { toyId }) {
      return toyService.remove(toyId)
        .then(() => {
          console.log('afterRemove-store')
          context.commit({ type: 'removeToy', toyId })
        })
        .catch(err => {
          console.log('Store: Cannot remove toy', err);
          throw new Error('Cannot remove toy');
        })
    },
  },
  modules: {
    userStore,
    reviewStore
  }
})
