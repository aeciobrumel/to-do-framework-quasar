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
          <img src="../assets/img/boy.png" alt="" id="category-img" />
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
              <div class="delete">
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
export default {
  data() {
    return {
      totalTasks: 5,
      tasks: [
        { id: 1, name: "Buy a new car lorem" },
        // Adicione outras tarefas aqui
      ],
      newTask: "",
      newTaskCategory: "",
      categories: [
        { id: 1, name: "Pessoal" },
        {
          id: 2,
          name: "Personal",
          img: "boy.png",
        },
        {
          id: 3,
          name: "Work",
          img: "briefcase.png",
        },
        {
          id: 4,
          name: "Shopping",
          img: "shopping.png",
        },
        {
          id: 5,
          name: "Coding",
          img: "web-design.png",
        },
        {
          id: 6,
          name: "Health",
          img: "healthcare.png",
        },
        {
          id: 7,
          name: "Fitness",
          img: "dumbbell.png",
        },
        {
          id: 8,
          name: "Education",
          img: "education.png",
        },
        {
          id: 9,
          name: "Finance",
          img: "saving.png",
        },
      ],
      homeScreenActive: false,
      categoryScreenActive: false,
      addTaskScreenActive: false,
      blackBackdropActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.homeScreenActive = !this.homeScreenActive;
      this.blackBackdropActive = !this.blackBackdropActive;
    },
    showCategoryScreen() {
      this.categoryScreenActive = true;
    },
    hideCategoryScreen() {
      this.categoryScreenActive = false;
    },
    showAddTaskScreen() {
      this.addTaskScreenActive = true;
    },
    hideAddTaskScreen() {
      this.addTaskScreenActive = false;
    },
    hideAllScreens() {
      this.homeScreenActive = false;
      this.blackBackdropActive = false;
      this.categoryScreenActive = false;
      this.addTaskScreenActive = false;
    },
    addTask() {
      if (this.newTask && this.newTaskCategory) {
        this.tasks.push({
          id: this.tasks.length + 1,
          name: this.newTask,
        });
        this.newTask = "";
        this.newTaskCategory = "";
      }
    },
    cancelAddTask() {
      this.newTask = "";
      this.newTaskCategory = "";
      this.addTaskScreenActive = false;
    },
  },
};
</script>

<style scoped>
@import "../css/style.css";
</style>
