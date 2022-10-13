<template>
  <v-list
    class="pt-0"
    flat
  >
  <draggable
      v-model="tasks"
      handle=".handle"
    >
      <task 
      v-for="task in tasks"
      :key="task.id"
      :task="task"
    />
  </draggable>
  </v-list>
</template>

<script>
import draggable from "vuedraggable";
export default {
   computed: {
    tasks: {
      get() {
        /* console.log(this.$store.getters.TaskFiltered) */
        return this.$store.getters.TaskFiltered
      },
      set(value) {
        this.$store.dispatch('setTasks', value)
      }
    }
  },
  components: {
    'task': require('@/components/Todo/Task.vue').default,
    draggable
  }
}
</script>