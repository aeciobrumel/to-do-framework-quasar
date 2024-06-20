---------------------------------------
<template>
  <q-page class="flex flex-center">
    <div class="wrapper" ref="wrapper">
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
          <div class="categories">
            <div
              class="category"
              v-for="category in allCategories"
              :key="category.value"
              @click="showCategoryScreen(category.value)"
            >
              <img :src="category.img" :alt="category.label" />
              <div class="content">
                <h4>{{ category.label }}</h4>
                <p>{{ totalCategoryTasks(category.value) }} Tasks</p>
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
        </div>
        <div class="category-details">
          <div class="details" flex>
            <img :src="getCategoryImage(currentCategory)" alt="Avatar" />
            <p id="num-tasks">
              {{ totalCategoryTasks(currentCategory) }} tasks
            </p>
            <h3 id="category-title">{{ getCategoryLabel(currentCategory) }}</h3>
          </div>
        </div>
        <div class="tasks-wrapper">
          <div class="tasks">
            <div
              class="task-wrapper"
              v-for="task in tasksByCategory(currentCategory)"
              :key="task.value"
            >
              <label class="task">
                <input type="checkbox" :name="task.label" :id="task.value" />
                <span class="checkmark">
                  <q-icon name="check" />
                </span>
                <p>{{ task.label }}</p>
              </label>
              <div class="delete" @click="deleteTask(task.value)">
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
      currentCategory: "", // variável para armazenar a categoria atualmente selecionada
    };
  },
  computed: {
    ...mapGetters([
      "totalTasks",
      "totalCategories",
      "allTasks",
      "allCategories",
      "totalCategoryTasks",
      "tasksByCategory",
      "categoryImg",
    ]),
  },
  methods: {
    ...mapActions(["addTask", "deleteTask"]),
    handleAddTask() {
      this.addTask({
        value: uid(), // gerar um novo uid para cada nova task
        label: this.taskName,
        category: this.taskCategory,
        checked: false,
      });
      this.hideAddTaskScreen();
    },
    toggleMenu() {
      this.homeScreenActive = !this.homeScreenActive;
    },
    showCategoryScreen(category) {
      this.currentCategory = category;
      this.categoryScreenActive = true;
      this.$refs.wrapper.classList.add("show-category");
    },
    hideCategoryScreen() {
      this.categoryScreenActive = false;
      this.$refs.wrapper.classList.remove("show-category");
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
      this.$refs.wrapper.classList.remove("show-category");
    },
    getCategoryImage(category) {
      return this.categoryImg(category);
    },
    getCategoryLabel(category) {
      const cat = this.allCategories.find((c) => c.value === category);
      return cat ? cat.label : "";
    },
    deleteTask(taskId) {
      this.deleteTask(taskId);
    },
  },
  mounted() {
    this.homeScreenActive = true;
    this.taskCategory = this.allCategories[0].value; // definir a primeira categoria como padrão ao iniciar
    this.currentCategory = this.taskCategory; // inicializar a categoria atual com a primeira categoria
  },
};
</script>

<style>
@import "../css/style.css";
</style>
