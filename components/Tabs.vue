<template>
  <v-row justify="center" align="center" class="d-flex justify-space-between mx-1 my-1">
    <v-col cols="12" md="6" class="d-flex pa-1">
      <v-tabs class="mx-2 mb-5" flat slider-color="primary" v-model="tab">
        <v-tab @click="all"
          ><span> TODOS </span>
          <v-icon small color="primary">mdi-flower-pollen</v-icon></v-tab
        >
        <v-tab @click="pendentes"
          ><span> PENDENTES </span> <v-icon small color="error">mdi-circle</v-icon></v-tab
        >
        <v-tab @click="validados"
          ><span>VALIDADOS</span>
          <v-icon small color="success">mdi-check-bold</v-icon></v-tab
        ></v-tabs
      >
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["tabValue"],
  data() {
    return {
      tab: 0,
    };
  },
  watch: {
    tabValue(v) {
      this.tab = v;
    },
  },
  methods: {
    all() {
      this.$emit("getAll");
    },
    pendentes() {
      this.$emit("getPendentes", false);
    },
    validados() {
      this.$emit("getValidados", true);
    },
  },
};
</script>
