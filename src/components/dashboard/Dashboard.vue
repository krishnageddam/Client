<template>
  <div class="dashboardview">
    <div class="mt-4" v-if="projectId">
      <b-button size="sm"  @click="addDashboard()" class="btn mb-1 mt-1 float-right"><font-awesome-icon icon="plus-circle" size="1x"/>&nbsp;Add Dashboard</b-button>
      <b-table-simple hover bordered striped caption-top responsive>
        <b-thead>
          <b-tr>
            <b-th class="text-center">Dashboard Name</b-th>
            <b-th class="text-center">Description</b-th>
            <b-th class="text-center">Created On</b-th>
            <b-th class="text-center" colspan="3">Action</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="dashboard in dashboardList"  :key="dashboard.Id">
            <b-td class="pt-3-half text-center">{{dashboard.Name}}</b-td>
            <b-td class="pt-3-half text-center">{{dashboard.CreatedOn}}</b-td>
            <b-td class="pt-3-half text-center">{{dashboard.Description}}</b-td>
            <b-td class="text-center">
              <span class="table-remove"><b-button size="sm" @click="editDashboard(dashboard)" class="btn "><font-awesome-icon icon="edit" size="1x"/></b-button></span>
            </b-td>
            <b-td class="text-center">
              <span class="table-remove"><b-button size="sm" @click="deleteDashboard(dashboard.Id)" class="btn"><font-awesome-icon icon="trash" size="1x"/></b-button></span>
            </b-td>
            <b-td class="text-center">
              <span class="table-remove"><b-button size="sm" @click="showDashboard(dashboard.Name)" class="btn"><font-awesome-icon icon="eye" size="1x"/></b-button></span>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
    <b-modal no-close-on-backdrop size="md" v-bind:title="dashboardLabel" body-class="mt-2 p-0 custom-scroll" hide-footer ref="modify">
      <b-form ref="form">
        <b-form-group class="pr-3 pl-3" id="fieldset-horizontal" label-cols-sm="6" label-cols-lg="6" label="Project"
                      label-for="project">
          <b-form-input id="project" disabled v-model="projectId.name"></b-form-input>
        </b-form-group>
        <b-form-group class="pr-3 pl-3" id="fieldset-horizontal" label-cols-sm="6" label-cols-lg="6" label="Dashboard"
                      label-for="dashboard">
          <b-form-input id="dashboard" v-model="dashboardInfo.name" required :state="validate"></b-form-input>
        </b-form-group>
        <b-form-group class="pr-3 pl-3" id="fieldset-horizontal" label-cols-sm="6" label-cols-lg="6" label="Description"
                      label-for="description">
          <b-form-textarea id="description" v-model="dashboardInfo.description" ></b-form-textarea>
        </b-form-group>
      </b-form>
      <footer class="modal-footer mt-2">
        <b-button size="sm" @click="closeModal('modify')">Close</b-button>
        <b-button size="sm" @click="save(dashboardInfo,'modify')">Save</b-button>
      </footer>
    </b-modal>
    <b-modal no-close-on-backdrop scrollable title="Delete" body-class="mt-2 text-center p-0"
             hide-footer ref="deleteDashboard">
         <span class="text-warning">
        Do you want to delete '{{dashboard}}' dashboard ?
      </span>
      <footer class="modal-footer mt-2">
        <b-button size="sm" class="mr-2" @click="closeModal('deleteDashboard')">Close</b-button>
        <b-button size="sm" class="mr-2" @click="remove(dashboard,'deleteDashboard')">Delete</b-button>
      </footer>
    </b-modal>
    <b-modal no-close-on-backdrop dialog-class="w-auto mw-100 p-3" body-class="mt-2 p-0"
             hide-footer ref="showDashboard">
      <iframe v-if="dashboard == '' " class="dashboard-frame"
              v-bind:src="url + projectId.name">
      </iframe>
      <iframe v-if="dashboard != ''" class="dashboard-frame"
              v-bind:src="url + projectId.name + '.' + dashboard">
      </iframe>
    </b-modal>
  </div>
</template>
<script>
  import CrudDataService from "../../service/CrudDataService.ts"
  export default {
    name:'dashboardview',
    props:{
      dashboardList:{
        type:Array,
        default:null
      },
      projectId:{
        type: Object,
        default: null
      }
    },
    data(){
      return{
        dashboardInfo: {
          id: '',
          name: '',
          description: '',
          ProjectId:'',
          createdOn: '',
          modifiedOn: '',
        },
        dashboard:{},
        dashboardLabel:'',
        validate:    null,
        url:         null,
      }
    },
    created: async function () {
      CrudDataService.getConfigUrl('configurationURL').then(response=>{
        this.url = response.data;
      }).catch(error=>{
        alert("Unable to fetch the data"+error.message);
      })
    },
    methods:{
      checkFormValidity() {
        const valid   = this.$refs.form.checkValidity();
        this.validate = valid;
        return valid;
      },
      addDashboard() {
        this.dashboardInfo = {};
        this.validate  = null;
        this.dashboardLabel = 'Add';
        this.$refs['modify'].show();
      },
      editDashboard(dashboard) {
        this.validate = null;
        this.dashboardLabel = 'Edit';
        this.dashboardInfo.id = dashboard.Id;
        this.dashboardInfo.name = dashboard.Name;
        this.dashboardInfo.description = dashboard.Description;
        this.$refs['modify'].show();
      },
      deleteDashboard(dashboard) {
        this.$refs['deleteDashboard'].show();
        this.dashboard = dashboard;
      },
      showDashboard(dashboard) {
        this.dashboard = dashboard;
        this.$refs['showDashboard'].show();
      },
      save(dashboardInfo,modalName) {
        this.dashboardInfo.projectId = this.projectId.id;

        if (!this.checkFormValidity()) {
          return;
        }
        CrudDataService.create('dashboard/update', dashboardInfo).then(response => {
          this.closeModal(modalName);
          this.$parent.fetchDashboards(this.projectId);
        }).catch(error => {
              alert("Unable to update the record"+error.toString());
        })
      },
      remove(dashboard) {
        //API CALL
      },
      closeModal(name) {
        this.$refs[name].hide();
      },
    }
  }
</script>