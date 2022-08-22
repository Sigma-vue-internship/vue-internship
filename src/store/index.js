import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    currentTask: {
      id: null,
      label: "",
      description: "",
    },
  },
  getters: {
    getAllTasks: (state) => state.tasks,
    getCurrentTask: (state) => state.currentTask,
    getTaskById: (state) => (id) => {
      return state.tasks.find((task) => task.id === id);
    },
  },
  mutations: {
    SET_TASK(state) {
      state.tasks.push(state.currentTask);
      state.currentTask = { id: null, label: "", description: "" };
    },
    EDIT_TASK(state, editFormData) {
      const index = state.tasks.findIndex(
        (task) => task.id === editFormData.id
      );
      state.tasks = state.tasks.map((item, i) =>
        i === index ? (item = { ...editFormData }) : item
      );
    },
    DELETE_TASK(state, taskId) {
      const index = state.tasks.findIndex((task) => task.id === taskId);
      state.tasks.splice(index, 1);
    },
    SET_CURRENT_TASK(state, formData) {
      state.currentTask = {
        id: Date.now(),
        label: formData.label,
        description: formData.description,
      };
    },
  },
  actions: {
    addTask({ commit }, formData) {
      commit("SET_CURRENT_TASK", formData);
      commit("SET_TASK");
    },
    editTask({ commit }, editFormData) {
      commit("EDIT_TASK", editFormData);
    },
    deleteTask({ commit }, taskId) {
      commit("DELETE_TASK", taskId);
    },
  },
  modules: {},
});
