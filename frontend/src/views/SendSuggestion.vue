<template>
  <div id="holePage">
    <v-container>
      <v-layout row align-center justify-center>
        <v-flex xs12 md7 class="pa-2">
          <v-container>
            <v-layout row align-center justify-start>
              <v-flex>
                <h3 class="display-2 ma-2">Do you have an idea?</h3>
                <h3 class="display-1 mb-8">send your suggestion and make money!</h3>
              </v-flex>
            </v-layout>

            <v-stepper v-model="stepBYstep" vertical>
              <v-stepper-step :complete="stepBYstep > 1" step="1">
                Price
                <small>How mush is your offer price?</small>
              </v-stepper-step>
              <v-stepper-content step="1">
                <v-text-field
                  type="text"
                  suffix="Tomans"
                  v-model="suggestion.cost"
                  @input="$v.suggestion.cost.$touch()"
                  @blur="$v.suggestion.cost.$touch()"
                  :error-messages="costConfirm"
                />
                <v-btn
                  dark
                  color="blue darken-3"
                  class="mb-2 mt-3"
                  @click.native="stepBYstep = 2"
                >Next</v-btn>
              </v-stepper-content>
              <v-stepper-step :complete="stepBYstep > 2" step="2">
                Deadline
                <small>How much time do you need?</small>
              </v-stepper-step>
              <v-stepper-content step="2">
                <v-text-field
                  type="text"
                  suffix="Day"
                  v-model="suggestion.deadline"
                  @input="$v.suggestion.deadline.$touch()"
                  @blur="$v.suggestion.deadline.$touch()"
                  :error-messages="deadlineConfirm"
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
                Make secure payment
                <small>you can make secure payment for each segment of project.</small>
              </v-stepper-step>
              <v-stepper-content step="3">
                <h5>Hint: Total price of secure payments must be equal to your offer price for project.</h5>
                <new-secure-payment />
                <div ref="container"></div>
                <v-layout row align-center justify-start class="mb-7">
                  <v-btn
                    x-small
                    fab
                    depressed
                    dark
                    color="green"
                    class="my-4 ml-4"
                    v-on:click="add()"
                  >
                    <span class="mdi mdi-plus"></span>
                  </v-btn>
                  <h3 class="caption ma-1">Add secure payment</h3>
                </v-layout>
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
                <small>Describe your suggestion.</small>
              </v-stepper-step>
              <v-stepper-content step="4">
                <v-textarea outlined type="text" v-model="suggestion.information" no-resize />
                <v-btn
                  dark
                  color="#fa7c15"
                  class="mb-2 mt-3 mr-1"
                  @click.native="stepBYstep = 3"
                >Previous</v-btn>
              </v-stepper-content>
            </v-stepper>

            <v-layout justify-center>
              <v-btn class="my-5 mr-1" dark route to="/dashboard">
                <span class="subtitle ma-1">cancel</span>
              </v-btn>
              <v-btn
                class="my-5 ml-1"
                color="blue darken-3"
                :dark="send()"
                :disabled="!send()"
                v-on:click="finish()"
                :loading="load"
              >
                <span class="subtitle ma-1">send suggestion</span>
              </v-btn>
            </v-layout>
            <v-layout justify-center>
              <p class="caption ma-1">{{ message }}</p>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex align-self-stretch md5 class="stick hidden-sm-and-down">
          <v-img
            src="https://image.freepik.com/free-vector/businessman-with-creative-vector-illustration_39663-274.jpg"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import newSecurePayment from "../components/newSecurePayment.vue";
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    newSecurePayment
  },
  mixins: [validationMixin],
  data: function() {
    return {
      suggestion: {
        cost: "",
        deadline: "",
        information: ""
      },
      message: "",
      stepBYstep: 1
    };
  },
  methods: {
    add() {
      var ComponentClass = Vue.extend(newSecurePayment);
      var instance = new ComponentClass({
        // propsData: { type: 'primary' }
      });
      instance.$mount();
      this.$refs.container.appendChild(instance.$el);
    },
    send() {
      if (this.suggestion.cost.length && this.suggestion.deadline.length) {
        return true;
      } else {
        return false;
      }
    },
    finish() {
      let data = {
        projectId: this.$route.params.id,
        price: this.suggestion.cost,
        timeneeded: this.suggestion.deadline,
        comment: this.suggestion.information
      };
      axios
        .post("http://192.168.1.247:3500/api/project/sendOffer", data)
        .then(response => {
          this.message = response.data;
          // console.log(response);
        })
        .catch(() => {
          // console.log(error)
          this.errored = true;
        })
        .finally(() => {});
    }
  },
  validations: {
    suggestion: {
      deadline: {
        required
      },
      cost: {
        required
      }
    }
  },
  computed: {
    deadlineConfirm() {
      let errors = [];
      if (!this.$v.suggestion.deadline.$dirty) {
        return (errors = []);
      }
      if (!this.$v.suggestion.deadline.required) {
        errors.push("This field is required");
      }
      return errors;
    },
    costConfirm() {
      let errors = [];
      if (!this.$v.suggestion.cost.$dirty) {
        return (errors = []);
      }
      if (!this.$v.suggestion.cost.required) {
        errors.push("This field is required");
      }
      return errors;
    }
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