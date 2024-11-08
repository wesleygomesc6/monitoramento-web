<template>
  <v-dialog v-model="ativar" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5 my-4"> {{ formTitle }} </span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row class="d-flex">
            <template v-for="(value, index) in item"
              ><v-col cols="12" v-if="index !== 'id'" class="py-1">
                <v-text-field
                  v-if="index != 'entityType'"
                  :key="item.key"
                  v-model="item[index]"
                  outlined
                  dense
                  :label="index"
                >
                </v-text-field>
                <v-autocomplete
                  @click="getTypes"
                  v-else
                  v-model="item[index]"
                  :items="types"
                  item-text="name"
                  label="Tipo"
                  hide-selected
                  item-value="name"
                  outlined
                  return-object
                  dense
                >
                </v-autocomplete> </v-col></template></v-row
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
  props: ["modo", "item", "ativar", "path"],
  data() {
    return {
      types: [],
    };
  },
  watch: {
    item(v) {
      this.types.push(v.entityType);
    },
  },
  computed: {
    formTitle() {
      return this.modo === -1 ? "CADASTRAR ITEM" : "EDITAR ITEM";
    },
  },
  methods: {
    getTypes() {
      this.$axios
        .$get(`/entity-types`)
        .then((res) => {
          res.content.forEach((element) => {
            this.types.push(element);
          });
        })
        .catch((err) => console.log(err));
    },
    salvar() {
      if (this.modo === -1) {
        this.$axios
          .$post(`${this.path}/`, this.item)
          .then(() => {
            this.$snotify.success("", "Cadastrado com sucesso!");
          })
          .catch((err) => {
            this.$snotify.error(err.request.response, "Erro!");
          });
        this.$emit("fechar");
      } else {
        this.$axios
          .$put(`${this.path}/${this.item.id}`, this.item)
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
