<template>
  <v-text-field
    v-model="newTaskTitle"
    @keyup.enter="addTask"
    class="field-add-task pa-3"
    outlined
    placeholder="Add Task"
    hide-details
    clearable
  >
  
    <template v-slot:append>
      <v-icon
      @click="addTask"
      :disabled="taskinvalid"
      >mdi-plus</v-icon>
    </template
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: "",
    };
  },
  computed:{
    taskinvalid(){
      return !this.newTaskTitle
    }
  },
  methods: {
    addTask() {
      if(!this.taskinvalid ){
        this.$store.dispatch("addTask", this.newTaskTitle);
        this.newTaskTitle = "";
      }
    },
  },
};
</script>
<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: rgb(219, 194, 194);
}


</style>

