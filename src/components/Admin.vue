<template>
  <div class="admin">
    <b-form class="text-center">
      <label class="mr-sm-4" for="project">Project</label>
      <b-form-select v-model="projectName" @change="dashboard = null" class="mb-6" id="project" style="width: auto;margin-right: 24px;">
        <option disabled value="null">Please select project</option>
        <option v-for="(result,key) in projectList" :key="key">{{ key }}</option>
      </b-form-select>
      <label class="mr-sm-4" v-if="projectName" for="dashboard">Dashboard</label>
      <b-form-select v-if="projectName" v-model="dashboard"  id="dashboard" class="mb-6" style="width: auto;margin-right: 24px;">
        <option disabled value="null">Please select dashboard</option>
        <option v-for="(result,key) in projectList[projectName]" :key="key">{{ key }}</option>
      </b-form-select>
    </b-form>
    <div style="text-align: left" v-if="dashboard != null">
      <h4>{{projectName}} Execution Dashboard</h4>
    </div>
    <div class="p-3">
      <div class="dashboard" v-if="dashboard != null">
        <!--<div class="dashboard-title"> {{ dashboard || projectName }}</div>
        <div class="max-button" onclick="max(this)"><img
          src="https://nexiality.github.io/documentation/assets/project/newtab.png"/></div>-->
        <iframe v-if="dashboard == '' " class="dashboard-frame"
                v-bind:src="url + projectName">
        </iframe>
        <iframe v-if="dashboard != ''" class="dashboard-frame"
                v-bind:src="url + projectName + '.' + dashboard">
        </iframe>
      </div>
    </div>
  </div>
</template>
<script>
  import http from "axios";

  export default {
    name:    "admin",
    data() {
      return {
        projectList: null,
        url:         null,
        projectName: null,
        dashboard:   null,
      };
    },
    created: async function () {
      let projectResponse   = await http.get('/projects');
      let configUrlResponse = await http.get('configurationURL');
      this.projectList      =
        typeof projectResponse.data === "string" ? JSON.parse(projectResponse.data) : projectResponse.data;
      this.url              = configUrlResponse.data;
    }
  };
</script>
<style lang="css">
  .dashboard {
    height:        100% !important;
    width:         100% !important;
    border:        1px solid rgba(230, 230, 220, 0.915);
    float:         left;
    box-shadow:    0 10px 10px rgba(100, 100, 100, 0.5);
    border-radius: 15px 15px 5px 5px;
    text-align:    center;
  }

  .dashboard-frame {
    height:  600px !important;
    width:   100%!important;
    margin:  0;
    padding: 0;
    border:  none;
  }
</style>