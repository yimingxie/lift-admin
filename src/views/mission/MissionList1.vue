<template>
  <todo-list :todos="todos">
    <template slot-scope="slotProps">
      <span v-if="slotProps.todo.isComplete">✓</span>
      <span>{{slotProps.todo.text}}</span>
    </template>
    <template v-slot:aaa>
      <div>ddddddddd</div>
    </template>
  </todo-list>
</template>
 
<script>
import todoList from "../../components/todoList";
// import todoList from './todoList'
export default {
  data () {
    return {
      dynamicSlotName:"aaa",
      todos: [
        {
          id: 0,
          text: 'ziwei0',
          isComplete: false
        },
        {
          text: 'ziwei1',
          id: 1,
          isComplete: true
        },
        {
          text: 'ziwei2',
          id: 2,
          isComplete: true
        },
        {
          text: 'ziwei3',
          id: 3,
          isComplete: false
        }
      ]
    }
  },
 
  components: {
    todoList
  },
 
}
</script>