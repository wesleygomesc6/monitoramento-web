<template>
  <v-row>
    <TabelaProblemas
      :titulo="titulo"
      :headers="headers"
      :items="items"
      :paginacao="paginacao"
      :search="search"
      @search="filtro"
      @getAllPagined="paged"
      @limpar-filtro="limparFiltro"
      @get-all="getProblemasAll"
      @get-pendentes="validateds"
      @get-validados="validateds"
      @atualizar-items="verificarTab"
    >
      <template v-slot:selecData>
        <v-row align="center" justify="end" class="mx-1 my-1">
          <v-btn
            class="mx-2"
            color="primary"
            v-if="!filtrarDatas"
            @click="filtrarDatas = !filtrarDatas"
            title="Selecionar intervalo"
            ><span class="mx-2">SELECIONAR INTERVALO</span
            ><v-icon>mdi-calendar-multiple</v-icon></v-btn
          >
          <SelectData
            @datas="calcularDatas"
            @limpar-intervalo="limparIntervalo"
            v-if="filtrarDatas"
        /></v-row>
      </template>
      <template v-slot:footerTable>
        <Paginacao :paginacao="paginacao" @paginacao="paged" />
      </template>
    </TabelaProblemas>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      titulo: "Problemas Dynatrace",
      items: [],
      search: "",
      intervalo: [],
      tab: 0,
      validated: false,
      filtrarDatas: false,
      paginacao: {
        pageNumber: 0,
        totalPages: 5,
        pageSize: 10,
        totalElements: 50,
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "DISPLAY ID", value: "displayId" },
        { text: "TITULO", value: "title" },
        { text: "TIPO", value: "severityLevel" },
        { text: "IMPACTO (dynatrace)", value: "impactLevel" },
        { text: "CAUSA RAIZ", value: "rootCauseEntity.name" },
        { text: "INICIO", value: "startTime" },
        { text: "FIM", value: "endTime" },
        { text: "SOLUCIONADOR", value: "solver" },
        { text: "VALIDADO", value: "validated", align: "center" },
      ],
    };
  },
  created() {
    this.getProblemasAll();
  },
  methods: {
    limparFiltro() {
      this.search = "";
      this.paginacao.pageNumber = 0;
      this.paginacao.pageSize = 10;
      this.verificarTab();
    },
    limparIntervalo() {
      this.intervalo = [];
      this.filtrarDatas = false;
      this.paginacao.pageNumber = 0;
      this.paginacao.pageSize = 10;
      this.verificarTab();
    },
    verificarTab() {
      if (this.tab == 0) {
        this.getProblemasAll();
      } else {
        this.getProblemasValidated();
      }
    },
    paged(val) {
      this.paginacao.pageSize = val.pageSize;
      this.verificarTab();
    },
    calcularDatas(valor) {
      this.paginacao.pageNumber = 0;
      this.intervalo = valor;
      this.verificarTab();
    },
    validateds(valor, page, tab) {
      this.validated = valor;
      this.paginacao.pageNumber = page;
      this.tab = tab;
      this.getProblemasValidated();
    },
    filtro(val) {
      this.search = val;
      this.verificarTab();
    },
    getProblemasValidated() {
      let url = "";
      if (this.search == null || (this.search == "" && this.filtrarDatas == false)) {
        url = `problemas?validated=${this.validated}&_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}`;
      } else if (this.search != null && this.filtrarDatas == false) {
        url = `problemas?validated=${this.validated}&filtro=${this.search}&_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}`;
      } else {
        url = `problemas?validated=${this.validated}&filtro=${this.search}&inicio=${this.intervalo[0]}&fim=${this.intervalo[1]}&_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}`;
      }
      this.$axios
        .$get(url)
        .then((res) => {
          this.items = res;
          // this.paginacao = res.pageable;
          // this.paginacao.totalPages = res.totalPages;
          // this.paginacao.totalElements = res.totalElements;
        })
        .catch((err) => this.$snotify.error(err, "Erro!"));
    },
    getProblemasAll() {
      this.tab = 0;
      let url = "";
      if (this.search == null || (this.search == "" && this.filtrarDatas == false)) {
        url = `problemas?_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}`;
      } else if (this.search != null && this.filtrarDatas == false) {
        url = `problemas?q=${this.search}&_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}`;
      } else if (
        this.search == null ||
        (this.search == "" && this.filtrarDatas == true)
      ) {
        url = `problemas?inicio=${this.intervalo[0]}&fim=${this.intervalo[1]}&_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}`;
      } else {
        url = `problemas?filtro=${this.search}&inicio=${this.intervalo[0]}&fim=${this.intervalo[1]}&_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}`;
      }
      this.$axios
        .$get(url)
        .then((res) => {
          this.items = res;
          // this.paginacao = res.pageable;
          // this.paginacao.totalPages = res.totalPages;
          // this.paginacao.totalElements = res.totalElements;
        })
        .catch((err) => this.$snotify.error(err, "Erro!"));
    },
  },
};
</script>
