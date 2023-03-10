import { createStore } from "vuex";

export default createStore({
  state: {},
  getters: {
    MediaPlayer(state) {
      return state;
    },
  },
  mutations: {
    SET_state(state, { key, parent, val }) {
      key
        ? parent
          ? (this.state[parent][key] = val)
          : (this.state[key] = val)
        : undefined;
    },
    SET_stateClean() {
      this.state = { media: null };
    },
  },
  actions: {
    UPDATE_state({ commit }, payload) {
      commit("SET_state", payload);
    },
    UPDATE_stateClean({ commit }) {
      commit("SET_stateClean");
    },
  },
  modules: {},
});
