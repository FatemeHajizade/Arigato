<template>
  <div style="background-image: linear-gradient(rgba(205,233,254), #f0f1f5); min-height: 560px;">
    <v-layout row align-center justify-center>
      <v-card max-width="800px" flat tile>
        <div style="background-color: #f0f1f5;">
          <v-container>
            <v-layout row align-center justify-center>
              <v-flex xs12 sm6>
                <v-card-text>
                  <h1 class="display-3 font-weight-medium">Hi,</h1>
                  <h3 class="font-weight-light">please enter your information.</h3>
                  <br />
                  <v-form ref="form">
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
                  <v-checkbox v-model="rememberMe" label="Remember me" />
                  <v-layout column justify-center>
                    <v-btn
                      id="loginButton"
                      class="ma-1"
                      color="indigo accent-4"
                      min-width="200px"
                      v-on:click="login()"
                      :loading="load"
                      :dark="check()"
                      :disabled="!check()"
                    >
                      <span class="subtitle">Login</span>
                    </v-btn>
                  </v-layout>
                  <p class="text-center caption">
                    <a href="/" style="text-decoration:none">Forget your password?</a>
                  </p>
                  <v-layout justify-center>
                    <p v-if="flag" class="subtitle-2 ma-1 red--text">Username or Password is wrong</p>
                  </v-layout>
                </v-card-text>
              </v-flex>
              <v-flex class="hidden-xs-only" sm6>
                <h3 class="font-weight-light pa-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </h3>
                <v-img
                  class="loginImage"
                  src="https://image.freepik.com/free-vector/programmer-decorative-illustration-flat-design_23-2148251352.jpg"
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
      rememberMe: false,
      message: "",
      flag: false
    };
  },
  validations: {
    profile: {
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
        !this.$v.profile.password.$invalid &&
        !this.$v.profile.email.$invalid
      ) {
        return true;
      } else {
        return false;
      }
    },
    login() {
      this.$v.profile.email.$touch();
      this.$v.profile.password.$touch();
      if (
        !this.$v.profile.password.$invalid &&
        !this.$v.profile.email.$invalid
      ) {
        this.load = true;

        let data = {
          email: this.profile.email,
          password: this.profile.password
        };

        axios
          .post("http://192.168.1.247:3500/api/user/login", data)
          .then(response => {
            this.message = response.data;
            if (this.message == "ab") {
              this.flag = true;
            } else {
              this.flag = false;
            }
            // console.log(response.token);
            this.$store.state.profile.online = true;
            this.$store.state.profile.username = response.data.username;
            this.$store.state.profile.email = response.data.email;
            this.$store.state.profile.password = "";
            this.$store.state.profile.isFreelancer = !response.data.isclient;
            this.$store.state.profile.firstname = response.data.firstname;
            this.$store.state.profile.lastname = response.data.lastname;
            this.$store.state.profile.job = response.data.jobtitle;
            this.$store.state.profile.field = response.data.prof.education;
            this.$store.state.profile.birthday = response.data.prof.birthday;
            this.$store.state.profile.gender = response.data.prof.gender;
            this.$store.state.profile.skills = response.data.userskills;
            this.$store.state.profile.address = response.data.prof.address;
            this.$store.state.profile.resume = response.data.prof.rewards;
            this.$store.state.profile.image = response.data.image;
            axios.defaults.headers.Authorization = `Token ${response.data.token}`;
            window.localStorage.setItem("Authorization", response.data.token);
            window.location.href = "/profile/edit";
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
    this.$store.state.profile.password = "";
  }
};
</script>

<style></style>
