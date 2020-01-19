<template>
  <div id="holePage">
    <div class="stick">
      <v-navigation-drawer
        absolute
        clipped
        permanent
        height="560px"
        left
        v-model="drawer"
        class="hidden-xs-only"
        style="background-image: linear-gradient(#fde67e, #fa7c15);"
      >
        <v-list>
          <v-list-item v-for="link in links" :key="link.title">
            <v-list-item-icon>
              <span :class="link.icon"></span>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">
                <v-btn
                  small
                  text
                  v-on:click="$vuetify.goTo(`${ link.hashtag }`, options)"
                >{{ link.title }}</v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <v-layout row align-start justify-end class="ml-3">
      <v-flex xs12 sm8 md9 lg6 class="pr-5">
        <v-card class="mx-5 my-5" id="baseInfo" elevation="1">
          <v-app-bar dense flat dark color="#127ebe">
            <v-card-title>
              <span class="mdi mdi-settings mdi-24px"></span>
              <h3 class="subtitle-1">Main Information</h3>
            </v-card-title>
          </v-app-bar>
          <v-card-text>
            <v-text-field
              outlined
              label="username"
              prepend-icon="mdi mdi-account"
              type="text"
              :placeholder="profile.username"
              @input="$v.profile.username.$touch()"
              @blur="$v.profile.username.$touch()"
              v-model="profile.username"
              :error-messages="usernameConfirm"
            />

            <v-text-field
              outlined
              label="Email"
              prepend-icon="mdi mdi-email"
              type="email"
              :placeholder="profile.email"
              @input="$v.profile.email.$touch()"
              @blur="$v.profile.email.$touch()"
              v-model="profile.email"
              :error-messages="emailConfirm"
            />

            <v-layout justify-space-around>
              <v-flex xs6 pr-1>
                <v-text-field
                  outlined
                  label="Firstname"
                  prepend-icon="mdi mdi-format-color-text"
                  type="text"
                  :placeholder="profile.firstname"
                  v-model="profile.firstname"
                />
              </v-flex>
              <v-flex xs6 pl-1>
                <v-text-field
                  outlined
                  label="Lastname"
                  prepend-icon="mdi mdi-format-bold"
                  type="text"
                  :placeholder="profile.lastname"
                  v-model="profile.lastname"
                />
              </v-flex>
            </v-layout>

            <v-text-field
              outlined
              label="Job title"
              prepend-icon="mdi mdi-briefcase"
              type="text"
              :placeholder="profile.job"
              v-model="profile.job"
              @input="$v.profile.job.$touch()"
              @blur="$v.profile.job.$touch()"
              :error-messages="jobConfirm"
            />
            <v-select
              outlined
              label="What skills do you have?"
              prepend-icon="mdi mdi-clipboard-text"
              height="40px"
              v-model="profile.skills"
              :items="skills"
              item-text="name"
              item-value="name"
              append-icon
              :menu-props="{ offsetY: true }"
              multiple
              chips
              @input="$v.profile.skills.$touch()"
              @blur="$v.profile.skills.$touch()"
              :error-messages="skillsConfirm"
            />
            <v-layout align-center justify-center id="switch">
              <h3 class="mx-1 mb-1">Client</h3>
              <v-switch color="blue" v-model="profile.isFreelancer" :value="profile.isFreelancer"></v-switch>
              <h3 class="mb-1">Freelancer</h3>
            </v-layout>
          </v-card-text>
          <v-card-actions justify-start>
            <v-btn
              class="mb-3 mr-3"
              color="blue"
              v-on:click="saveBaseInfo()"
              :disabled="load1"
              :dark="!load1"
            >
              <span class="subtitle">Save</span>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mx-5 my-5" id="password" elevation="1">
          <v-app-bar dense flat dark color="#127ebe">
            <v-card-title>
              <span class="mdi mdi-key mdi-24px"></span>
              <h3 class="subtitle-1">Password</h3>
            </v-card-title>
          </v-app-bar>
          <v-card-text>
            <v-text-field
              label="Current password"
              outlined
              type="password"
              @input="$v.profile.password.$touch()"
              @blur="$v.profile.password.$touch()"
              v-model="profile.password"
              :error-messages="passwordConfirm"
            />
            <v-text-field
              label="New password"
              outlined
              type="password"
              @input="$v.newPassword.$touch()"
              @blur="$v.newPassword.$touch()"
              v-model="newPassword"
              :error-messages="newPasswordConfirm"
            />
            <v-text-field
              label="Repeat new password"
              outlined
              type="password"
              @input="$v.repeatPassword.$touch()"
              @blur="$v.repeatPassword.$touch()"
              v-model="repeatPassword"
              :error-messages="repeatPasswordConfirm"
            />
          </v-card-text>
          <v-card-actions justify-start>
            <v-btn
              class="mb-3 mr-3"
              color="cyan darken-3"
              v-on:click="savePassword()"
              :disabled="!turnon()"
              :dark="turnon()"
              :loading="load2"
            >
              <span class="subtitle">save</span>
            </v-btn>
            <p class="caption pr-3">{{ changePasswordMessage }}</p>
          </v-card-actions>
        </v-card>
        <v-card class="mx-5 my-5" id="personalInfo" elevation="1" ref="form">
          <v-app-bar dense flat dark color="#127ebe">
            <v-card-title>
              <span class="mdi mdi-account-circle mdi-24px"></span>
              <h3 class="subtitle-1">Personal Information</h3>
            </v-card-title>
          </v-app-bar>
          <v-card-text>
            <v-layout class="mb-5">
              <v-avatar size="100" color="white" class="ml-3">
                <img :src="profile.image" style="border-style: solid; border-width: 3px;" />
              </v-avatar>
              <v-btn dark depressed class="mt-12 ml-5" color="blue">Upload image</v-btn>
              <!-- <filePicker /> -->
            </v-layout>

            <v-text-field
              label="Education"
              prepend-icon="mdi mdi-school"
              outlined
              type="text"
              :placeholder="profile.field"
              v-model="profile.field"
            />

            <v-layout>
              <v-flex xs6 class="pr-1">
                <v-select
                  label="Gender"
                  prepend-icon="mdi mdi-gender-male-female"
                  outlined
                  height="35px"
                  :placeholder="profile.gender"
                  v-model="profile.gender"
                  :items="gender"
                  append-icon
                  :menu-props="{ offsetY: true }"
                />
              </v-flex>
              <v-flex xs6 class="pl-1">
                <v-menu
                  v-model="dateMenu"
                  ref="dateMenu"
                  transition="scale-transition"
                  :close-on-content-click="false"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <!-- @blur="date = parseDate(dateFormatted)" -->
                    <v-text-field
                      label="Birthday"
                      prepend-icon="mdi mdi-calendar-today"
                      outlined
                      :placeholder="profile.birthday"
                      v-model="profile.birthday"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker v-model="profile.birthday" no-title>
                    <div>
                      <v-btn text dark color="blue" v-on:click="dateMenu = false">Cancel</v-btn>
                      <v-btn
                        text
                        dark
                        color="blue"
                        v-on:click="$refs.dateMenu.save(profile.birthday)"
                      >OK</v-btn>
                    </div>
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>

            <v-textarea
              label="Address"
              prepend-icon="mdi mdi-map-marker"
              outlined
              type="text"
              :placeholder="profile.address"
              v-model="profile.address"
              no-resize
            />
          </v-card-text>
        </v-card>
        <v-card class="mx-5 my-5" id="resume" elevation="1" ref="form">
          <v-app-bar dense flat dark color="#127ebe">
            <v-card-title>
              <span class="mdi mdi-file-multiple mdi-24px"></span>
              <h3 class="subtitle-1">Resume</h3>
            </v-card-title>
          </v-app-bar>
          <v-card-text>
            <v-textarea
              label="Write your resume here:"
              outlined
              type="text"
              :placeholder="profile.resume"
              v-model="profile.resume"
              no-resize
            />
            <v-layout>
              OR upload your resume from here:
              <!-- <v-spacer></v-spacer> -->
              <v-btn small dark color="blue" class="ml-2">
                <span class="mdi mdi-cloud-upload"></span>
                <span>upload</span>
              </v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-layout justify-center>
          <v-btn
            class="my-5 mr-1"
            dark
            style="background-color: #303030;"
            min-width="100px"
            route
            to="/dashboard"
          >
            <span class="subtitle">exit</span>
          </v-btn>
          <v-btn
            class="my-5 ml-1"
            dark
            style="background-color: #303030;"
            min-width="100px"
            v-on:click="saveAll ()"
            :loading="load3"
          >
            <span class="subtitle">OK</span>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex
        lg3
        class="stick hidden-md-and-down pt-7"
        style="min-width: 400px; max-width: 400px; min-height: 520px;"
      >
        <v-img
          style="min-height: 520px;"
          src="https://image.freepik.com/free-vector/people-fill-out-online-form_41910-335.jpg"
        ></v-img>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
// import filePicker from "../main.js";

export default {
  mixins: [validationMixin],
  components: {
    // filePicker
  },
  data: function() {
    return {
      load1: false,
      load2: false,
      load3: false,
      drawer: true,
      dateMenu: false,
      newPassword: "",
      repeatPassword: "",
      changePasswordMessage: "",
      links: [
        {
          icon: "mdi mdi-settings mdi-24px",
          title: "Main Information",
          hashtag: "#baseInfo"
        },
        {
          icon: "mdi mdi-key mdi-24px",
          title: "Password",
          hashtag: "#password"
        },
        {
          icon: "mdi mdi-account mdi-24px",
          title: "Personal Information",
          hashtag: "#personalInfo"
        },
        {
          icon: "mdi mdi-file-multiple mdi-24px",
          title: "Resume",
          hashtag: "#resume"
        }
      ]
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    skills() {
      return this.$store.state.skills;
    },
    gender() {
      return this.$store.state.gender;
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
      if (!this.$v.profile.password.minLength) {
        errors.push("Enter at least 8 character");
      }
      return errors;
    },
    newPasswordConfirm() {
      let errors = [];
      if (!this.$v.newPassword.$dirty) {
        return (errors = []);
      }
      if (!this.$v.newPassword.minLength) {
        errors.push("Enter at least 8 character");
      }
      return errors;
    },
    repeatPasswordConfirm() {
      let errors = [];
      if (!this.$v.repeatPassword.$dirty) {
        return (errors = []);
      }
      if (!this.$v.repeatPassword.sameAsPassword) {
        errors.push("Password is incorrect");
      }
      return errors;
    },
    skillsConfirm() {
      let errors = [];
      if (!this.$v.profile.skills.$dirty) {
        return (errors = []);
      }
      if (!this.$v.profile.skills.required) {
        errors.push("This field is required");
      }
      return errors;
    },
    jobConfirm() {
      let errors = [];
      if (!this.$v.profile.job.$dirty) {
        return (errors = []);
      }
      if (!this.$v.profile.job.required) {
        errors.push("This field is required");
      }
      return errors;
    },
    options() {
      return {
        duration: "500",
        offset: "0",
        easing: "easeInOutCubic"
      };
    }
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
        minLength: minLength(8)
      },
      skills: {
        required
      },
      job: {
        required
      }
    },
    newPassword: {
      minLength: minLength(8)
    },
    repeatPassword: {
      sameAsPassword: sameAs("newPassword")
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
    saveAll() {
      this.load3 = true;

      let data = {
        education: this.profile.field,
        birthday: this.profile.birthday,
        gender: this.profile.gender,
        address: this.profile.address,
        rewards: this.profile.resume,
        image: this.profile.image
      };

      axios
        .put("http://192.168.1.247:3500/api/user/editeProfile", data)
        .then(response => {
          this.$store.state.profile.field = response.data.prof.education;
          this.$store.state.profile.birthday = response.data.prof.birthday;
          this.$store.state.profile.gender = response.data.prof.gender;
          this.$store.state.profile.address = response.data.prof.address;
          this.$store.state.profile.resume = response.data.prof.rewards;
          this.$store.state.profile.image = response.data.image;
        })
        .catch(() => {
          // console.log(error)
          this.errored = true;
        })
        .finally(() => {
          this.load3 = false;
        });
    },
    saveBaseInfo() {
      this.$v.profile.username.$touch();
      this.$v.profile.email.$touch();
      this.$v.profile.skills.$touch();
      this.$v.profile.job.$touch();
      if (
        !this.$v.profile.username.$invalid &&
        !this.$v.profile.email.$invalid &&
        !this.$v.profile.skills.$invalid &&
        !this.$v.profile.job.$invalid
      ) {
        this.load1 = true;
        let sendSkills = this.toJSON(this.profile.skills);
        let data = {
          username: this.profile.username,
          email: this.profile.email,
          firstname: this.profile.firstname,
          lastname: this.profile.lastname,
          jobtitle: this.profile.job,
          skills: sendSkills,
          isclient: !this.profile.isFreelancer
        };

        axios
          .put("http://192.168.1.247:3500/api/user/", data)
          .then(response => {
            this.$store.state.profile.username = response.data.username;
            this.$store.state.profile.email = response.data.email;
            this.$store.state.profile.isFreelancer = !response.data.isclient;
            this.$store.state.profile.firstname = response.data.firstname;
            this.$store.state.profile.lastname = response.data.lastname;
            this.$store.state.profile.job = response.data.jobtitle;
            this.$store.state.profile.skills = response.data.skills;
          })
          .catch(() => {
            // console.log(error)
            this.errored = true;
          })
          .finally(() => {
            this.load1 = false;
          });
      }
    },
    savePassword() {
      this.$v.profile.password.$touch();
      this.$v.newPassword.$touch();
      this.$v.repeatPassword.$touch();
      if (
        !this.$v.profile.password.$invalid &&
        !this.$v.newPassword.$invalid &&
        !this.$v.repeatPassword.$invalid
      ) {
        this.load2 = true;
        let data = {
          currentPass: this.profile.password,
          newPass: this.newPassword,
          confirmNewPass: this.repeatPassword
        };

        axios
          .put("http://192.168.1.247:3500/api/user/changePass", data)
          .then(response => {
            this.$store.state.profile.password = "";
            this.newPassword = "";
            this.repeatPassword = "";
            this.changePasswordMessage = response.data;
          })
          .catch(() => {
            // console.log(error)
            this.errored = true;
          })
          .finally(() => {
            this.load2 = false;
          });
      }
    },
    turnon() {
      if (
        this.profile.password.length &&
        this.newPassword.length &&
        this.repeatPassword.length
      )
        return true;
      else return false;
    }
  },
  created() {
    axios
      .get("http://192.168.1.247:3500/api/user/getUser")
      .then(response => {
        this.$store.state.profile.username = response.data.username;
        this.$store.state.profile.email = response.data.email;
        this.$store.state.profile.password = "";
        this.$store.state.profile.isFreelancer = !response.data.isclient;
        this.$store.state.profile.firstname = response.data.firstname;
        this.$store.state.profile.lastname = response.data.lastname;
        this.$store.state.profile.job = response.data.jobtitle;
        this.$store.state.profile.field = response.data.prof.education;
        let date = response.data.prof.birthday;
        if (date != null) {
          date = date.slice(0, 10);
        } else {
          date = "";
        }
        this.$store.state.profile.birthday = date;
        this.$store.state.profile.gender = response.data.prof.gender;
        this.$store.state.profile.skills = response.data.userskills;
        this.$store.state.profile.address = response.data.prof.address;
        this.$store.state.profile.resume = response.data.prof.rewards;
        // this.$store.state.profile.image = response.data.image
        // console.log(response);
      })
      .catch(() => {
        // console.log(error)
        this.errored = true;
      })
      .finally(() => {});

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
  background-color: #f6f5f3;
}
.stick {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 4rem !important;
}
</style>