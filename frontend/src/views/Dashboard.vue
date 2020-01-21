<template>
  <div id="holePage">
    <v-navigation-drawer
      absolute
      clipped
      permanent
      height="968px"
      left
      v-model="drawer"
      class="hidden-sm-and-down"
      color="#127ebe"
    >
      <v-layout column align-center text-center>
        <v-flex class="mt-3">
          <v-avatar size="100" color="#127ebe">
            <img :src="profile.image" />
          </v-avatar>
          <p class="white--text body-1 mt-1">{{ profile.username }}</p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item v-for="link in links" :key="link.title" router :to="link.route">
          <v-list-item-icon class="white--text">
            <span :class="link.icon"></span>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{
              link.title
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container>
      <v-layout row align-center justify-center>
        <v-flex class="hidden-sm-and-down"></v-flex>
        <v-flex xs12 md8 lg9>
          <v-container>
            <v-layout row align-center justify-center>
              <v-flex xs4 sm3 lg2>
                <h3 class="subtitle-1 my-2">Freelancer Activities</h3>
              </v-flex>
              <v-flex xs8 sm9 lg10>
                <v-divider class="subtitle-1 grey darken-2">></v-divider>
              </v-flex>
            </v-layout>
            <v-layout row align-center justify-start>
              <v-flex xs12 sm6 md4 lg3 v-for="item in freelancerActivities" :key="item.title">
                <v-card height="200px" class="box pa-1 ma-1">
                  <v-card-text>
                    <v-layout style="direction: rtl;" class="icons">
                      <span :class="item.icon"></span>
                    </v-layout>
                    <h1 class="font-weight-light">{{ item.number }}</h1>
                    <p class="subtitle-1">{{ item.title }}</p>
                    <v-btn x-small text router :to="item.route">
                      <p class="caption" style="color: #fa7c15;">{{ item.text }}</p>
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row align-center justify-center>
              <v-flex xs4 sm3 lg2>
                <h3 class="subtitle-1 my-2">Client Activities</h3>
              </v-flex>
              <v-flex xs8 sm9 lg10>
                <v-divider class="subtitle-1 grey darken-2">></v-divider>
              </v-flex>
            </v-layout>
            <v-layout row align-center justify-start>
              <v-flex xs12 sm6 md4 lg3 v-for="item in clientActivities" :key="item.title">
                <v-card height="200px" class="box pa-1 ma-1">
                  <v-card-text>
                    <v-layout style="direction: rtl;">
                      <span :class="item.icon"></span>
                    </v-layout>
                    <h1 class="font-weight-light">{{ item.number }}</h1>
                    <p class="subtitle-1">{{ item.title }}</p>
                    <v-btn x-small text router :to="item.route">
                      <p class="caption" style="color: #fa7c15;">{{ item.text }}</p>
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
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
      drawer: true,
      mouse: false,
      links: [
        {
          icon: "mdi mdi-view-dashboard mdi-24px",
          title: "Dashboard",
          route: "/dashboard"
        },
        {
          icon: "mdi mdi-account-box mdi-24px",
          title: "View Profile",
          route: "/profile/" + this.$store.state.profile.id
        },
        {
          icon: "mdi mdi-square-edit-outline mdi-24px",
          title: "Edit Profile",
          route: "/profile/edit"
        },
        {
          icon: "mdi mdi-settings mdi-24px",
          title: "Account Settings",
          route: "/settings"
        },
        {
          icon: "mdi mdi-cash-usd mdi-24px",
          title: "Turnover",
          route: "/turnovers"
        },
        {
          icon: "mdi mdi-arrow-left mdi-24px",
          title: "Sign Out",
          route: "/signout"
        }
      ],
      freelancerActivities: [
        {
          title: "projects are ongoing by you",
          icon: "mdi mdi-timer-sand mdi-48px",
          number: "4",
          route: "",
          text: "view current projects",
          color: "red"
        },
        {
          title: "projects completed by you",
          icon: "mdi mdi-check-circle-outline mdi-48px",
          number: "15",
          route: "",
          text: "view finished projects",
          color: "green"
        },
        {
          title: "projects have been found fit your skills",
          icon: "mdi mdi-magnify mdi-48px",
          number: "23",
          route: "",
          text: "check projects",
          color: "blue"
        },
        {
          title: "people liked your portfolio",
          icon: "mdi mdi-account-heart mdi-48px",
          number: "169",
          route: "",
          text: "show",
          color: "yellow"
        },
        {
          title: "suggestions sent by you",
          icon: "mdi mdi-send mdi-48px",
          number: "40",
          route: "",
          text: "see suggestions",
          color: "orange"
        },
        {
          title: "Tomans is your income so far",
          icon: "mdi mdi-cash-100 mdi-48px",
          number: "1670000",
          route: "/turnover",
          text: "see turnovers",
          color: "black"
        }
      ],
      clientActivities: [
        {
          title: "Do you have a new project?",
          icon: "mdi mdi-plus mdi-48px",
          number: "",
          route: "/newproject",
          text: "create new project"
        },
        {
          title: "of your projects are in progress",
          icon: "mdi mdi-timer-sand mdi-48px",
          number: "5",
          route: "",
          text: "view current projects"
        },
        {
          title: "of your projects completed",
          icon: "mdi mdi-check-circle-outline mdi-48px",
          number: "9",
          route: "",
          text: "view finished projects"
        },
        {
          title: "suggestions sent for you",
          icon: "mdi mdi-send mdi-48px mdi-flip-h",
          number: "31",
          route: "/yoursuggestions",
          text: "see suggestions"
        },
        {
          title: "people liked your portfolio",
          icon: "mdi mdi-account-heart mdi-48px",
          number: "75",
          route: "",
          text: "show"
        },
        {
          title: "Tomans safely paid by you so far",
          icon: "mdi mdi-cash-100 mdi-48px",
          number: "3850000",
          route: "/accounting",
          text: "see turnovers"
        }
      ]
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  created() {
    axios
      .get("http://192.168.43.166:3500/api/user/getUser")
      .then(response => {
        this.$store.state.profile.id = response.data.id;
        this.$store.state.profile.username = response.data.username;
        this.$store.state.profile.isFreelancer = !response.data.isclient;
        this.$store.state.profile.job = response.data.jobtitle;
        this.$store.state.profile.field = response.data.prof.education;
        // this.$store.state.profile.image = response.data.image
        // console.log(response);
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
  background-color: white;
}
.stick {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 4rem !important;
}
.box {
  border-style: solid;
  border-width: 2px;
  background-color: rgb(250, 250, 250);
  border-color: rgb(250, 250, 250);
}
.box:hover {
  border-color: #fa7900;
  box-shadow: 5px 5px 5px #fa7c15;
}
/* .box :hover ~ .icons {
  -webkit-text-fill-color: #127ebe;
} */
</style>
