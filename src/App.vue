<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter
          :todos="todos"
          @checkedAllTodo="checkedAllTodo"
          @clearAllTodo="clearAllTodo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
import MyHeader from "./components/MyHeader";
import MyList from "./components/MyList";
import MyFooter from "./components/MyFooter";

export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
    MyList,
  },
  data() {
    return {
      // 准备数据 如果没有数据最好用[]空数组 要不然找数据时会undefined的导致数据访问失败 undefined是没有长度的
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    // 添加一个todoObj
    addTodo(todoObj) {
      // 过滤掉内容重复的
      // 将添加的值已经从在的过滤掉 不在添加，将不一样的进行添加
      this.todos = this.todos.filter((todo) => {
        return todo.title != todoObj.title;
      });
      this.todos.unshift(todoObj);
    },
    // 勾选or取消勾选
    checkTodo(id) {
      // 通过id找到是哪一个todo项，然后在将其done值去反
      this.todos.forEach((todo) => {
        if (todo.id == id) todo.done = !todo.done;
      });
    },
    // 删除一个todo
    // 删除就是将其id相同的过滤掉
    deleteTodo(_, id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    // 更新一个todo
    updateTodo(id, title) {
      // 从数据中遍历 拿到每一个todo项 然后通过id辨别身份 将title值更新
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
      });
    },
    // 全选或者全不选
    checkedAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done;
      });
    },
    // 清除所有已完成的
    clearAllTodo() {
      // 通过过滤todos拿到每一个todo 将done值为真的就是勾选的晒选掉
      this.todos = this.todos.filter((todo) => {
        return todo.done !== true;
      });
    },
  },
  watch: {
    // 将数据放到本地存储
    todos: {
      // 默认是浅层次 如果不设置就会导致无法监视勾选状态（刷新时不会记录勾选的状态）
      deep: true,
      handler(newValue) {
        localStorage.setItem("todos", JSON.stringify(newValue));
      },
    },
  },
  // 挂在完成绑定事件
  mounted() {
    // 通过全局事件总线实现
    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("updateTodo", this.updateTodo);
    // 通过消息的订阅与发布实现
    this.pubId = pubsub.subscribe("deleteTodo", this.deleteTodo);
  },
  // 解绑事件
  beforeDestroy() {
    this.$bus.$off(["checkTodo", "updatatodo"]);
    pubsub.unscribe(this.pubId);
  },
};
</script>

<style>
/* base */
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-edit {
  color: #fff;
  background-color: rgb(50, 163, 207);
  border: 1px solid rgb(104, 165, 189);
  margin-right: 5px;
}
.btn-edit:hover {
  background-color: rgb(12, 104, 141);
}
.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 30px;
  border: 2px solid #ddd;
  border-radius: 10px;
}
</style>
