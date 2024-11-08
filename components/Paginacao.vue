<template>
  <v-row class="ma-2 pa-2" align="center" justify="center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          text
          color="primary"
          class="mx-4"
          v-bind="attrs"
          v-on="on"
          title="Itens por página"
        >
          {{ paginacao.pageSize }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(number, index) in itemsPerPageArray"
          :key="index"
          @click="updateItemsPerPage(number)"
        >
          <v-list-item-title>{{ number }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      small
      fab
      color="primary"
      class="mx-1"
      @click="formerPage"
      title="anterior"
      :disabled="prevDisable"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <span class="mx-4 grey--text">
      página
      {{ paginacao.totalPages == 0 ? '0' : paginacao.pageNumber + 1 }}
      de {{ paginacao.totalPages }}
    </span>
    <v-divider vertical />
    <span class="mx-4 grey--text"> Total de itens: {{ paginacao.totalElements }} </span>
    <v-btn
      small
      fab
      color="primary"
      class="mx-1"
      @click="nextPage"
      title="próxima"
      :disabled="nextDisable"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-row>
</template>
<script>
export default {
  props: ["paginacao"],
  data() {
    return {
      itemsPerPageArray: [5, 10, 20, 50, 100],
      prevDisable: false,
      nextDisable: false,
    };
  },
  watch: {
    paginacao(val) {
      if (val.pageNumber == 0) {
        this.prevDisable = true;
      } else {
        this.prevDisable = false;
      }

      if (val.pageNumber == val.totalPages - 1 || val.totalElements == 0) {
        this.nextDisable = true;
      } else {
        this.nextDisable = false;
      }
    },
  },
  methods: {
    updateItemsPerPage(number) {
      this.paginacao.pageSize = number;
      this.$emit("paginacao", this.paginacao);
    },
    nextPage() {
      if (this.paginacao.pageNumber + 1 <= this.paginacao.totalPages)
        this.paginacao.pageNumber += 1;
      this.$emit("paginacao", this.paginacao);
    },
    formerPage() {
      if (this.paginacao.pageNumber - 1 >= 0) this.paginacao.pageNumber -= 1;
      this.$emit("paginacao", this.paginacao);
    },
  },
};
</script>
