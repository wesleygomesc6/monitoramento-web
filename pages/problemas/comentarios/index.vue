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
      path: 'comments', // usado na url para as requisições
      titulo: "Comentários",
      search: "",
      paginacao: {
        pageNumber: 1,
        totalPages: 5,
        pageSize: 10,
        totalElements: 50,
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "AUTOR", value: "authorName" },
        { text: "COMENTÁRIO", value: "content" },
        { text: "ID PROBLEMA", value: "problem.id" },
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
          `comments?_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}&q=${this.search}`
        )
        .then((res) => {
          this.items = res;
          // this.paginacao = res.pageable;
          // this.paginacao.totalPages = res.totalPages;
          // this.paginacao.totalElements = res.totalElements;
        })
        .catch((err) => this.$snotify.error(err, "Algo deu errado!"));
    },
  },
};
</script>
