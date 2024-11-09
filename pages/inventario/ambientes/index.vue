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
          @keyup.enter="getAmbientes"
          @click:clear="limpar"
        ></v-text-field>
        <v-btn
          color="primary"
          fab
          small
          title="Buscar"
          class="mx-2"
          v-if="search"
          @click="getAmbientes"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
        <!-- <v-btn color="primary" fab small title="Cadastrar" class="mx-2" @click="newItem"
          ><v-icon>mdi-plus</v-icon></v-btn
        > -->
      </v-row>
      <CadastrarEditar
        :ativar="dialog"
        :classe="ambiente"
        :modo="modo"
        :path="path"
        @fechar="fechar"
        @atualizar="getAmbientes"
      />
      <Excluir
        :ativar="dialogDelete"
        :classe="ambiente"
        :path="path"
        @fechar="fechar"
        @atualizar="getAmbientes"
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
        <!-- <template v-slot:item.actions="{ item }">
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
        </template> -->
        <template v-slot:footer>
          <Paginacao :paginacao="paginacao" @paginacao="paged" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import Ambiente from "@/models/inventario/Ambiente";
export default {
  data() {
    return {
      items: [],
      titulo: "Ambientes",
      path: "ambientes",
      search: "",
      modo: -1,
      dialog: false,
      dialogDelete: false,
      ambiente: new Ambiente(),
      paginacao: {
        pageNumber: 1,
        totalPages: 5,
        pageSize: 10,
        totalElements: 50,
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "NOME", value: "nome" },
        //{ text: "OPÇÕES", value: "actions" },
      ],
      semResultados: "Nenhum item encontrado.",
    };
  },
  created() {
    this.getAmbientes();
  },
  methods: {
    filtrar(valor) {
      this.search = valor;
      this.getAmbientes();
    },
    fechar() {
      this.dialog = false;
      this.dialogDelete = false;
    },
    limpar() {
      this.search = "";
      this.getAmbientes();
    },
    paged(val) {
      this.paginacao.pageSize = val.pageSize;
      this.getAmbientes();
    },
    // newItem() {
    //   this.ambiente = new Ambiente();
    //   this.modo = -1;
    //   this.dialog = true;
    // },
    // deleteItem(item) {
    //   this.ambiente = item;
    //   this.dialogDelete = true;
    // },
    // editItem(item) {
    //   this.ambiente = item;
    //   this.modo = 0;
    //   this.dialog = true;
    // },
    getAmbientes() {
      this.$axios
        .$get(
          this.search == "" || this.search == null
            ? `ambientes?_page=${this.paginacao.pageNumber}&_limit=${this.paginacao.pageSize}`
            : `ambientes?_page=${this.paginacao.pageNumber}&limit=${this.paginacao.pageSize}&q=${this.search}`
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
