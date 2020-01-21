<template>
  <div id="holePage">
    <v-container>
      <v-layout row align-center justify-center class="my-2">
        <v-flex xs9 sm4 class="pr-1 my-1">
          <v-card
            class="border"
            style="border-style: solid; border-width: 2px; border-color: blue;"
            height="400px"
            elevation-10
          >
            <v-img src="http://styleguide.europeana.eu/images/fpo_avatar.png" style="height:396px" />
          </v-card>
        </v-flex>
        <v-flex xs9 sm5 class="pl-1 my-1">
          <v-card class="border" height="400px">
            <h1 class="display-2 pa-4 font-weight-medium" style="color: #fa7c15;">I AM</h1>
            <h3 class="display-1 pl-8">{{ seeProf.username }}</h3>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <a href style="text-decoration: none; color: black;">
                    <span class="mdi mdi-email"></span>
                    <span class="pl-2">{{ seeProf.email }}</span>
                  </a>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <span class="mdi mdi-briefcase"></span>
                  <span v-if="!isEmpty(seeProf.job)" class="pl-2">{{ seeProf.job }}</span>
                  <span v-else class="pl-2 subtitle-2 font-weight-light">There is no information</span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <span class="mdi mdi-school"></span>
                  <span v-if="!isEmpty(seeProf.education)" class="pl-2">{{ seeProf.education }}</span>
                  <span v-else class="pl-2 subtitle-2 font-weight-light">There is no information</span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <span class="mdi mdi-map-marker"></span>
                  <span v-if="!isEmpty(seeProf.address)" class="pl-2">{{ seeProf.address }}</span>
                  <span v-else class="pl-2 subtitle-2 font-weight-light">There is no information</span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <span class="mdi mdi-clipboard-text"></span>
                  <span v-if="!isEmpty(seeProf.skills)" class="pl-2">
                    <span v-for="skill in seeProf.skills" :key="skill" class="mx-1">{{ skill }},</span>
                  </span>
                  <span v-else class="pl-2 subtitle-2 font-weight-light">There is no information</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row align-center justify-center class="my-2">
        <v-flex xs9>
          <v-card class="border">
            <v-card-title class="title">Resume</v-card-title>
            <v-card-text>
              <span class="mdi mdi-"></span>
              <span v-if="!isEmpty(seeProf.resume)">{{ seeProf.resume }}</span>
              <span v-else>There is no information</span>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      seeProf: {
        username: "fateme",
        email: "fateme@gmail.com",
        isFreelancer: true,
        job: "Web Developer",
        education: "Computer Engineering",
        birthday: "98/4/20",
        gender: "Female",
        skills: [],
        address: "5th Kilometer of Persian Gulf Highway, Rasht, Giulan",
        resume:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    };
  },
  methods: {
    isEmpty(arg) {
      if (arg == null || arg.length < 1) return true;
      else return false;
    },
    toSTRING(array) {
      let arr = [];
      for (let i = 0; i < array.length; i++) {
        let item = array[i].name;
        arr.push(item);
      }
      return arr;
    }
  },
  created() {
    let data = {
      id: this.$route.params.id
    };
    axios
      .post("http://192.168.1.247:3500/api/user/getWithId", data)
      .then(response => {
        // console.log(response);
        this.seeProf.username = response.data.username;
        this.seeProf.email = response.data.email;
        this.seeProf.isFreelancer = !response.data.isclient;
        this.seeProf.job = response.data.jobtitle;
        this.seeProf.field = response.data.prof.education;
        let date = response.data.prof.birthday;
        if (date != null) {
          date = date.slice(0, 10);
        } else {
          date = "";
        }
        this.seeProf.birthday = date;
        this.seeProf.gender = response.data.prof.gender;
        this.seeProf.skills = response.data.userskills;
        this.seeProf.skills = this.toSTRING(this.seeProf.skills);
        this.seeProf.address = response.data.prof.address;
        this.seeProf.resume = response.data.prof.rewards;
      })
      .catch(() => {
        // console.log(error)
        this.errored = true;
      })
      .finally(() => {});
  }
};
</script>

<style scoped>
#holePage {
  background-image: linear-gradient(#97c1e7, #1576bb);
}
.border {
  box-shadow: 5px 5px 5px rgb(34, 34, 255);
}
</style>