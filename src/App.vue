<template>
  <v-app>
    <v-app-bar color="green" app content-class="elevation-0" v-if="!$route.path.includes('/login')">
      <v-toolbar-title class="ml-2">
        <v-btn value="recent" @click="Logout()">
          <span>Log out</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-title>

    </v-app-bar>
    <v-content>
      <v-main class="pt-0">
        <router-view/>
      </v-main>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  methods:{
    Logout(){
      let url = `https://test-api.updivision.work/api/logout`;
      let headers = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${ JSON.parse(localStorage.getItem('token'))}`,
        },
      };
      console.log(JSON.parse(localStorage.getItem('token')));

      console.log(url);
      console.log(headers);
      this.axios
          .post(url, {}, headers)
          .then((res) => {
            if(res.status === 200){
              localStorage.removeItem('token');
              this.$store.commit("SetTokken",'');
              this.$router.push({ name: 'Login' })
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit('SetErrorMsg', error.response.data.message)
          });
    },
  }
};
</script>

<style>

</style>