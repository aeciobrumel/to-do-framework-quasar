import Vue from "vue";
import Vuex from "vuex";

import boy from '../assets/img/boy.png';
import briefcase from '../assets/img/briefcase.png';
import calendar from '../assets/img/calendar.png';
import dumbbell from '../assets/img/dumbbell.png';
import education from '../assets/img/education.png';
import healthcare from '../assets/img/healthcare.png';
import saving from '../assets/img/saving.png';
import shopping from '../assets/img/shopping.png';
import sun from '../assets/img/sun.png';
import web from '../assets/img/web.png';
import { uid } from "quasar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      { value: uid(), label: "Finish college", category: 'personal', checked: false },
    ],
    categories: [
      { value: 'personal', label: 'Pessoal', img: boy },
      { value: 'work', label: 'Trabalho', img: briefcase },
      { value: 'vacation', label: 'Férias', img: calendar },
      { value: 'fitness', label: 'Fitness', img: dumbbell },
      { value: 'studies', label: 'Estudos', img: education },
      { value: 'health', label: 'Saúde', img: healthcare },
      { value: 'economy', label: 'Economia', img: saving },
      { value: 'shopping', label: 'Compras', img: shopping },
      { value: 'leisure', label: 'Lazer', img: sun },
      { value: 'web', label: 'Web', img: web },
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
    allTasks: (state) => state.tasks,
    totalTasks: (state) => state.tasks.length,
    allCategories: (state) => state.categories,
    totalCategories: (state) => state.categories.length,
    totalCategoryTasks: (state) => (value) =>
      state.tasks.filter((task) => task.category === value).length,
  },
});
