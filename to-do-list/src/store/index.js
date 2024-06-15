import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      { id: 1, name: "Buy a new car" },
      { id: 2, name: "Complete project report" },
      { id: 3, name: "Read a book" },
      { id: 4, name: "Exercise for 30 minutes" },
      { id: 5, name: "Plan weekend trip" },
    ],
    categories: [
      { id: 1, name: "Pessoal" },
      { id: 2, name: "Trabalho" },
      { id: 3, name: "Estudos" },
    ],
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit("ADD_TASK", task);
    },
    deleteTask({ commit }, taskId) {
      commit("DELETE_TASK", taskId);
    },
  },
  getters: {
    totalTasks: (state) => state.tasks.length,
    allTasks: (state) => state.tasks,
    allCategories: (state) => state.categories,
  },
});
