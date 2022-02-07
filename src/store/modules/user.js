const state = {
  userinfo: {
    token: "",
    username: "",
  },
};
const mutations = {
  getInfo(state, arr) {
    state.userinfo = arr;
  },
  deleteInfo(state) {
    state.userinfo = { username: "", token: "" };
  },
};
const actions = {};
const getters = {};
export default { namespaced: true, state, mutations, actions, getters };
