<template>
  <ol class="todo-main" reversed>
    <transition-group
      :appear="true"
      name="animate__animated animate__bounce"
      enter-active-class="animate__bounceInRight"
      leave-active-class="animate__lightSpeedOutLeft"
    >
      <MyItem
        v-for="todoObj in todos"
        :key="todoObj.id"
        :todo="todoObj"
        :style="{ backgroundColor: myColor() }"
      />
    </transition-group>
  </ol>
</template>

<script>
import "animate.css";
import MyItem from "./MyItem";
export default {
  name: "MyList",
  components: {
    MyItem,
  },
  props: ["todos"],
  methods: {
    myColor() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      return color;
    },
  },
};
</script>

<style scoped>
/* List */
.todo-main {
  margin-left: 0;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0;
}
.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  padding-left: 5px;
  margin-top: 10px;
  border-radius: 2px;
}
</style>