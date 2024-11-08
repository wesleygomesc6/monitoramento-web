<template>
  <TabelaDefaultDyna
    :items="items"
    :path="path"
    :headers="headers"
    :titulo="titulo"
    :qtdPorPagina="paginacao.pageSize"
    @limpar="limpar"
    @buscar="filtrar"
  >
    <template v-slot:footerTable>
      <Paginacao :paginacao="paginacao" @paginacao="paged" />
    </template>
  </TabelaDefaultDyna>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      titulo: "Entities",
      path: 'entities',
      search: "",
      paginacao: {
        pageNumber: 0,
        totalPages: 0,
        pageSize: 10,
        totalElements: 0,
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "ENTITY ID", value: "entityId" },
        { text: "NAME", value: "name" },
        { text: "ENTITY TYPE", value: "entityType.name" },
        { text: "OPÇÕES", value: "actions" },
      ],
    };
  },
  created() {
    this.getEntities();
  },
  methods: {
    filtrar(valor) {
      this.search = valor;
      this.getEntities();
    },
    limpar() {
      this.search = "";
      this.getEntities();
    },
    paged(val) {
      this.paginacao.pageSize = val.pageSize;
      this.getEntities();
    },
    getEntities() {
      this.$axios
        .$get(
          `entities?_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}&filtro=${this.search}`
        )
        .then((res) => {
          this.items = res.content;
          this.paginacao = res.data.pageable;
          // this.paginacao.totalPages = res.data.totalPages;
          // this.paginacao.totalElements = res.data.totalElements;
        })
        .catch((err) => this.$snotify.error(err, "Algo deu errado!"));
    },
  },
};
</script>
