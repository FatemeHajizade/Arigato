<template>
  <div v-if="!close">
    <v-layout row align-center justify-center>
      <v-flex xs4>
        <v-text-field type="text" suffix="Tomans" class="px-2" v-model="payment.money" />
      </v-flex>
      <v-flex xs1>
        <p class="px-2 text-center pt-6 font-weight-medium">for</p>
      </v-flex>
      <v-flex xs5>
        <v-text-field type="text" placeholder="Perpose" class="px-2" v-model="payment.perpose" />
      </v-flex>
      <v-flex xs1>
        <div class="text-center pr-9">
          <v-btn x-small fab depressed dark color="red" v-on:click="close=true">
            <span class="mdi mdi-close"></span>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      close: false,
      payment: {
        money: "",
        perpose: ""
      },
      payments: []
    };
  }
};
</script>

