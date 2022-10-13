<template>
  <div>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
           <v-list-item-group
      
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="handleclick(i)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <dialog-edit
      v-if="dialogs.edit"
      @close="dialogs.edit = false"
      :task="task"
    />
      <dialog-duedate
      v-if="dialogs.dueDate"
      @close="dialogs.dueDate = false"
      :task="task"
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :task="task"
    />
  </div>
</template>

<script>
export default {
    props:['task'],
    data: () => ({
      items: [
        { 
            text: 'Edit', 
            icon: 'mdi-pencil' ,
            click(){
                this.dialogs.edit=true
            }
        },
        { 
            text: 'Due Date', 
            icon: 'mdi-calendar' ,
            click(){
                this.dialogs.dueDate=true
            }
        },
        { 
            text: 'Delete', 
            icon: 'mdi-delete' ,
            click(){
                this.dialogs.delete=true
            }
        },
        { 
            text: 'Sort', 
            icon: 'mdi-drag-horizontal-variant' ,
            click(){
                if(!this.$store.state.search){
                    this.$store.commit('toggleSorting')
                }
                else{
                    this.$store.commit('showSnackbar','Sorting is Disabled')
                }
                
            }
        }
      ],
      dialogs: {
        delete: false,
        edit: false,
        dueDate: false
      }
    }),
    methods:{
        handleclick(i){
            this.items[i].click.call(this)
        }
    },
    components: {
    'dialog-delete': require('@/components/Todo/Dialogs/DialogDelete.vue').default,
    'dialog-edit': require('@/components/Todo/Dialogs/DialogEdit.vue').default,
    'dialog-duedate': require('@/components/Todo/Dialogs/DialogDueDate.vue').default,
  }
};
</script>

<style>
</style>