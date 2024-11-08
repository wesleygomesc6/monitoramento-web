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
          @keyup.enter="getTecnologias"
          @click:clear="limpar"
        ></v-text-field>
        <v-btn
          color="primary"
          fab
          small
          title="Buscar"
          class="mx-2"
          v-if="search"
          @click="getTecnologias"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
        <v-btn color="primary" fab small title="Cadastrar" class="mx-2" @click="newItem"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-row>
      <CadastrarEditar
        :ativar="dialog"
        :classe="tecnologia"
        :modo="modo"
        :path="path"
        @fechar="fechar"
        @atualizar="getTecnologias"
      />
      <Excluir
        :ativar="dialogDelete"
        :classe="tecnologia"
        :path="path"
        @fechar="fechar"
        @atualizar="getTecnologias"
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
import Tecnologia from "@/models/inventario/Tecnologia";
export default {
  data() {
    return {
      items: [],
      titulo: "tecnologias",
      path: "sistemas",
      search: "",
      modo: -1,
      dialog: false,
      dialogDelete: false,
      tecnologia: new Tecnologia(),
      paginacao: {
        pageNumber: 0,
        totalPages: 0,
        pageSize: 10,
        totalElements: 0,
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "NOME", value: "nome" },
        { text: "OPÇÕES", value: "actions" },
      ],
      semResultados: "Nenhum item encontrado.",
    };
  },
  created() {
    this.getTecnologias();
  },
  methods: {
    filtrar(valor) {
      this.search = valor;
      this.getTecnologias();
    },
    fechar() {
      this.dialog = false;
      this.dialogDelete = false;
    },
    limpar() {
      this.search = "";
      this.getTecnologias();
    },
    paged(val) {
      this.paginacao.pageSize = val.pageSize;
      this.getTecnologias();
    },
    newItem() {
      this.tecnologia = new Tecnologia();
      this.modo = -1;
      this.dialog = true;
    },
    deleteItem(item) {
      this.tecnologia = item;
      this.dialogDelete = true;
    },
    editItem(item) {
      this.tecnologia = item;
      this.modo = 0;
      this.dialog = true;
    },
    getTecnologias() {
      this.$axios
        .$get(
          this.search == "" || this.search == null
            ? `${this.$config.inventarioURL}sistemas?page=${this.paginacao.pageNumber}&size=${this.paginacao.pageSize}`
            : `${this.$config.inventarioURL}sistemas?page=${this.paginacao.pageNumber}&size=${this.paginacao.pageSize}&nome=${this.search}`
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
