<template>
  <div class="home">

    <list-tasks
      v-if="$store.state.tasks.length"
    />

    <no-tasks
      v-else
    />

    <button-sorting v-if="$store.state.sorting"></button-sorting>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    'list-tasks': require('@/components/Todo/ListTasks.vue').default,
    'no-tasks': require('@/components/Todo/NoTasks.vue').default,
    'button-sorting': require('@/components/Todo/ButtonSorting.vue').default
  }
}
</script>