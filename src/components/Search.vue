<template>
  <div class="search">
    <b-container>
      <b-card class="text-center">
        <b-form ref="form">
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="6"
          label-cols-lg="6"
          label="Project"
          label-for="project"
        >
          <b-form-input id="project" v-model="project" :state="nameState" required></b-form-input>
        </b-form-group>
          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="6"
            label-cols-lg="6"
            label="Dashboard"
            label-for="dashboard" required
          >
            <b-form-input id="dashboard" v-model="dashboard" :state="nameState" required></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="6"
            label-cols-lg="6"
            label="Description"
            label-for="description"
          >
            <b-form-textarea id="description" v-model="description" :state="nameState" required></b-form-textarea>
          </b-form-group>
          <b-form-group><b-button squared @click="createProject()">SUBMIT</b-button></b-form-group>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>
<script>
	import axios from "axios";

	export default {
		name: "search",
		data() {
			return {
				form: {
					project: '',
					dashboard: '',
					description: ''
				},
        nameState:null
			}
		},
		methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity();
        this.nameState = valid;
        return valid;
      },
			createProject() {
				let headers = {
					'Content-Type': 'application/json',
				};
				if(!this.checkFormValidity()){
				  return;
        }
				axios.post('/create', {headers, data: this.form}).then(response => {
				}).catch(error => {
				})
			}
		}
	};
</script>
<style scoped lang="scss">
  #form {
    margin:        0 auto;
    width:         400px;
    padding:       1em;
    border:        1px solid #ccc;
    border-radius: 1em;
  }

  .div-margin {
    margin-top: 10px;
  }

  label {
    display: inline-block;
    width:   100px;
  }

  input,
  textarea {
    font:       1em sans-serif;
    width:      300px;
    box-sizing: border-box;
    border:     1px solid #999;
  }

  input:focus,
  textarea:focus {
    border-color: #000;
  }

  textarea {
    vertical-align: top;
    height:         5em;
  }

  .button {
    padding-left: 90px;
  }

  button {
    margin-left: .5em;
  }
</style>