<template>
  <v-col cols="12">
    <v-row align="center" class="d-block">
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
          @keyup.enter="$emit('buscar', search)"
          @click:clear="$emit('limpar')"
        ></v-text-field>
        <v-btn
          color="primary"
          fab
          small
          title="Buscar"
          class="mx-1"
          v-if="search"
          @click="$emit('buscar', search)"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
      </v-row>
      <v-data-table
      :search="search"
        :items="items"
        :headers="headers"
        class="elevation-1"
        hide-default-footer
        :items-per-page="qtdPorPagina"
        :no-result-text="semResultados"
        :no-data-text="semResultados"
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
        <template v-slot:footer> <slot name="footerTable" /> </template
      ></v-data-table>
      <CadastrarEditarDyna
        :path="path"
        :item="comentario"
        :modo="modo"
        :ativar="dialog"
        @fechar="dialog = false"
      />
      <ExcluirDyna
        :path="path"
        :item="comentario"
        :ativar="dialogDelete"
        @fechar="dialogDelete = false"
      /> </v-row
  ></v-col>
</template>

<script>
import Comentario from "@/models/dynatrace/Comentario";
export default {
  props: ["items", "headers", "titulo", "qtdPorPagina", "path"],
  data() {
    return {
      semResultados: "Nenhum item encontrado.",
      search: "",
      modo: -1, // se modo igual a (-1) então salva
      comentario: new Comentario(),
      dialog: false,
      dialogDelete: false,
    };
  },
  methods: {
    deleteItem(item) {
      this.comentario = item;
      this.dialogDelete = true;
    },
    editItem(item) {
      this.modo = 0;
      this.comentario = item;
      this.dialog = true;
    },
  },
};
</script>
