<template>
  <div class="home">
    <!--<b-button size="sm" @click="showDashboard()" v-if="superDashboard" class="btn float-md-right">Project Dashboard</b-button>
    <b-button size="sm" @click="showSuperDashboard()()" v-if="!superDashboard" class="btn float-md-right">Super Dashboard</b-button>-->
    <div class="custom-control custom-switch float-right">
      <input type="checkbox" @change="showDashboard($event)" :value="superDashboard" class="custom-control-input" id="customSwitches">
      <label class="custom-control-label" for="customSwitches">Super Dashboard</label>
    </div>
    <component :is="toggleComponent"></component>
  </div>
</template>
<script>
  import Project from './dashboard/Project.vue';
  import SuperDashboard from './dashboard/SuperDashboard.vue';
  export default {
    name:    "home",
    components:{
        'component-project': Project,
        'component-superdashboard': SuperDashboard
    },
    props :{
      superDashboard:{
        default:false,
        type:Boolean
      }
    },
    computed :{
      toggleComponent(){
        if(!this.superDashboard){
          return 'component-project';
        }else{
          return 'component-superdashboard';
        }
      }
    },
    methods :{
      showDashboard(event){
        this.superDashboard = event.target.checked;
      }
    }
  };
</script>
<style lang="css">
</style>