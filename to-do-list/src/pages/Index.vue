<template>
  <q-page class="flex flex-center">
    <div class="wrapper">
      <div class="screen-backdrop"></div>
      <div class="home-screen screen" :class="{ active: homeScreenActive }">
        <div class="head-wrapper">
          <div class="menu-btn" @click="toggleMenu">
            <q-icon name="menu" />
          </div>
          <div class="welcome">
            <div class="content">
              <h1>Olá Rodrigo</h1>
              <p>
                Você tem no Total <span>{{ totalTasks }}</span> tasks
              </p>
            </div>
            <div class="img">
              <div class="backdrop"></div>
              <img src="../assets/img/boy.png" alt="" />
            </div>
          </div>
        </div>
        <div class="categories-wrapper">
          <div class="categories">
            <div class="category" @click="showCategoryScreen">
              <div class="left">
                <img src="../assets/img/boy.png" alt="sun" />
                <div class="content">
                  <h1>Pessoal</h1>
                  <p>5 Tasks</p>
                </div>
              </div>
              <div class="options">
                <q-icon name="more_vert" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="category-screen screen"
        :class="{ active: categoryScreenActive }"
      >
        <div class="head-wrapper">
          <div class="back-btn" @click="hideCategoryScreen">
            <q-icon name="arrow_back" />
          </div>
          <div class="options">
            <q-icon name="more_vert" />
          </div>
        </div>
        <div class="category-details">
          <img src="statics/images/boy.png" alt="" id="category-img" />
          <div class="details">
            <p id="num-tasks">8 tasks</p>
            <h1 id="category-title">Pessoal</h1>
          </div>
        </div>
        <div class="tasks-wrapper">
          <div class="tasks">
            <div class="task-wrapper" v-for="task in tasks" :key="task.id">
              <label for="task" class="task">
                <input type="checkbox" :name="task.name" :id="task.id" />
                <span class="checkmark">
                  <q-icon name="check" />
                </span>
                <p>{{ task.name }}</p>
              </label>
              <div class="delete" @click="deleteTask(task.id)">
                <q-icon name="delete" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="add-task-btn" @click="showAddTaskScreen">
        <q-icon name="add" />
      </div>
      <div
        class="black-backdrop"
        :class="{ active: blackBackdropActive }"
        @click="hideAllScreens"
      ></div>
      <div class="add-task" :class="{ active: addTaskScreenActive }">
        <div class="add-task-backdrop"></div>
        <h1 class="heading">Add Task</h1>
        <div class="input-group">
          <label for="task-input"> Task </label>
          <input type="text" id="task-input" v-model="newTask" required />
        </div>
        <div class="input-group">
          <label for="category-select"> Categoria </label>
          <select id="category-select" v-model="newTaskCategory">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.name"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="btns">
          <button class="cancel-btn" @click="hideAddTaskScreen">
            Cancelar
          </button>
          <button class="add-btn" @click="addTask">Add</button>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      newTask: "",
      newTaskCategory: "",
      homeScreenActive: false,
      categoryScreenActive: false,
      addTaskScreenActive: false,
      blackBackdropActive: false,
    };
  },
  computed: {
    ...mapGetters(["totalTasks", "allTasks", "allCategories"]),
  },
  methods: {
    ...mapActions(["addTask", "deleteTask"]),
    toggleMenu() {
      this.homeScreenActive = !this.homeScreenActive;
    },
    showCategoryScreen() {
      this.categoryScreenActive = true;
      this.blackBackdropActive = true;
    },
    hideCategoryScreen() {
      this.categoryScreenActive = false;
      this.blackBackdropActive = false;
    },
    showAddTaskScreen() {
      this.addTaskScreenActive = true;
      this.blackBackdropActive = true;
    },
    hideAddTaskScreen() {
      this.addTaskScreenActive = false;
      this.blackBackdropActive = false;
    },
    hideAllScreens() {
      this.categoryScreenActive = false;
      this.addTaskScreenActive = false;
      this.blackBackdropActive = false;
    },
    addTask() {
      const task = {
        id: Math.random().toString(36).substring(7),
        name: this.newTask,
        category: this.newTaskCategory,
      };
      this.addTask(task);
      this.newTask = "";
      this.newTaskCategory = "";
      this.hideAddTaskScreen();
    },
  },
  mounted() {
    this.homeScreenActive = true;
  },
};
</script>

<style>
@import "../css/style.css";
</style>
