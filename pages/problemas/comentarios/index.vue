<template>
  <TabelaDefaultDyna
    :items="items"
    :headers="headers"
    :titulo="titulo"
    :path="path"
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
      path: 'comentarios', // usado na url para as requisições
      titulo: "Comentários",
      search: "",
      paginacao: {
        pageNumber: 0,
        totalPages: 0,
        pageSize: 10,
        totalElements: 0,
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "AUTOR", value: "authorName" },
        { text: "COMENTÁRIO", value: "content" },
        { text: "ID PROBLEMA", value: "problemId" },
        { text: "OPÇÕES", value: "actions" },
      ],
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    filtrar(valor) {
      this.search = valor;
      this.getComments();
    },
    limpar() {
      this.search = "";
      this.getComments();
    },
    paged(val) {
      this.paginacao.pageSize = val.pageSize;
      this.getComments();
    },
    getComments() {
      this.$axios
        .$get(
          `comentarios?page=${this.paginacao.pageNumber}&size=${this.paginacao.pageSize}&filtro=${this.search}`
        )
        .then((res) => {
          this.items = res.content;
          this.paginacao = res.pageable;
          this.paginacao.totalPages = res.totalPages;
          this.paginacao.totalElements = res.totalElements;
        })
        .catch((err) => this.$snotify.error(err, "Algo deu errado!"));
    },
  },
};
</script>
