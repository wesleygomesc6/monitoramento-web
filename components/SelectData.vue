<template>
  <v-row class="d-flex my-1" align="center" justify="end">
    <v-col cols="12" sm="5" md="4" lg="3" xl="2" class="d-flex pr-1 py-0">
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateInitial"
            label="Data inicial"
            v-bind="attrs"
            v-on="on"
            readonly
            dense
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateInitial"
          no-title
          @input="menu1 = false"
        ></v-date-picker>
      </v-menu>
      <v-text-field
        class="ml-1"
        v-model="horaInicial"
        dense
        v-mask="'##:##'"
        label="Hora inicial"
        hint="00:00"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="5" md="4" lg="3" xl="2" class="d-flex pl-1 py-0">
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateFinal"
            label="Data Final"
            v-bind="attrs"
            v-on="on"
            readonly
            dense
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateFinal"
          no-title
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
      <v-text-field
        class="ml-1"
        v-model="horaFinal"
        dense
        v-mask="'##:##'"
        label="Hora final"
        hint="00:00"
      ></v-text-field>
    </v-col>
    <v-col
      cols="12"
      sm="2"
      md="1"
      class="pl-1 py-0 pb-6 d-flex justify-end justify-sm-space-between"
    >
      <v-icon color="primary" title="Pesquisar" large @click="emitirDatas"
        >mdi-arrow-right-circle</v-icon
      >
      <v-icon color="warning" title="Limpar" large @click="limpar"
        >mdi-broom</v-icon
      ></v-col
    >
  </v-row>
</template>
<script>
export default {
  data: (vm) => ({
    horaInicial: "",
    dateInitial: "",
    horaFinal: "",
    dateFinal: "",
    menu1: false,
    menu2: false,
    intervalo: [],
  }),

  watch: {
    dateInitial(val, old) {
      this.formatDate(val);
    },
    dateFinal(val, old) {
      this.formatDate(val);
    },
  },

  methods: {
    limpar() {
      (this.dateInitial = ""),
        (this.horaInicial = ""),
        (this.dateFinal = ""),
        (this.horaFinal = "");
      this.$emit("limpar-intervalo");
    },
    emitirDatas() {
      if (this.horaInicial == "") {
        this.horaInicial = "00:00";
      }
        if(this.dateInitial == "") {
          this.dateInitial = this.dateFinal
        }
      if (this.horaFinal == "") {
        this.horaFinal = "23:59";
      }
      if(this.dateFinal == "") {
        this.dateFinal = this.dateInitial
      }
      this.intervalo = [];
      this.intervalo.push(
        `${this.dateInitial} ${this.horaInicial}`,
        `${this.dateFinal} ${this.horaFinal}`
      );
      this.$emit("datas", this.intervalo);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>
