<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-row class="mx-2 my-2" align="center">
        <h2 class="text-h6 text-sm-h5 mb-2 mb-sm-0">
          {{ titulo.toUpperCase() }}
        </h2>
        <v-spacer />
        <v-text-field
          v-model="search"
          label="O que está procurando?"
          :append-icon="`mdi-${search ? '' : 'magnify'} `"
          clearable
          dense
          @keyup.enter="getServicos"
          @click:clear="limpar"
        ></v-text-field>
        <v-btn
          color="primary"
          fab
          small
          title="Buscar"
          class="mx-2"
          v-if="search"
          @click="getServicos"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
        <v-btn color="primary" fab small title="Cadastrar" class="mx-2" @click="newItem"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-row>
      <CadastrarEditar
        :ativar="dialog"
        :classe="servico"
        :modo="modo"
        :path="path"
        @fechar="fechar"
        @atualizar="getServicos"
      />
      <Excluir
        :ativar="dialogDelete"
        :classe="servico"
        :path="path"
        @fechar="fechar"
        @atualizar="getServicos"
      />
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-2"
        :no-data-text="semResultados"
        :no-results-text="semResultados"
        hide-default-footer
        :items-per-page="paginacao.pageSize"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            color="primary"
            class="mr-3"
            @click="editItem(item)"
            title="EDITAR"
            >mdi-square-edit-outline</v-icon
          >
          <v-icon small color="error" title="EXCLUIR" @click="deleteItem(item)">
            mdi-delete</v-icon
          >
        </template>
        <template v-slot:footer>
          <Paginacao :paginacao="paginacao" @paginacao="paged" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import Servico from "@/models/inventario/Servico";
export default {
  data() {
    return {
      items: [],
      titulo: "servicos",
      path: "servicos",
      search: "",
      modo: -1,
      dialog: false,
      dialogDelete: false,
      servico: new Servico(),
      paginacao: {
        pageNumber: 1,
        totalPages: 5,
        pageSize: 10,
        totalElements: 50,
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "NOME", value: "nome" },
        { text: "DESCRIÇÃO", value: "descricao" },
        { text: "PERIODICIDADE", value: "periodicidade" },
        { text: "LOG", value: "log_execucao" },
        { text: "PROCESSO", value: "processo" },
        { text: "STATUS", value: "status" },
        { text: "OPÇÕES", value: "actions", align: "center", width: "15%" },
      ],
      semResultados: "Nenhum item encontrado.",
    };
  },
  created() {
    this.getServicos();
  },
  methods: {
    filtrar(valor) {
      this.search = valor;
      this.getServicos();
    },
    fechar() {
      this.dialog = false;
      this.dialogDelete = false;
    },
    limpar() {
      this.search = "";
      this.getServicos();
    },
    paged(val) {
      this.paginacao.pageSize = val.pageSize;
      this.getServicos();
    },
    newItem() {
      this.servico = new Servico();
      this.modo = -1;
      this.dialog = true;
    },
    deleteItem(item) {
      this.servico = item;
      this.dialogDelete = true;
    },
    editItem(item) {
      this.servico = item;
      this.modo = 0;
      this.dialog = true;
    },
    getServicos() {
      this.$axios
        .$get(
          this.search == "" || this.search == null
            ? `servicos?_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}`
            : `servicos?_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}&q=${this.search}`
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
