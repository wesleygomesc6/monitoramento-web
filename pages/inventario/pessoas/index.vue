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
          @keyup.enter="getPessoas"
          @click:clear="limpar"
        ></v-text-field>
        <v-btn
          color="primary"
          fab
          small
          title="Buscar"
          class="mx-2"
          v-if="search"
          @click="getPessoas"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
        <v-btn color="primary" fab small title="Cadastrar" class="mx-2" @click="newItem"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-row>
      <CadastrarEditar
        :ativar="dialog"
        :classe="pessoa"
        :modo="modo"
        :path="path"
        @fechar="fechar"
        @atualizar="getPessoas"
      />
      <Excluir
        :ativar="dialogDelete"
        :classe="pessoa"
        :path="path"
        @fechar="fechar"
        @atualizar="getPessoas"
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
import Pessoa from "@/models/inventario/Pessoa";
export default {
  data() {
    return {
      items: [],
      titulo: "pessoas",
      path: "pessoas",
      search: "",
      modo: -1,
      dialog: false,
      dialogDelete: false,
      pessoa: new Pessoa(),
      paginacao: {
        pageNumber: 0,
        totalPages: 0,
        pageSize: 10,
        totalElements: 0,
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "NOME", value: "nome" },
        { text: "E-MAIL", value: "email" },
        { text: "OPÇÕES", value: "actions" },
      ],
      semResultados: "Nenhum item encontrado.",
    };
  },
  created() {
    this.getPessoas();
  },
  methods: {
    filtrar(valor) {
      this.search = valor;
      this.getPessoas();
    },
    fechar() {
      this.dialog = false;
      this.dialogDelete = false;
    },
    limpar() {
      this.search = "";
      this.getPessoas();
    },
    paged(val) {
      this.paginacao.pageSize = val.pageSize;
      this.getPessoas();
    },
    newItem() {
      this.pessoa = new Pessoa();
      this.modo = -1;
      this.dialog = true;
    },
    deleteItem(item) {
      this.pessoa = item;
      this.dialogDelete = true;
    },
    editItem(item) {
      this.pessoa = item;
      this.modo = 0;
      this.dialog = true;
    },
    getPessoas() {
      this.$axios
        .$get(
          this.search == "" || this.search == null
            ? `${this.$config.inventarioURL}pessoas?page=${this.paginacao.pageNumber}&size=${this.paginacao.pageSize}`
            : `${this.$config.inventarioURL}pessoas?page=${this.paginacao.pageNumber}&size=${this.paginacao.pageSize}&nome=${this.search}`
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
