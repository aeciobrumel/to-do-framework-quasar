<template>
  <q-page class="flex flex-center">
    <div class="wrapper" :class="{ 'show-category': categoryScreenActive }">
      <div class="screen-backdrop"></div>

      <div class="home-screen screen" :class="{ active: homeScreenActive }">
        <div class="head-wrapper">
          <div class="welcome">
            <div class="content">
              <h3>Olá Elmario</h3>
              <p>
                Você tem no total <span>{{ totalTasks }}</span> task(s) cadastradas
              </p>
            </div>
            <div class="avatar" @click="handleLog">
              <div class="backdrop"></div>
              <img src="../assets/img/boy.png" alt="boy" />
            </div>
          </div>
        </div>
        <div class="categories-wrapper">
          <div class="categories" v-for="category in allCategories" :key="category.value">
            <div class="category" @click="handleSelectCategory(category)">
              <img :src="category.img" :alt="category.label" />
              <div class="content">
                <h4>{{category.label}}</h4>
                <p>{{ totalCategoryTasks(category.value) }} Task(s)</p>
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
          <div class="q-btn" @click="handleUnselectCategory">
            <q-icon name="arrow_back" />
          </div>
        </div>
        <div class="category-details" v-if="selectedCategory">
          <img :src="selectedCategory.img" :alt="selectedCategory.label" />
          <div class="details">
            <p id="num-tasks">{{ totalCategoryTasks(selectedCategory.value) }} task(s)</p>
            <h2 id="category-title">{{ selectedCategory.label }}</h2>
          </div>
        </div>
        <div class="tasks-wrapper" v-if="selectedCategory && totalCategoryTasks(selectedCategory.value)">
          <div class="tasks">
            <div class="task-wrapper" v-for="task in allCategoryTasks(selectedCategory.value)" :key="task.value">
              <label for="task" class="task">
                <q-checkbox v-model="task.checked"/>
                <p>{{ task.label }}</p>
              </label>
              <q-btn @click="handleDeleteTask(task.value)" round color="deep-orange" icon="delete" size="sm" outline />
            </div>
          </div>
        </div>
        <div class="tasks-wrapper empty" v-else>
          Lista Vazia
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
        <div class="input-group">
          <label for="task-input">Task</label>
          <q-input v-model="newTaskName" placeholder="Digite aqui" style="width: 100%;"/>
        </div>
        <div class="input-group">
          <label for="category-select">Categoria</label>
          <q-select v-model="newTaskCategory" outlined :options="allCategories" style="width: 100%;"/>
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
      newTaskName: null,
      newTaskCategory: null,
      selectedCategory: null,
      selectedCategoryTasks: null,
      homeScreenActive: false,
      categoryScreenActive: false,
      addTaskScreenActive: false,
      blackBackdropActive: false,
    };
  },
  computed: {
    ...mapGetters(["totalTasks", "totalCategories", "allTasks", "allCategories", "allCategoryTasks", "totalCategoryTasks"])
  },
  methods: {
    ...mapActions(["addTask", "deleteTask", "updateTask"]),
    handleLog() {
      console.log('tasks', this.allTasks)
      console.log('categories', this.allCategories)
    },
    handleAddTask() {
      this.addTask({
        label: this.newTaskName,
        category: this.newTaskCategory.value,
      });
      this.newTaskName = null;
      this.hideAddTaskScreen();
    },
    handleDeleteTask(task) {
      this.deleteTask(task);
    },
    handleSelectCategory(category) {
      this.selectedCategory = category;
      this.newTaskCategory = category;
      this.showCategoryScreen();
    },
    handleUnselectCategory() {
      this.selectedCategory = null;
      this.newTaskCategory = this.allCategories[0];
      this.hideCategoryScreen();
    },
    toggleMenu() {
      this.homeScreenActive = !this.homeScreenActive;
    },
    showCategoryScreen() {
      this.categoryScreenActive = true;
      this.blackBackdropActive = false;
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
      this.addTaskScreenActive = false;
      this.blackBackdropActive = false;
    },
  },

  mounted() {
    this.homeScreenActive = true;
    this.newTaskCategory = this.allCategories[0];
  },
};
</script>

<style>
@import "../css/style.css";
</style>
