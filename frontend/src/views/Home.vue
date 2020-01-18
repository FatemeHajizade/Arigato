<template>
  <div>
    <div id="firstContainer">
      <v-container class="pa-3">
        <v-layout row align-center justify-center class="text-center">
          <v-flex sm12 md5>
            <div class="ma-5">
              <h1 dark class="font-weight-light">Would you need a job?</h1>
              <h3 class="title-1 font-weight-light">
                you can check list of projects and choose the most appropriate
                one!
              </h3>
              <v-btn depressed dark color="blue accent-2" class="ma-1">
                <span class="mdi mdi-eye mdi-24px"></span>
                <h3 class="subtitle-1 font-weight-light pl-1">see projects</h3>
              </v-btn>
            </div>
            <br />
            <div classs="ma-5">
              <h1 dark class="font-weight-light">
                Would you hire a freelancer?
              </h1>
              <h3 class="title-1 font-weight-light">
                you can create a new project and find your freelancer soon!
              </h3>
              <v-btn depressed dark color="blue accent-2" class="ma-1">
                <span class="mdi mdi-plus mdi-24px"></span>
                <h3 class="subtitle-1 font-weight-light pl-1">
                  create project
                </h3>
              </v-btn>
            </div>
          </v-flex>
          <v-flex class="hidden-sm-and-down" md7>
            <v-img
              id="firstPic"
              src="https://image.freepik.com/free-vector/online-virtual-relationships-dating-social-networks-chat-rooms-internet-man-woman-communicate-laptop-with-each-other-sitting-home-internet-virtual-reality-vector-illustration_114579-810.jpg"
            ></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-divider></v-divider>

    <div style="background-color: #127ebe; min-height: 120px;">
      <v-container>
        <v-layout
          row
          align-center
          justify-center
          class="text-center white--text"
        >
          <v-flex xs12 sm4>
            <span class="mdi mdi-account-group mdi-48px"></span>
            <h2 class="font-weight-light">
              more than {{ size(freelancers) }} proficient freelancers
            </h2>
          </v-flex>
          <v-flex xs12 sm4>
            <span class="mdi mdi-folder-multiple mdi-48px"></span>
            <h2 class="font-weight-light">
              more than {{ size(projects) }} successful projects
            </h2>
          </v-flex>
          <v-flex xs12 sm4>
            <span class="mdi mdi-format-list-bulleted-type mdi-48px"></span>
            <h2 class="font-weight-light">
              more than {{ size(categories) }} different fields
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-divider></v-divider>

    <div id="secondContainer">
      <v-container>
        <v-layout row justify-center align-center>
          <v-flex sm12 md6 class="px-2">
            <h1 class="font-weight-light">New to website?</h1>
            <h3 class="title-1 font-weight-light px-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Suspendisse interdum consectetur libero id faucibus nisl tincidunt
              eget. Massa placerat duis ultricies lacus sed turpis tincidunt id
              aliquet. Elementum pulvinar etiam non quam lacus suspendisse
              faucibus interdum posuere. Faucibus ornare suspendisse sed nisi
              lacus. Ultrices in iaculis nunc sed augue lacus viverra vitae
              congue. Arcu dictum varius duis at consectetur. Massa vitae tortor
              condimentum lacinia quis vel. Enim blandit volutpat maecenas
              volutpat blandit aliquam.
            </h3>
            <v-btn
              large
              dark
              color="indigo accent-4"
              class="my-4"
              min-width="200px"
            >
              <h3 class="subtitle-1 font-weight-light">register now</h3>
            </v-btn>
          </v-flex>
          <v-flex class="hidden-sm-and-down" md6>
            <v-img
              id="secondPic"
              src="https://image.freepik.com/free-vector/simple-isometric-hiring-illustration_23-2148089416.jpg"
            ></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-divider></v-divider>

    <div class="white">
      <v-container>
        <v-layout row justify-center class="text-center">
          <v-flex>
            <h1 class="title-1 font-weight-light">
              Some of our most popular different categories:
            </h1>
          </v-flex>
        </v-layout>
        <v-layout row justify-space-around class="mt-3 text-center">
          <v-flex
            xs6
            sm4
            md3
            lg2
            v-for="activity in activities"
            :key="activity.name"
            class="my-6"
          >
            <v-card height="80" width="170" flat>
              <v-img
                max-width="170"
                max-height="80"
                :src="activity.image"
                class="mx-12"
              ></v-img>
            </v-card>
            <h3 class="subtitle-2 text-center">{{ activity.name }}</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      activities: [
        {
          name: "Web Development",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-website-design-3a2efd17.svg"
        },
        {
          name: "Graphic Design",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-graphic-design-481553fb.svg"
        },
        {
          name: "Digital Marketing",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-internet-marketing-6034da7a.svg"
        },
        {
          name: "Type",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-data-entry-fe9b0d94.svg"
        },
        {
          name: "Article Writing",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-copy-writing-3dd6b3b7.svg"
        },
        {
          name: "SEO",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-seo-70c65124.svg"
        },
        {
          name: "Mobile Development",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-android-1fbcc39d.svg"
        },
        {
          name: "Software Development",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-software-dev-eae5b2d6.svg"
        },
        {
          name: "Logo and Banner Design",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-logo-design-4ea1358b.svg"
        },
        {
          name: "Linux",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-linux-3ff0239d.svg"
        },
        {
          name: "Data Science",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-finance-94965f68.svg"
        },
        {
          name: "Photoshop",
          image:
            "https://www.f-cdn.com/assets/img/homepage/icons/hire/hire-photoshop-d2323b6f.svg"
        }
      ]
    };
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
    freelancers() {
      return this.$store.state.freelancers;
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  created() {
    axios
      .get("http://192.168.1.247:3500/api/project/seeAllProject")
      .then(response => {
        this.$store.state.projects = response.data;
        // console.log("salaaam");
      })
      .catch(() => {
        // console.log(error)
        this.errored = true;
      })
      .finally(() => {});

    axios
      .get("http://192.168.1.247:3500/api/user/seeAllLancers")
      .then(response => {
        this.$store.state.freelancers = response.data;
      })
      .catch(() => {
        // console.log(error)
        this.errored = true;
      })
      .finally(() => {});
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
  },
  methods: {
    size(arg) {
      return arg.length;
    }
  }
};
</script>

<style scoped>
#firstContainer {
  max-height: 430px;
  min-height: 430px;
  background-color: white;
}
#firstPic {
  max-height: 410px;
}
#secondContainer {
  min-height: 420px;
  background-image: linear-gradient(rgba(253, 254, 255), rgba(201, 255, 255));
}
#secondPic {
  max-height: 550px;
}
</style>
