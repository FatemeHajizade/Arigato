<template>
  <div style="background-image: linear-gradient(rgba(205,233,254), #f9f9f9); min-height: 560px;">
    <v-layout row align-center justify-center>
      <v-card max-width="800px" flat tile>
        <div style="background-color: #f9f9f9">
          <v-container>
            <v-layout row align-center justify-center>
              <v-flex xs12 sm6>
                <v-card-text>
                  <h3 class="font-weight-light">welcome to</h3>
                  <h1 id="title">Arigato</h1>
                  <br />
                  <v-form ref="form">
                    <v-text-field
                      id="fateme"
                      color="blue darken-1"
                      type="text"
                      @input="$v.profile.username.$touch()"
                      @blur="$v.profile.username.$touch()"
                      label="Username"
                      v-model="profile.username"
                      :error-messages="usernameConfirm"
                    />

                    <v-text-field
                      color="blue darken-1"
                      type="email"
                      @input="$v.profile.email.$touch()"
                      @blur="$v.profile.email.$touch()"
                      label="Email"
                      v-model="profile.email"
                      :error-messages="emailConfirm"
                    />

                    <v-text-field
                      color="blue darken-1"
                      type="password"
                      @input="$v.profile.password.$touch()"
                      @blur="$v.profile.password.$touch()"
                      label="Password"
                      v-model="profile.password"
                      :error-messages="passwordConfirm"
                    />
                  </v-form>

                  <v-layout align-center justify-center>
                    <h3 class="mx-1 mb-1 font-weight-light">Client</h3>
                    <v-switch color="blue darken-1" v-model="profile.isFreelancer"></v-switch>
                    <h3 class="mb-1 font-weight-light">Freelancer</h3>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-layout column justify-center>
                    <v-btn
                      id="registerButton"
                      class="ma-1"
                      color="blue darken-2"
                      min-width="200px"
                      v-on:click="register()"
                      :dark="check()"
                      :disabled="!check()"
                      :loading="load"
                      route
                    >
                      <span class="subtitle">Register</span>
                    </v-btn>
                    <p class="text-center caption">
                      Already have an account?
                      <a href="/login" style="text-decoration: none">Log In</a>
                    </p>
                  </v-layout>
                </v-card-actions>
              </v-flex>
              <v-flex class="hidden-xs-only pa-2" sm6>
                <h3>About Us:</h3>
                <h3 class="font-weight-light px-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </h3>
                <v-img
                  class="registerImage"
                  src="https://image.freepik.com/free-vector/teamwork-concept-landing-page_23-2148211326.jpg"
                ></v-img>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data: function() {
    return {
      load: false,
      errored: false,
      response: ""
    };
  },
  validations: {
    profile: {
      username: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    usernameConfirm() {
      let errors = [];
      if (!this.$v.profile.username.$dirty) {
        return (errors = []);
      }
      if (!this.$v.profile.username.required) {
        errors.push("This field is required");
      }
      if (!this.$v.profile.username.minLength) {
        errors.push("Enter at least 3 character");
      }
      return errors;
    },
    emailConfirm() {
      let errors = [];
      if (!this.$v.profile.email.$dirty) {
        return (errors = []);
      }
      if (!this.$v.profile.email.required) {
        errors.push("This field is required");
      }
      if (!this.$v.profile.email.email) {
        errors.push("Enter a valid email");
      }
      return errors;
    },
    passwordConfirm() {
      let errors = [];
      if (!this.$v.profile.password.$dirty) {
        return (errors = []);
      }
      if (!this.$v.profile.password.required) {
        errors.push("This field is required");
      }
      if (!this.$v.profile.password.minLength) {
        errors.push("Enter at least 8 character");
      }
      return errors;
    }
  },
  methods: {
    check() {
      if (
        this.profile.password.length &&
        this.profile.email.length &&
        this.profile.username.length &&
        !this.$v.profile.password.$invalid &&
        !this.$v.profile.email.$invalid &&
        !this.$v.profile.username.$invalid
      ) {
        return true;
      } else {
        return false;
      }
    },
    register() {
      this.$v.profile.email.$touch();
      this.$v.profile.password.$touch();
      this.$v.profile.username.$touch();
      if (
        !this.$v.profile.password.$invalid &&
        !this.$v.profile.email.$invalid &&
        !this.$v.profile.username.$invalid
      ) {
        this.load = true;
        let data = {
          username: this.profile.username,
          email: this.profile.email,
          password: this.profile.password,
          isclient: !this.profile.isFreelancer
        };
        axios
          .post("http://192.168.1.247:3500/api/user/", data)
          .then(response => {
            this.response = response;
            window.location.href = "/";
          })
          .catch(() => {
            // console.log(error);
            this.errored = true;
          })
          .finally(() => {
            this.load = false;
          });
      }
    }
  },
  created() {
    this.$store.state.profile.username = "";
    this.$store.state.profile.email = "";
    this.$store.state.profile.password = "";
  }
};
</script>

<style>
#title {
  /* font-family: "Lobster", cursive; */
  font-family: "Audiowide", cursive;
}
.registerImage {
  height: 380px;
}
</style>
