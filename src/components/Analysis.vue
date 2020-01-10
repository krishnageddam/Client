<template>
  <div class="analysis">
    <b-form class="text-center">
      <label class="mr-sm-4" for="project">Project</label>
      <b-form-select v-model="projectName"  class="mb-6" id="project" style="width: auto;margin-right: 24px;">
        <option disabled value="null">Please select project</option>
        <option v-for="(result,key) in projectList" :key="key">{{ key }}</option>
      </b-form-select>
      <label class="mr-sm-4"  for="dashboard">Dashboard</label>
      <b-form-select  v-model="dashboard"  id="dashboard" class="mb-6" style="width: auto;margin-right: 24px;">
        <option disabled value="null">Please select dashboard</option>
        <option v-for="(result,key) in projectList[projectName]" :key="key">{{ key }}</option>
      </b-form-select>
    </b-form>
  </div>
</template>
<script>
  import http from "axios";
  export default {
    name:    "Analysis",
    data() {
      return {
        projectList: null,
        url:         null,
        projectName: null,
        dashboard:   null,
      }
    },
    created: async function () {
      let projectResponse   = await http.get('/projects');
      let configUrlResponse = await http.get('configurationURL');
      this.projectList      = typeof projectResponse.data === "string" ? JSON.parse(projectResponse.data) : projectResponse.data;
      this.url              = configUrlResponse.data;
    }
  };
</script>
<style lang="css">
</style>