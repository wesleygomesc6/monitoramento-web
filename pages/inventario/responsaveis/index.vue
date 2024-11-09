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
          @keyup.enter="getResponsaveis"
          @click:clear="limpar"
        ></v-text-field>
        <v-btn
          color="primary"
          fab
          small
          title="Buscar"
          class="mx-2"
          v-if="search"
          @click="getResponsaveis"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
        <v-btn color="primary" fab small title="Cadastrar" class="mx-2" @click="newItem"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-row>
      <CadastrarEditarResponsavel
        :ativar="dialog"
        :classe="responsavel"
        :modo="modo"
        :path="path"
        @fechar="fechar"
        @atualizar="getResponsaveis"
      />
      <Excluir
        :ativar="dialogDelete"
        :classe="responsavel"
        :path="path"
        @fechar="fechar"
        @atualizar="getResponsaveis"
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
import Responsavel from "@/models/inventario/Responsavel";
export default {
  data() {
    return {
      items: [],
      titulo: "responsaveis",
      path: "responsaveis",
      search: "",
      modo: -1,
      dialog: false,
      dialogDelete: false,
      responsavel: new Responsavel(),
      paginacao: {
        pageNumber: 1,
        totalPages: 5,
        pageSize: 10,
        totalElements: 50,
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "NOME", value: "nome" },
        { text: "CARGO", value: "cargo.nome" },
        { text: "ATIVIDADES", value: "atividades" },
        { text: "GERENCIA", value: "gerencia.nome" },
        { text: "GERENTE", value: "gerente" },
        { text: "STATUS", value: "status" },
        { text: "CONTRATAÇÃO", value: "tipoContratacao.nome" },
        { text: "OPÇÕES", value: "actions" },
      ],
      semResultados: "Nenhum item encontrado.",
    };
  },
  created() {
    this.getResponsaveis();
  },
  methods: {
    filtrar(valor) {
      this.search = valor;
      this.getResponsaveis();
    },
    fechar() {
      this.dialog = false;
      this.dialogDelete = false;
    },
    limpar() {
      this.search = "";
      this.getResponsaveis();
    },
    paged(val) {
      this.paginacao.pageSize = val.pageSize;
      this.getResponsaveis();
    },
    newItem() {
      this.responsavel = new Responsavel();
      this.modo = -1;
      this.dialog = true;
    },
    deleteItem(item) {
      this.responsavel = item;
      this.dialogDelete = true;
    },
    editItem(item) {
      this.responsavel = item;
      this.modo = 0;
      this.dialog = true;
    },
    getResponsaveis() {
      this.$axios
        .$get(
          this.search == "" || this.search == null
            ? `responsaveis?_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}`
            : `responsaveis?_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}&q=${this.search}`
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
