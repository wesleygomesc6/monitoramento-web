<template>
  <v-app>
    <v-app-bar color="primary" height="100px" dark app>
      <v-row
        justify="center"
        align="center"
        class="d-flex justify-space-between"
      >
        <h1>LOGO</h1>
        <span class="text-caption text-sm-body-1 text-md-h4 mt-1 ml-2 font-weight-bold">
          {{ title }}
        </span>
        <a
          class="text-decoration-none white--text"
          href=""
          target="_black"
        >
          <span class="text-caption text-sm-body-1 mt-1 mx-1">{{ link }} </span></a
        >
      </v-row>
    </v-app-bar>
    <v-main>
      <client-only>
        <vue-snotify></vue-snotify>
      </client-only>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer>
      <v-card-text class="pa-0 text-center"
        >&copy; {{ new Date().getFullYear() }} - 
        Wesley Carvalho</v-card-text
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      link: "PORTAL",
      title: "WEB APP MONITORAMENTO",
    };
  },
};
</script>
