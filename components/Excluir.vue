<template>
  <v-dialog v-model="ativar" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 py-5"
        >Tem certeza que deseja excluir o item?</v-card-title
      >
      <v-card-text
        v-for="(item, index) in classe"
        :key="index"
        class="text-h6 text--primary font-weight-regular"
      >
        <template v-if="index !== 'pessoa'">
          <span class="font-weight-bold"
            >{{ index[0].toUpperCase() + index.slice(1) }}:</span
          >
          {{ item }}</template
        >
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" text @click="$emit('fechar')">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["classe", "ativar", "path"],

  methods: {
    deleteItemConfirm() {
      this.$axios
        .$delete(`${this.$config.inventarioURL}${this.path}/${this.classe.id}`)
        .then(() => {
          this.$snotify.success("", "Excluido com sucesso!");
          this.$emit("atualizar");
        })
        .catch((err) => {
          this.$snotify.error(err.request.response, "Não pode ser Exluido!");
        });
      this.$emit("fechar");
    },
  },
};
</script>
