<template>
  <div class="project">
    <b-form  class="text-center">
      <label for="project" class="mr-sm-4">Project</label>
      <b-form-select  v-model="projectId" id="project" @change="fetchDashboards($event)" class="mb-6 mr-sm-5 w-auto">
        <option disabled value="">Please select an option</option>
        <option v-for="project in projectList" v-bind:value="{id:project.Id,name:project.Name}" :key="project.Name">{{ project.Name }}</option>
      </b-form-select>
      <b-button size="sm" @click="addProject()" class="btn mb-1 mt-1"><font-awesome-icon icon="plus-circle" size="1x"/>&nbsp;Add Project</b-button>
    </b-form>
    <component-dashboard :dashboardList="dashboardList" :projectId="projectId"></component-dashboard>
    <b-modal no-close-on-backdrop title="Add Project" body-class="mt-2 p-0" hide-footer ref="addProject">
      <b-form ref="form">
        <b-form-group class="pr-3 pl-3" id="fieldset-horizontal" label-cols-sm="6" label-cols-lg="6" label="Project" label-for="project">
          <b-form-input id="project" v-model="projectInfo.name" :state="validate" required></b-form-input>
        </b-form-group>
        <b-form-group class="pr-3 pl-3" id="fieldset-horizontal" label-cols-sm="6" label-cols-lg="6" label="Dashboard"
                      label-for="dashboard" required>
          <b-form-input id="dashboard" v-model="projectInfo.dashboard" :state="validate" required></b-form-input>
        </b-form-group>
        <b-form-group class="pr-3 pl-3" id="fieldset-horizontal" label-cols-sm="6" label-cols-lg="6" label="Description"
                      label-for="description">
          <b-form-textarea id="description" v-model="projectInfo.description" :state="validate" required></b-form-textarea>
        </b-form-group>
      </b-form>
      <footer class="modal-footer mt-2">
        <b-button size="sm" @click="closeModal('addProject')">Close</b-button>
        <b-button size="sm" @click="createProject()">Save</b-button>
      </footer>

    </b-modal>
  </div>
</template>
<script>
  import Dashboard from "./Dashboard.vue";
  import CrudDataService from "../../service/CrudDataService.ts";

  export default {
    name:'project',
    components:{
      'component-dashboard': Dashboard
    },
    data() {
      return {
        projectList: [],
        dashboardList:[],
        projectId: '',
        validate:    null,
        projectInfo: {
          id: '',
          name: '',
          dashboard:'',
          description: '',
          createdOn: '',
          modifiedOn: '',
        }
      }
    },
    created: async function () {
      CrudDataService.getAll('/projects').then(response=>{
        if(response.data == "" || response.data == null) return ;
        this.projectList      =
          typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      }).catch(error=>{
         alert("Unable to fetch the data"+error.message);
      });
    },
    methods:{
      fetchDashboards(project){
        CrudDataService.getById('/dashboards/',project.id).then(response => {
          this.dashboardList = response.data;
        }).catch(error => {
          alert("Unable to fetch the data"+error.message);
        });
      },
      addProject(){
        this.dashboard = null;
        this.project = null;
        this.description = null;
        this.$refs['addProject'].show();
      },
      checkFormValidity() {
        const valid   = this.$refs.form.checkValidity();
        this.validate = valid;
        return valid;
      },
      closeModal(name) {
        this.$refs[name].hide();
      },
      createProject() {
        if(!this.checkFormValidity()){
          return;
        }
        const projectData = this.projectInfo;
        CrudDataService.create('project/create',projectData).then(response => {
          this.closeModal('addProject');
          this.$router.go();
        }).catch(error => {
          alert("Unable create the record"+error);
        })
      }

    }
  }
</script>