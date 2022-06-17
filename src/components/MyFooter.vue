<template>
  <div>
    <div class="todo-footer" v-show="total">
      <label for="">
        <input type="checkbox" v-model="isAll" />
      </label>
      <span>已完成 {{ doneTotal }} 条</span> / 全部 {{ total }} 条
      <button class="btn btn-danger" @click="clearAll">清除已完成的任务</button>
    </div>
    <div v-show="!total" class="zan">
      <h4>你的任务列表空空如也，比你的脸还干净</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos", "checkedAllTodo", "clearAllTodo"],
  computed: {
    total() {
      return this.todos.length;
    },
    doneTotal() {
      return this.todos.reduce((pre, todo) => {
        return pre + (todo.done ? 1 : 0);
      }, 0);
    },
    isAll: {
      get() {
        return this.total === this.doneTotal && this.total > 0;
      },
      set(value) {
        this.$emit("checkedAllTodo", value);
      },
    },
  },
  methods: {
    clearAll() {
      if (confirm('确认清除勾选的吗？')) {
        this.$emit("clearAllTodo");
      }
    },
  },
};
</script>

<style scoped>
/* footer */
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}
.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}
.todo-footer button {
  float: right;
  margin-top: 5px;
}
/* 暂无数据 */
.zan {
  text-align: center;
  font-family: initial;
  font-size: 18px;
  color: red;
}
</style>