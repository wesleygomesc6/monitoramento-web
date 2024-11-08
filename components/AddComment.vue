<template>
  <v-form @submit.prevent="save" ref="form">
    <h3>Adicionar Comentário</h3>
    <v-row class="d-flex ma-2" no-gutters>
      <v-col cols="12">
        <v-textarea
          class="mx-1"
          outlined
          dense
          rows="4"
          auto-grow
          label="Comentário"
          v-model="comentario.content"
        ></v-textarea></v-col
      ><v-col cols="12">
        <div class="d-flex justify-end">
          <v-btn color="warning" class="mx-1" @click.prevent="cancelar">
            FECHAR <v-icon small class="ml-1"> mdi-close </v-icon></v-btn
          >
          <v-btn color="primary" class="mx-1" type="submit">
            SALVAR <v-icon small class="ml-1"> mdi-check </v-icon></v-btn
          >
        </div></v-col
      >
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "AddComment",
  props: ["idProblema"],
  data() {
    return {
      comentario: {
        authorName: this.$auth.$storage.getLocalStorage('user'),
        content: "",
        problem: {
          id: this.idProblema,
        },
      },
    };
  },
  methods: {
    save() {
      this.$axios
        .$post(`/comentarios`, this.comentario)
        .then((res) => {
          this.$emit("atualizar-comment", res);
          this.cancelar();
        })
        .catch((err) => this.$snotify.error(err, "Error."));
    },
    cancelar() {
      this.$emit("fechar-comment");
      this.$refs.form.reset();
    },
  },
};
</script>
