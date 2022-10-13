<template>
    <div class="text-subtitle-1 ml-4">
        {{date}}
    </div>
</template>

<script>
import { format } from 'date-fns'
export default {
    data(){
        return{
            date:''
        }
    },
    mounted(){
        this.getDate()
    },
    methods:{
        getDate(){
            this.date= format(new Date(), 'MMMM d, hh:mm:ss')
            setTimeout(this.getDate, 1000)
        }
    }
};
</script>

<style>
</style>