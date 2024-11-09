<template>
  <v-dialog v-model="ativar" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5 my-4"> {{ formTitle }} </span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row class="d-flex" justify="center">
            <v-col cols="12" sm="6" class="py-1">
              <v-text-field v-model="classe.nome" outlined dense label="Nome">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <v-text-field v-model="classe.atividades" outlined dense label="Atividades">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <v-text-field v-model="classe.gerente" outlined dense label="Gerente">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <v-text-field v-model="classe.status" outlined dense label="Status">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <v-autocomplete
                v-model="classe.cargo"
                @click="getCargo"
                outlined
                dense
                label="Cargo"
                :items="optionsCargos"
                return-object
                item-text="nome"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <v-autocomplete
                v-model="classe.gerencia"
                @click="getGerencia"
                outlined
                dense
                label="Gerência"
                :items="optionsGerencias"
                return-object
                item-text="nome"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <v-autocomplete
                v-model="classe.tipoContratacao"
                @click="getTiposContratacao"
                outlined
                dense
                label="Tipo Contratação"
                :items="optionsTiposContratacao"
                return-object
                item-text="nome"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" class="py-1">
              <v-autocomplete
                v-model="classe.pessoa"
                @click="getPessoas"
                outlined
                dense
                label="Pessoa"
                :items="optionsPessoas"
                return-object
                item-text="nome"
              >
              </v-autocomplete>
            </v-col> </v-row
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
  data() {
    return {
      optionsPessoas: [],
      optionsCargos: [],
      optionsGerencias: [],
      optionsTiposContratacao: [],
    };
  },
  computed: {
    formTitle() {
      return this.modo === -1 ? "NOVO" : "EDITAR";
    },
  },

  methods: {
    getCargo() {
      this.$axios
        .$get(`cargos`)
        .then((res) => (this.optionsCargos = res))
        .catch((err) => console.log(err));
    },
    getGerencia() {
      this.$axios
        .$get(`gerencias`)
        .then((res) => (this.optionsGerencias = res))
        .catch((err) => console.log(err));
    },
    getPessoas() {
      this.$axios
        .$get(`pessoas`)
        .then((res) => (this.optionsPessoas = res))
        .catch((err) => console.log(err));
    },
    getTiposContratacao() {
      this.$axios
        .$get(`tipos-contratacao`)
        .then((res) => (this.optionsTiposContratacao = res))
        .catch((err) => console.log(err));
    },
    //Método para salvar ou editar um registro dependendo do valor de edited(editedIndex que vem do componente pai), caso o edited recebido for igual a -1 que é o valor que
    //foi atribuido a ele no editedIndex (do componente pai) é feito uma requisição do tipo POST, se o edited for diferente de -1 a requisição é do tipo PUT.
    //O valor de editedIndex é calculado no (computed: formTitle), que é utilizado para calcular o titulo que sera atribuido ao v-card.
    salvar() {
      if (this.modo === -1) {
        this.$axios
          .$post(`${this.path}`, this.classe)
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
            `${this.path}/${this.classe.id}`,
            this.classe
          )
          .then(() => {
            this.$snotify.success("", "Editado com sucesso!");
            this.$emit("atualizar");
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
