<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="handleChange(todo.id)"
      />
      <input
        ref="myFocus"
        type="text"
        v-show="todo.isEdit"
        :value="todo.title"
        @blur="handleblur(todo, $event)"             
        @keyup.enter="handleblur(todo, $event)" 
      />
    </label>
    <span v-show="!todo.isEdit"> {{ todo.title }}</span>
    <button class="btn btn-danger" @click="handledelete(todo.id)">删除</button>
    <button
      class="btn btn-edit"
      @click="handleEdit(todo)"
      v-show="!todo.isEdit"
    >
      编辑
    </button>
  </li>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "MyItem",
  // 声明接收数据
  props: ["todo"],
  methods: {
    handleChange(id) {
      // 通知App组件将对应的done值取反
      // console.log(this.todo.done)
      this.$bus.$emit("checkTodo", id);
    },
    // 处理删除
    handledelete(id) {
      if (confirm("确认删除吗？")) {
        // 通知App组件将对应id的todo删除
        pubsub.publish("deleteTodo", id);
      }
    },
    // 处理编辑
    handleEdit(todo) {
      // 判断todo身上是否有isEdit属性 如果有了就不在添加，提高效率
      if ("isEdit" in todo) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true); 
      }
      // 编辑时获取焦点
      this.$nextTick(function () {
        this.$refs.myFocus.focus();
      });
    },
    // 编辑失去焦点
    handleblur(todo, e) {
      todo.isEdit = false;
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
/* item */
li {
  color: rgb(0, 4, 7);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
  /* list-style: inside number; */
  list-style: symbols();
  list-style-position: unset;
  /* list-style-type: var(10px); */
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li button {
  float: right;
  display: none;
  margin-top: 3px;
}
li:before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: #ddd;
}
/* 鼠标悬浮时显示 */
li:hover button {
  display: block;
}
</style>