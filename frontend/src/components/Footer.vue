<template>
  <v-footer padless>
    <v-card flat tile width="100%">
      <v-card-text class="grey darken-4 white--text text--lighten-2">
        <v-layout row align-center justify-center>
          <v-flex xs12 sm4 md3 class="pa-2">
            <h3 class="subtitle-1">Arigato:</h3>
            <v-list color="grey darken-4" flat dense>
              <v-list-item
                v-for="item in items"
                :key="item.name"
                route
                :to="item.address"
              >
                <v-list-item-title class="text--lighten-2 white--text">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-flex>
          <v-flex xs12 sm4 md3 class="pa-2">
            <h3 class="subtitle-1">Terms:</h3>
            <v-list flat dense class="grey darken-4">
              <v-list-item
                v-for="term in terms"
                :key="term.name"
                route
                :to="term.address"
              >
                <v-list-item-title class="text--lighten-2 white--text">{{
                  term.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-flex>
          <v-flex xs12 sm4 md3 class="pa-2">
            <h3 class="subtitle-1">Contact Us:</h3>
            <v-list color="grey darken-4">
              <v-list-item v-for="c in contact" :key="c.info">
                <p class="text--lighten-2 white--text">
                  <span :class="c.icon"></span>
                  <span>{{ c.info }}</span>
                </p>
              </v-list-item>
            </v-list>
          </v-flex>
          <v-flex xs12 sm4 md3 class="pa-2">
            <h3 class="title font-weight-light pb-5">
              Fallow Arigato in social networks:
            </h3>
            <v-btn fab small v-for="icon in icons" :key="icon" class="caption">
              <span :class="icon" style="color: #fa7c15;"></span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-text class="grey darken-4 white--text text-center">
        <span class="caption">
          Copyright © 2020 University of Guilan. All rights reserved.
        </span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: function() {
    return {
      items: [
        { name: "Freelancers", address: "/freelancers" },
        { name: "Projects", address: "/projects" },
        { name: "Categories", address: "/categories" },
        { name: "Clients", address: "/clients" },
        { name: "", address: "" }
      ],
      terms: [
        { name: "Privacy Policy", address: "" },
        { name: "Terms and Conditions", address: "" },
        { name: "Copyright Policy", address: "" },
        { name: "Code of Conduct", address: "" },
        { name: "Fees and Charges", address: "" }
      ],
      contact: [
        { info: " (013) 33690275", icon: "mdi mdi-phone-classic mdi-24px" },
        { info: " (013) 33690276", icon: "mdi mdi-fax mdi-24px" },
        { info: " int@guilan.ac.ir", icon: "mdi mdi-email mdi-24px" },
        {
          info:
            " 5th Kilometer of Persian Gulf Highway, Rasht, Guilan Province, Iran",
          icon: "mdi mdi-map-marker mdi-24px"
        }
      ],
      icons: [
        "mdi mdi-facebook mdi-24px",
        "mdi mdi-twitter mdi-24px",
        "mdi mdi-google-plus mdi-24px",
        "mdi mdi-linkedin mdi-24px",
        "mdi mdi-instagram mdi-24px"
      ]
    };
  }
};
</script>

<style scoped></style>
