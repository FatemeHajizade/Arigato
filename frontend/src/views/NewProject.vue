<template>
  <div id="holePage">
    <v-container>
      <v-layout row align-center justify-center>
        <v-flex xs12 md7 class="pa-2">
          <v-container>
            <v-layout row align-center justify-start>
              <h3 class="display-1 ma-2">Create a new project and find your freelancer!</h3>
            </v-layout>

            <v-stepper v-model="stepBYstep" vertical>
              <v-stepper-step :complete="stepBYstep > 1" step="1">
                Category
                <small>What is the category of your project?</small>
              </v-stepper-step>
              <v-stepper-content step="1">
                <v-select
                  v-model="project.categories"
                  :items="categories"
                  item-text="name"
                  item-value="name"
                  append-icon
                  :menu-props="{ offsetY: true }"
                  multiple
                  chips
                  @input="$v.project.categories.$touch()"
                  @blur="$v.project.categories.$touch()"
                  :error-messages="categoriesConfirm"
                />
                <v-btn
                  dark
                  color="blue darken-3"
                  class="mb-2 mt-3"
                  @click.native="stepBYstep = 2"
                >Next</v-btn>
              </v-stepper-content>
              <v-stepper-step :complete="stepBYstep > 2" step="2">
                Title
                <small>Choose a title for your project</small>
              </v-stepper-step>
              <v-stepper-content step="2">
                <v-text-field
                  type="text"
                  v-model="project.name"
                  @input="$v.project.name.$touch()"
                  @blur="$v.project.name.$touch()"
                  :error-messages="nameConfirm"
                />
                <v-btn
                  dark
                  color="#fa7c15"
                  class="mb-2 mt-3 mr-1"
                  @click.native="stepBYstep = 1"
                >Previous</v-btn>
                <v-btn
                  dark
                  color="blue darken-3"
                  class="mb-2 mt-3 ml-1"
                  @click.native="stepBYstep = 3"
                >Next</v-btn>
              </v-stepper-content>
              <v-stepper-step :complete="stepBYstep > 3" step="3">
                Skills
                <small>What are the skills that your project require?</small>
              </v-stepper-step>
              <v-stepper-content step="3">
                <v-select
                  v-model="project.skills"
                  :items="skills"
                  item-text="name"
                  item-value="name"
                  append-icon
                  :menu-props="{ offsetY: true }"
                  multiple
                  chips
                  @input="$v.project.skills.$touch()"
                  @blur="$v.project.skills.$touch()"
                  :error-messages="skillsConfirm"
                />
                <v-btn
                  dark
                  color="#fa7c15"
                  class="mb-2 mt-3 mr-1"
                  @click.native="stepBYstep = 2"
                >Previous</v-btn>
                <v-btn
                  dark
                  color="blue darken-3"
                  class="mb-2 mt-3 mr-1"
                  @click.native="stepBYstep = 4"
                >Next</v-btn>
              </v-stepper-content>
              <v-stepper-step :complete="stepBYstep > 4" step="4">
                Description
                <small>Describe your project or upload your file</small>
              </v-stepper-step>
              <v-stepper-content step="4">
                <v-textarea
                  outlined
                  type="text"
                  v-model="project.file"
                  no-resize
                  @input="$v.project.file.$touch()"
                  @blur="$v.project.file.$touch()"
                  :error-messages="fileConfirm"
                />
                <span>OR</span>
                <v-btn small depressed dark class="mx-2" color="blue-grey lighten-1">
                  <span class="mdi"></span>
                  <span>upload</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  color="#fa7c15"
                  class="mb-2 mt-3 mr-1"
                  @click.native="stepBYstep = 3"
                >Previous</v-btn>
                <v-btn
                  dark
                  color="blue darken-3"
                  class="mb-2 mt-3 mr-1"
                  @click.native="stepBYstep = 5"
                >Next</v-btn>
              </v-stepper-content>
              <v-stepper-step step="5">
                Budget
                <small>How much your budget nearly?</small>
              </v-stepper-step>
              <v-stepper-content step="5">
                <v-text-field
                  type="text"
                  suffix="Tomans"
                  v-model="project.budget"
                  @input="$v.project.budget.$touch()"
                  @blur="$v.project.budget.$touch()"
                  :error-messages="budgetConfirm"
                />
                <v-btn
                  dark
                  color="#fa7c15"
                  class="mb-2 mt-3 mr-1"
                  @click.native="stepBYstep = 4"
                >Previous</v-btn>
              </v-stepper-content>
            </v-stepper>

            <v-layout justify-center>
              <v-btn class="my-5 mr-1" dark route to="/dashboard">
                <span class="subtitle ma-1">cancel</span>
              </v-btn>
              <v-btn
                class="my-5 ml-1"
                :dark="check()"
                :disabled="!check()"
                v-on:click="create()"
                :loading="load"
              >
                <span color="blue darken-3" class="subtitle ma-1">create project</span>
              </v-btn>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex md5 class="hidden-sm-and-down pa-2">
          <v-img src="https://image.freepik.com/free-vector/business-deal_52683-6265.jpg" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data: function() {
    return {
      project: {
        name: "",
        categories: [],
        budget: "",
        skills: [],
        file: ""
      },
      errored: false,
      load: false,
      stepBYstep: 1
    };
  },
  validations: {
    project: {
      name: {
        required,
        minLength: minLength(3)
      },
      categories: {
        required
      },
      budget: {
        required
      },
      skills: {
        required
      },
      file: {
        required
      }
    }
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
    priceRanges() {
      return this.$store.state.priceRanges;
    },
    categories() {
      return this.$store.state.categories;
    },
    skills() {
      return this.$store.state.skills;
    },
    nameConfirm() {
      let errors = [];
      if (!this.$v.project.name.$dirty) {
        return (errors = []);
      }
      if (!this.$v.project.name.required) {
        errors.push("This field is required");
      }
      if (!this.$v.project.name.minLength) {
        errors.push("Enter at least 3 character");
      }
      return errors;
    },
    categoriesConfirm() {
      let errors = [];
      if (!this.$v.project.categories.$dirty) {
        return (errors = []);
      }
      if (!this.$v.project.categories.required) {
        errors.push("This field is required");
      }
      return errors;
    },
    budgetConfirm() {
      let errors = [];
      if (!this.$v.project.budget.$dirty) {
        return (errors = []);
      }
      if (!this.$v.project.budget.required) {
        errors.push("This field is required");
      }
      return errors;
    },
    skillsConfirm() {
      let errors = [];
      if (!this.$v.project.skills.$dirty) {
        return (errors = []);
      }
      if (!this.$v.project.skills.required) {
        errors.push("This field is required");
      }
      return errors;
    },
    deadlineConfirm() {
      let errors = [];
      if (!this.$v.project.deadline.$dirty) {
        return (errors = []);
      }
      if (!this.$v.project.deadline.required) {
        errors.push("This field is required");
      }
      return errors;
    },
    fileConfirm() {
      let errors = [];
      if (!this.$v.project.file.$dirty) {
        return (errors = []);
      }
      if (!this.$v.project.file.required) {
        errors.push("This field is required");
      }
      return errors;
    }
  },
  methods: {
    toJSON(array) {
      let arr = [];
      for (let i = 0; i < array.length; i++) {
        let item = { name: array[i] };
        arr.push(item);
      }
      return arr;
    },
    check() {
      if (
        this.project.categories.length &&
        this.project.name.length &&
        this.project.skills.length &&
        this.project.budget.length
      ) {
        return true;
      } else {
        return false;
      }
    },
    create() {
      this.load = true;
      let sendCategories = this.toJSON(this.project.categories);
      let sendSkills = this.toJSON(this.project.skills);
      let data = {
        projectname: this.project.name,
        budget: this.project.budget,
        description: this.project.file,
        categories: sendCategories,
        skills: sendSkills
      };
      axios
        .post("http://192.168.1.247:3500/api/project/create", data)
        .then(() => {
          // console.log(response);
        })
        .catch(() => {
          // console.log(error)
          this.errored = true;
        })
        .finally(() => {
          this.load = false;
        });
    }
  },
  created() {
    axios
      .get("http://192.168.1.247:3500/api/project/getCategories")
      .then(response => {
        this.$store.state.categories = response.data;
      })
      .catch(() => {
        // console.log(error)
        this.errored = true;
      })
      .finally(() => {
        this.load = false;
      });
    axios
      .get("http://192.168.1.247:3500/api/project/getSkills")
      .then(response => {
        // console.log(response)
        this.$store.state.skills = response.data;
      })
      .catch(() => {
        // console.log(error)
        this.errored = true;
      })
      .finally(() => {
        this.load = false;
      });
  }
};
</script>

<style scoped>
#holePage {
  background-color: white;
}
.stick {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 5rem !important;
}
</style>