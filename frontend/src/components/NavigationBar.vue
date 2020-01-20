<template>
  <div>
    <nav>
      <v-app-bar app>
        <v-toolbar-title>
          <h3 id="title">
            <a href="/" style="text-decoration:none; color:#fa7c15">Arigato</a>
          </h3>
        </v-toolbar-title>

        <v-divider class="mx-4" vertical inset></v-divider>

        <h3 class="subheading" route to="/projects">
          <a href="/projects" style="text-decoration:none; color:black">Projects</a>
        </h3>

        <v-divider class="mx-4" vertical inset></v-divider>

        <h3 class="subheading">
          <a href="/freelancers" style="text-decoration:none; color:black">Freelancers</a>
        </h3>

        <v-divider class="mx-4" vertical inset></v-divider>
        <v-spacer></v-spacer>

        <v-btn v-if="!check()" route to="/login" outlined color="blue darken-3" class="ma-1">
          <h3>Login</h3>
        </v-btn>
        <v-btn v-if="!check()" route to="/signin" dark class="ma-1" color="#fa7c15">
          <h3>Register</h3>
        </v-btn>
        <v-btn v-if="check()" dark class="ma-1" color="#fa7c15" v-on:click="signout()">
          <h3>Sign out</h3>
        </v-btn>
      </v-app-bar>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      registered: false,
      loggedin: false
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    check() {
      if (window.localStorage.getItem("Authorization")) {
        return true;
      } else {
        return false;
      }
    },
    signout() {
      window.localStorage.removeItem("Authorization");
      window.location.href = "/";
    }
  },
  created() {
    axios
      .get("http://192.168.1.247:3500/api/project/getCategories")
      .then(response => {
        this.$store.state.categories = response.data;
      })
      .catch(() => {
        // console.log(error);
        this.errored = true;
      })
      .finally(() => {
        this.load = false;
      });

    axios
      .get("http://192.168.1.247:3500/api/user/getUser")
      .then(response => {
        this.$store.state.profile = response.data;
      })
      .catch(() => {
        // console.log(error);
        this.errored = true;
      })
      .finally(() => {
        this.load = false;
      });
  }
};
</script>

<style scoped>
#title {
  /* font-family: "Lobster", cursive; */
  font-family: "Audiowide", cursive;
}
</style>
