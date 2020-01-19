import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
    freelancers: [],
    categories: [],
    skills: [],
    gender: ["Male", "Female"],
    profile: {
      id: "",
      username: "",
      email: "",
      password: "",
      isFreelancer: true,
      firstname: "",
      lastname: "",
      job: "",
      field: "",
      gender: "",
      birthday: "",
      skills: [],
      address: "",
      resume: "",
      image: "http://styleguide.europeana.eu/images/fpo_avatar.png",
      online: false
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
