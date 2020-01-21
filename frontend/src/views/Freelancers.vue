<template>
  <div id="holePage">
    <v-container>
      <v-layout column justify-center align-center v-if="isEmpty()">
        <h3>There is no freelancer yet!</h3>
        <v-img
          src="https://image.freepik.com/free-vector/search-concept-landing-page_52683-18754.jpg"
          contain
          max-height="450px"
          min-height="450px"
        ></v-img>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm6 md4 lg3 v-for="freelancer in freelancers" :key="freelancer.username">
          <v-card class="text-center ma-3 box">
            <v-responsive class="pt-2" style="background-color: #fa7c15">
              <v-avatar size="140">
                <img
                  src="http://styleguide.europeana.eu/images/fpo_avatar.png"
                  style="border-color: #5f5f5f; border-style:solid; border-width: 2px;"
                />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subtitle-1 font-weight-medium">{{ freelancer.username }}</div>
              <div class="grey--text">{{ freelancer.jobtitle }}</div>
              <div class="grey--text">{{ freelancer.education }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="#fa7c15" route :to="'/profile/'+freelancer.id">
                <span class="mdi mdi-eye"></span>
                <span>see profile</span>
              </v-btn>
            </v-card-actions>
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
    return {};
  },
  computed: {
    freelancers() {
      return this.$store.state.freelancers;
    }
  },
  created() {
    axios
      .get("http://192.168.1.247:3500/api/user/seeAllLancers")
      .then(response => {
        // console.log(response)
        this.$store.state.freelancers = response.data;
      })
      .catch(() => {
        // console.log(error)
        this.errored = true;
      })
      .finally(() => {});
  },
  methods: {
    isEmpty() {
      if (this.freelancers.length == 0) return true;
      else return false;
    }
  }
};
</script>

<style scoped>
#holePage {
  background-image: linear-gradient(#97c1e7, #1576bb);
}
.box:hover {
  border-color: #1576bb;
  border-width: 2px;
  border-style: solid;
  box-shadow: 5px 5px 10px #1576bb;
}
</style>