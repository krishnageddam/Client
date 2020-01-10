<template>
  <div class="project">
    <b-form class="text-center">
      <label for="superdashboard" class="mr-sm-4">Super Dashboard</label>
      <b-form-select v-model="superDashboardId" id="superdashboard" @change="fetchDashboards($event)" class="mb-6 mr-sm-5 w-auto">
        <option disabled value="">Please select an option</option>
        <option v-for="dashboard in superDashboardList" v-bind:value="{id:dashboard.Id,Name:dashboard.Name}" :key="dashboard.Id">
          {{ dashboard.Name }}
        </option>
      </b-form-select>
      <b-button size="sm" @click="showAddModal(null)" class="btn mb-1 mt-1">
        <font-awesome-icon icon="plus-circle" size="1x"/>&nbsp;Add Super Dashboard
      </b-button>
    </b-form>
    <b-button size="sm" v-if="dashboardsList.length > 0" @click="showEditModal()" class="btn float-right mb-1 ml-3">
      <font-awesome-icon icon="edit" size="1x"/>Edit</b-button>
    <b-button size="sm" v-if="dashboardsList.length > 0" @click="showDashboard()" class="btn float-right mb-1">
      <font-awesome-icon icon="eye" size="1x"/>Show</b-button>
    <b-table-simple v-if="dashboardsList.length > 0" hover bordered striped caption-top responsive>
      <b-thead>
        <b-tr>
          <b-th class="text-center">Project Name</b-th>
          <b-th class="text-center">Dashboard Name</b-th>
          <b-th class="text-center">Description</b-th>
          <b-th class="text-center">Created On</b-th>
          <b-th class="text-center">Sort</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(dashboard,index) in dashboardsList" :key="index">
          <b-td class="pt-3-half text-center">{{dashboard.ProjectName}}</b-td>
          <b-td class="pt-3-half text-center">{{dashboard.DashboardName}}</b-td>
          <b-td class="pt-3-half text-center">{{dashboard.Description}}</b-td>
          <b-td class="pt-3-half text-center">{{dashboard.CreatedOn}}</b-td>
          <b-td class="pt-3-half text-center"><span><button @click="sortPositionUp(index,dashboard)"><font-awesome-icon icon="arrow-up"/></button><br/>
            <button @click="sortPositionDown(index,dashboard)"><font-awesome-icon icon="arrow-down"/></button></span></b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-modal no-close-on-backdrop scrollable size="lg" dialog-class="w-auto h-auto mh-100 mw-100 p-3" body-class="mt-2 p-0"
             hide-footer ref="showDashboard">
      <div>
        <iframe v-for="dashboards in dashboardsList" :key="dashboards.DashboardName" class="i-frame ml-4"
                v-bind:src="url + dashboards.ProjectName + '.' + dashboards.DashboardName + '&orientation=rightside'">
        </iframe>
      </div>
    </b-modal>
    <b-modal no-close-on-backdrop title="Delete" body-class="mt-2 text-center p-0" hide-footer
             ref="delete">
      <span class="text-warning">
        Do you want to delete this record ?
      </span>
      <footer class="modal-footer mt-2">
        <b-button size="sm" class="mr-2" @click="closeModal('delete')">Close</b-button>
        <b-button size="sm" class="mr-2" @click="remove(dashboard,'deleteDashboard')">Delete</b-button>
      </footer>
    </b-modal>
    <b-modal no-close-on-backdrop :title="dashboardLabel" size="md" body-class="mt-2 p-0" hide-footer ref="add">
      <b-form>
        <b-form-group class="pr-3 pl-3" id="fieldset-horizontal" label-cols-sm="6" label-cols-lg="6" label="Name" label-for="project">
          <b-form-input id="project" v-model="superDashboardForm.Name" :state="validate" required></b-form-input>
        </b-form-group>
        <b-form-group class="pr-3 pl-3" id="fieldset-horizontal" label-cols-sm="6" label-cols-lg="6" label="Description"
                      label-for="description">
          <b-form-textarea id="description" v-model="superDashboardForm.Description" :state="validate" required></b-form-textarea>
        </b-form-group>
        <b-table-simple hover sticky-header="true" bordered striped caption-top responsive class="pr-3 pl-3">
          <b-thead>
            <b-tr>
              <b-th class="text-center">Select</b-th>
              <b-th class="text-center">Project Name</b-th>
              <b-th class="text-center">Dashboard Name</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(project,index) in superDashboardForm.projectsList" :key="index">
              <b-td class="pt-3-half text-center">
                <span>
                <b-form-checkbox v-model="project.selected" :name="project.DashboardId + project.ProjectId"></b-form-checkbox>
                </span></b-td>
              <b-td class="pt-3-half text-center">{{project.ProjectName}}</b-td>
              <b-td class="pt-3-half text-center">{{project.DashboardName}}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-form>
      <footer class="modal-footer mt-2">
        <b-button size="sm" @click="closeModal('add')">Close</b-button>
        <b-button size="sm" @click="addSuperDashboard()">Create</b-button>
      </footer>
    </b-modal>
  </div>
</template>
<script>
  import CrudDataService from "../../service/CrudDataService.ts";
  export default {
    name:    'superdashboard',
    data() {
      return {
        superDashboardList: [],
        dashboardsList:     [],
        superDashboardId:   '',
        deleteObj:          {},
        editObj:            {},
        selectedProjects:   {
          ids: ""
        },
        dashboardLabel:'Add',
        superDashboardForm: {
          projectsList: []
        },
        validate:           null,
        url:                ''
      };
    },
    created: async function () {
      this.fetchSuperDashboardNames();
      this.getDashboardUrl();
    },
    methods: {
      fetchSuperDashboardNames: async function () {
        CrudDataService.getAll('/superdashboard').then(response=>{
          if (response.data == "" || response.data == null) {
            return;
          }
          this.superDashboardList =
            typeof response.data === "string" ? JSON.parse(response.data) : response.data;
        }).catch(error=>{
           alert("Unable to fetch the data"+error.message);
        });
      },
      getDashboardUrl(){
        CrudDataService.getConfigUrl('configurationURL').then(response=>{
          this.url = response.data;
        }).catch(error=>{
          alert("Unable to get the Url"+error.message);
        });
      },
      fetchDashboards(superDashboard) {
        CrudDataService.getById('/superdashboard/',superDashboard.Name).then(response => {
          this.dashboardsList = response.data;
          if (this.dashboardsList.length == 0) {
            this.$forceUpdate();
          }
          this.editObj.Id          = this.dashboardsList[0].Id;
          this.editObj.Name        = this.dashboardsList[0].Name;
          this.editObj.Description = this.dashboardsList[0].Description;
        }).catch(error => {
          alert("Unable to fetch the data" + error.toString());
        });
      },
      addSuperDashboard() {
        CrudDataService.create('superdashboard/update', this.superDashboardForm).then(response => {
          if (response.status == 200) {
            this.closeModal('add');
            this.fetchSuperDashboardNames();
            if (this.superDashboardForm.Id != null) {
              this.superDashboardId = { id:this.superDashboardForm.Id,Name:this.superDashboardForm.Name};
              this.fetchDashboards(this.superDashboardForm);
            }
          }
        }).catch(error => {
          alert("Unable to update the records" + error.message);
        });
      },
      showDashboard() {
        this.$refs['showDashboard'].show();
      },
      showEditModal() {
        this.dashboardLabel = 'Edit';
        this.superDashboardForm = {};
        CrudDataService.getAll('/superdashboard/projects/').then(response => {
          this.superDashboardForm = this.editObj;
          for (let i = 0; i < response.data.length; i++) {
            for(let j=0; j < this.dashboardsList.length; j++){
              if(((this.dashboardsList[j].DashboardId === response.data[i].DashboardId) &&(this.dashboardsList[j].ProjectId === response.data[i].ProjectId))){
                 response.data[i].selected = true;
                 break;
               }
            }
          }
          this.superDashboardForm.projectsList = response.data;
        }).catch(error => {
          alert("Unable to fetch the data" + error.message);
        });
        this.$refs['add'].show();
      },
      showAddModal() {
        this.dashboardLabel = 'Add';
        this.superDashboardForm = {
          projectsList: []
        };
        CrudDataService.getAll('/superdashboard/projects/').then(response => {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].selected = false;
          }
          this.superDashboardForm.projectsList = response.data;
        }).catch(error => {
          alert("Unable to fetch the data" + error.message);
        });
        this.$refs['add'].show();
      },
      showDeleteModal(dashboard) {
        this.deleteObj = dashboard;
        this.$refs['delete'].show();
      },
      closeModal(modalName) {
        this.$refs[modalName].hide();
      },
      sortPositionUp:function (rowIndex,dashboardObj) {
        let prevRecord = this.dashboardsList[rowIndex-1];
        if(prevRecord == null) return;
        this.dashboardsList.splice(rowIndex - 1, 0, this.dashboardsList.splice(rowIndex, 1)[0]);
        let updateObject = [];
        dashboardObj.Position = dashboardObj.Position - 1;
        prevRecord.Position = prevRecord.Position + 1 ;
        updateObject.push(dashboardObj);
        updateObject.push(nextRecord);
        CrudDataService.create("/superdashboard/updateindex","").then(response=>{}).catch(error=>{});

      },
      sortPositionDown:function (rowIndex,dashboardObj) {
        let nextRecord = this.dashboardsList[rowIndex+1];
        if(nextRecord == null) return;
        dashboardObj.Position = dashboardObj.Position + 1;
        nextRecord.Position = nextRecord.Position - 1;
        this.dashboardsList.splice(rowIndex + 1, 0, this.dashboardsList.splice(rowIndex, 1)[0]);
        let updateObject = [];
        updateObject.push(dashboardObj);
        updateObject.push(nextRecord);
        CrudDataService.create("/superdashboard/updateindex","").then(response=>{}).catch(error=>{});
      },
      remove() {
        CrudDataService.delete('/superdashboard/delete/', {data: this.deleteObj}).then(response => {
          this.fetchDashboards(this.deleteObj);
          this.deleteObj = null;
          this.closeModal('delete');
        }).catch(error => {
          alert("Unable to delete this record" + error.toString());
        });
      }
    }
  };
</script>
<style>
  .i-frame {
    height:        650px !important;
    width:         46% !important;
    margin:        0;
    padding-left:  14px;
    padding-right: 14px;
    border:        none;
  }
</style>