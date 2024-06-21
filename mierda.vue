<template>
  <q-page class="flex flex-center">
    <div class="wrapper">
      <div class="screen-backdrop"></div>
      <div class="home-screen screen" :class="{ active: homeScreenActive }">
        <div class="head-wrapper">
          <div class="welcome">
            <div class="content">
              <h3>Olá Rodrigo</h3>
              <p>
                Você tem no total <span>{{ totalTasks }}</span> tasks
                cadastradas
              </p>
            </div>
            <div class="avatar">
              <div class="backdrop"></div>
              <img :src="getCategoryImage('personal')" alt="Avatar" />
            </div>
          </div>
        </div>
        <div class="categories-wrapper">
          <div
            class="categories"
            v-for="category in allCategories"
            :key="category.value"
          >
            <div class="category" @click="showCategoryScreen">
              <img :src="category.img" :alt="category.label" />
              <div class="content">
                <h4>{{ category.label }}</h4>
                <p>{{ totalCategoryTasks(category.value) }} Tasks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div
        class="category-screen screen"
        :class="{ active: categoryScreenActive }"
      >
        <div class="head-wrapper">
          <div class="back-btn" @click="hideCategoryScreen">
            <q-icon name="arrow_back" />
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
            <div class="task-wrapper" v-for="task in allTasks" :key="task.value">
              <label for="task" class="task">
                <input type="checkbox" :name="task.name" :id="task.value" />
                <span class="checkmark">
                  <q-icon name="check" />
                </span>
                <p>{{ task.name }}</p>
              </label>
              <div class="delete" @click="deleteTask(task.value)">
                <q-icon name="delete" />
              </div>
            </div>
          </div>
        </div>
      </div> -->
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
        <div class="input-group">
          <label for="task-input">Task</label>
          <q-input
            v-model="taskName"
            placeholder="Digite aqui"
            style="width: 100%"
          />
        </div>
        <div class="input-group">
          <label for="category-select">Categoria</label>
          <q-select
            v-model="taskCategory"
            outlined
            :options="allCategories"
            style="width: 100%"
          />
        </div>
        <div class="btns">
          <button class="cancel-btn" @click="hideAddTaskScreen">
            Cancelar
          </button>
          <button class="add-btn" @click="handleAddTask">Add</button>
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
      taskName: "",
      taskCategory: "",
      homeScreenActive: false,
      categoryScreenActive: false,
      addTaskScreenActive: false,
      blackBackdropActive: false,
    };
  },
  computed: {
    ...mapGetters([
      "totalTasks",
      "totalCategories",
      "allTasks",
      "allCategories",
      "totalCategoryTasks",
    ]),
  },
  methods: {
    ...mapActions(["addTask", "deleteTask"]),
    handleAddTask() {
      this.addTask({
        name: this.taskName,
        category: this.taskCategory.value,
      });
      this.hideAddTaskScreen();
    },
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
  },
  mounted() {
    this.homeScreenActive = true;
    this.taskCategory = this.allCategories[0];
  },
};
</script>

<style>
@import "../css/style.css";
</style>
