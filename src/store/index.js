import Vue from 'vue'
import Vuex from 'vuex'

import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      /* {
        id: 1,
        title: 'Wake up',
        done: false,
        dueDate: '2022-11-01'
      },
      {
        id: 2,
        title: 'Get bananas',
        done: false,
        dueDate: '2022-12-01'
      },
      {
        id: 3,
        title: 'Eat bananas',
        done: false,
        dueDate: null
      } */
    ],
    snackbar: {
      show: false,
      text: ''
    },
    search:null,
    appTitle: process.env.VUE_APP_TITLE,
    sorting:false
  },
  mutations: {
    addTask(state, newTask) {
      state.tasks.push(newTask)
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    showSnackbar(state, text) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    },
    updateTaskTitle(state,payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title=payload.title
    },
    updateTaskDueDate(state,payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate=payload.dueDate
    },
    setSearch(state, value){
      state.search=value
    },
    toggleSorting(state){
      state.sorting=!state.sorting
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(()=>{
        commit('addTask', newTask)
        commit('showSnackbar', 'Task added!')
      })
      
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({id}).delete().then(()=>{
        commit('deleteTask', id)
        commit('showSnackbar', 'Task deleted!')
      })
      
    },
    updateTaskTitle({commit},payload){
      db.collection('tasks').doc({id:payload.id}).update({
        title: payload.title
      }).then(()=>{
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task Edited!')
      })
      
    },
    updateDueDate({commit},payload){
      db.collection('tasks').doc({id:payload.id}).update({
        dueDate: payload.dueDate
      }).then(()=>{
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Due Date updated!')
      })
      
    },
    getTasks({commit}){
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks)
      })
    },
    doneTask({state,commit}, id){
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({id}).update({
        done: !task.done
      }).then(()=>{
        commit('doneTask', id)
      })

    },
    setTasks({commit},tasks){
      db.collection('tasks').set(tasks).then(()=>{
        commit('setTasks', tasks) 
      })
      
    }
  },
  getters: {
    TaskFiltered(state){
      /* if(!state.search){
        return state.tasks
      } */
      if(state.search){
        return state.tasks.filter(task=> task.title.toLowerCase().includes(state.search.toLowerCase()))
      }
      return state.tasks
      },

  }
})
