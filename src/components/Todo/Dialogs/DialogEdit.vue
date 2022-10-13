<template>
  <v-dialog
    :value="true"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Edit task?
      </v-card-title>
      <v-card-text>
        Edit the title of this task!
        <v-text-field 
        v-model="TaskTitle"
        @keyup.enter="saveTask"
        ></v-text-field>
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="$emit('close')"
          text
        >
          Cancel
        </v-btn>
        <v-btn
          @click="saveTask()"
          color="red darken-1"
          text
          :disabled='!TaskTitle || TaskTitle === task.title'
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['task'],
  data(){
    return{
      TaskTitle:null
    }
  },
  mounted(){
    this.TaskTitle=this.task.title
  },
  methods:{
    saveTask(){
      if(this.TaskTitle!='' || !this.TaskTitle === this.task.title){
        let payload={
          id: this.task.id,
          title: this.TaskTitle
        }
        this.$store.dispatch('updateTaskTitle', payload)
        this.$emit('close')
        this.$vuetify.goTo(0, {duration: 0})
      }
    }
  }
}
</script>

<style>

</style>