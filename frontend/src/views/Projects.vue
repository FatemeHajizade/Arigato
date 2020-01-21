<template>
  <div id="holePage">
    <v-container>
      <v-layout column justify-center align-center v-if="isEmpty()">
        <h3 class="font-weight-light">There is no project yet!</h3>
        <v-img
          src="https://image.freepik.com/free-vector/search-concept-landing-page_52683-13621.jpg"
          contain
          max-height="450px"
          min-height="450px"
        ></v-img>
      </v-layout>

      <v-container fluid class="my-5">
        <v-layout row class="mb-2">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text color="grey darken-1" v-on="on" v-on:click="orderedBy('projectname')">
                <span class="mdi mdi-format-title mdi-24px"></span>
                <span class="text-lowercase caption">by project name</span>
              </v-btn>
            </template>
            <span>Sort projects by project name</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text color="grey darken-1" v-on="on" v-on:click="orderedBy('category')">
                <span class="mdi mdi-format-list-bulleted-type mdi-24px"></span>
                <span class="text-lowercase caption">by category</span>
              </v-btn>
            </template>
            <span>Sort projects by project name</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text color="grey darken-1" v-on="on" v-on:click="orderedBy('budget')">
                <span class="mdi mdi-coin mdi-24px"></span>
                <span class="text-lowercase caption">by budget</span>
              </v-btn>
            </template>
            <span>Sort projects by budget</span>
          </v-tooltip>
        </v-layout>
        <v-card
          class="pa-3 my-2 box"
          v-for="project in projects"
          :key="project.projectname"
          v-on:click="open(project.id)"
        >
          <v-layout row wrap :class="`pa-3 ${project.status}`">
            <v-flex xs12 md6>
              <div class="caption blue--text">Project title</div>
              <div>{{ project.projectname }}</div>
            </v-flex>
            <v-flex xs4 md2>
              <div class="caption blue--text">Category</div>
              <div>{{ project.Categories[0].name }}</div>
            </v-flex>
            <v-flex xs4 md2>
              <div class="caption blue--text">Number of suggestins</div>
              <div>{{ size(project.Offers) }}</div>
            </v-flex>
            <v-flex xs4 md2>
              <div class="caption blue--text">Budget</div>
              <div>{{ project.budget }}</div>
            </v-flex>
            <v-flex xs12>
              <v-chip
                small
                dark
                color="#fa7c15"
                v-for="skill in project.Skills"
                :key="skill.id"
                max-width="100px"
                class="ma-1"
              >{{ skill.name }}</v-chip>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>

      <v-dialog v-model="openProject" max-width="800px">
        <v-card color="grey lighten-4" height="500px" elevation="10">
          <v-layout align-start class="pa-3">
            <h2 class="display-1 font-weight-regular">{{ seeProj.name }}</h2>
            <v-spacer></v-spacer>
            <v-btn
              depressed
              dark
              color="blue"
              route
              :to="'/projects/'+seeProj.id+'/sendsuggestion'"
            >send suggestion</v-btn>
          </v-layout>
          <v-layout align-start class="px-3">
            <h3 class="font font-weight-regular ma-1">Budget: {{ seeProj.budget }}</h3>
          </v-layout>
          <v-layout align-start class="px-3">
            <h3 class="font-weight-regular ma-1">Skills needed:</h3>
            <v-chip
              dark
              color="#fa7c15"
              small
              class="ma-1"
              v-for="skill in seeProj.skills"
              :key="skill.id"
            >{{ skill.name }}</v-chip>
          </v-layout>
          <v-layout align-start class="px-3">
            <h3 class="font-weight-regular ma-1">Description:</h3>
          </v-layout>
          <v-layout align-start class="px-6">
            <p class="gray--text">{{ seeProj.file }}</p>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      openProject: false,
      seeProj: {
        id: "",
        name: "",
        budget: "",
        file: "",
        categories: "",
        skills: [],
        offers: []
      }
    };
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    }
  },
  created() {
    axios
      .get("http://192.168.1.247:3500/api/project/seeAllProject")
      .then(response => {
        // console.log(response)
        this.$store.state.projects = response.data;
      })
      .catch(() => {
        // console.log(error)
        this.errored = true;
      })
      .finally(() => {});
  },
  methods: {
    isEmpty() {
      if (this.projects.length == 0) return true;
      else return false;
    },
    orderedBy(arg) {
      this.projects.sort((a, b) => (a[arg] < b[arg] ? -1 : 1));
      // db.collection("projects").orderBy(arg);
    },
    size(arg) {
      if (arg == null) return 0;
      return arg.length;
    },
    open(projectID) {
      this.openProject = true;

      let data = {
        id: projectID
      };

      axios
        .post("http://192.168.1.247:3500/api/project/getProjectWithId", data)
        .then(response => {
          // console.log(response);
          this.seeProj.id = response.data.id;
          this.seeProj.name = response.data.projectname;
          this.seeProj.budget = response.data.budget;
          this.seeProj.file = response.data.description;
          this.seeProj.categories = response.data.categories;
          this.seeProj.skills = response.data.Skills;
        })
        .catch(() => {
          // console.log(error);
          this.errored = true;
        })
        .finally(() => {});
    }
  }
};
</script>

<style scoped>
#holePage {
  background-color: white;
}
.box:hover {
  border-left-style: solid;
  border-left-width: 8px;
  border-color: rgb(55, 144, 160);
}
</style>