import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedID: 111111111111111,
  },
  getters: {
    getSelectedID(state) {
      return state.selectedID;
    },
  },
  mutations: {
    SET_SELECTED_ID(state, payload) {
      if (this.selectedID === payload) {
        payload = null;
      }
      return (state.selectedID = payload);
    },
  },
  actions: {},
  modules: {},
});
