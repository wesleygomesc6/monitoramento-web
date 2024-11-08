<template>
  <v-dialog v-model="ativar" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5 my-4"> {{ formTitle }} </span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row class="d-flex">
            <template v-for="(value, index) in classe"
              ><v-col cols="12" v-if="index !== 'id'" class="py-1">
                <v-text-field
                  :key="classe.key"
                  v-model="classe[index]"
                  outlined
                  dense
                  :label="index"
                >
                </v-text-field> </v-col></template></v-row
        ></v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$emit('fechar')"> Cancelar </v-btn>
        <v-btn color="blue darken-1" text @click="salvar"> Salvar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["ativar", "classe", "modo", "path"],
  computed: {
    //Responsavel por definir o titulo que sera atribuido ao v-card.
    formTitle() {
      return this.modo === -1 ? "CADASTRAR" : "EDITAR";
    },
  },

  methods: {
    //Método para salvar ou editar um registro dependendo do valor de edited(editedIndex que vem do componente pai), caso o edited recebido for igual a -1 que é o valor que
    //foi atribuido a ele no editedIndex (do componente pai) é feito uma requisição do tipo POST, se o edited for diferente de -1 a requisição é do tipo PUT.
    //O valor de editedIndex é calculado no (computed: formTitle), que é utilizado para calcular o titulo que sera atribuido ao v-card.
    salvar() {
      if (this.modo === -1) {
        this.$axios
          .$post(`${this.$config.inventarioURL}${this.path}`, this.classe)
          .then(() => {
            this.$snotify.success("", "Cadastrado com sucesso!");
            this.$emit("atualizar");
          })
          .catch((err) => {
            this.$snotify.error(err.request.response, "Erro!");
          });
        this.$emit("fechar");
      } else {
        this.$axios
          .$put(
            `${this.$config.inventarioURL}${this.path}/${this.classe.id}`,
            this.classe
          )
          .then(() => {
            this.$snotify.success("", "Editado com sucesso!");
          })
          .catch((err) => {
            this.$snotify.error(err, "Erro!");
          });
        this.$emit("fechar");
      }
    },
  },
};
</script>
