<template>
  <v-dialog v-model="ativar" max-width="800px" persistent>
    <v-card>
      <v-card-title class="text-h5 py-5"
        >Tem certeza que deseja excluir o item?</v-card-title
      >
      <v-card-text
        v-for="(value, index) in item"
        :key="index"
        class="text-h6 text--primary font-weight-regular"
      >
        <template>
          <span class="font-weight-bold"
            >{{ index[0].toUpperCase() + index.slice(1) }}:</span
          >
          {{ value }}</template
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
  props: ["item", "ativar", 'path'],
  methods: {
    deleteItemConfirm() {
      this.$axios
        .$delete(`${this.path}/${this.item.id}`)
        .then(() => {
          this.$snotify.success("", "Excluido com sucesso!");
        })
        .catch((err) => {
          this.$snotify.error(err.request.response, "Não pode ser Exluido!");
        });
        this.$emit('fechar')
    },
  },
};
</script>
