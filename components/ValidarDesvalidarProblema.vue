<template>
  <v-dialog v-model="ativarDialogo" max-width="1000px" persistent>
    <v-card class="pa-2">
      <v-row align="center" justify="center" class="ma-1" no-gutters>
        <v-col cols="10" sm="11" class="pa-0">
          <v-card-title class="pa-1"> {{ tituloCard.toUpperCase() }}</v-card-title></v-col
        >
        <v-col cols="2" sm="1" class="pa-0 text-right"
          ><v-icon
            large
            color="error"
            title="fechar"
            @click="$emit('fechar'), (rootCauses = [])"
            >mdi-close</v-icon
          ></v-col
        >
      </v-row>
      <v-row align="center" justify="end" class="ma-1">
        <v-card-text>
          <v-form ref="form">
            <v-row class="d-flex pa-2" align="center">
              <v-col cols="12" sm="4" class="black--text pa-1">
                <span class="font-weight-bold d-block">Problem Id:</span>
                <span>{{ problema.problemId }}</span> </v-col
              ><v-col cols="12" sm="3" class="black--text pa-1">
                <span class="font-weight-bold d-block">Display Id:</span>
                <span>{{ problema.displayId }}</span></v-col
              >
              <v-col cols="12" sm="3" class="black--text pa-1">
                <span class="font-weight-bold d-block">Severidade:</span>
                <span>{{ problema.severityLevel }}</span> </v-col
              ><v-col cols="12" sm="2" class="black--text pa-1">
                <span class="font-weight-bold d-block">Duração:</span>
                <span>{{ problema.duracao }}</span></v-col
              >
              <v-col cols="12" sm="4" class="black--text pa-1">
                <span class="font-weight-bold d-block">Titulo:</span>
                <span>{{ problema.title }}</span> </v-col
              ><v-col cols="12" sm="3" class="black--text pa-1">
                <span class="font-weight-bold d-block">Status:</span>
                <span>{{ problema.status }}</span></v-col
              >
              <v-col cols="12" sm="3" class="black--text pa-1">
                <span class="font-weight-bold d-block">Impacto (dynatrace):</span>
                <span>{{ problema.impactLevel }}</span></v-col
              >
            </v-row>
            <v-divider class="my-4" />
            <v-alert
              v-if="alertNotExist == true && searchRootCause != null"
              border="left"
              colored-border
              max-width="50%"
              dense
              type="warning"
              class="text-caption orange--text my-0 py-0"
            >
              Causa raiz não encontrada. Será adicionada ao banco.
            </v-alert>
            <v-row class="d-flex mt-2" align="center" no-gutters>
              <v-col cols="12" sm="6" class="pa-0">
                <v-autocomplete
                  v-model="problema.rootCauseEntity"
                  :search-input.sync="searchRootCause"
                  :rules="rootCauseValidated"
                  :items="rootCauses"
                  small-chips
                  clearable
                  hide-selected
                  item-text="name"
                  item-value="id"
                  label="Caisa Raiz *"
                  placeholder="Digite a causa raiz"
                  return-object
                  outlined
                  no-data-text="Nenhuma causa raiz encotrada."
                  dense
                  @click:clear="(rootCauses = []), (alertNotExist = false)"
                >
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip
                      small
                      v-bind="attr"
                      :input-value="selected"
                      :color="item.entityId != null ? 'primary' : 'orange lighten-1'"
                      class="white--text text-body-2"
                      v-on="on"
                    >
                      <span v-text="item.name || item"></span>
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" sm="6" class="d-flex pa-0">
                <v-autocomplete
                  class="ml-2"
                  v-model="problema.affectedEntities"
                  :items="afetadas"
                  :search-input.sync="getAfetadas"
                  item-text="name"
                  label="Afetadas"
                  hide-selected
                  multiple
                  item-value="id"
                  small-chips
                  deletable-chips
                  outlined
                  return-object
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="pa-0">
                <v-autocomplete
                  v-model="problema.impactedEntities"
                  :items="impactadas"
                  :search-input.sync="getImpactadas"
                  item-text="name"
                  label="Impactadas"
                  hide-selected
                  item-color="primary"
                  multiple
                  item-value="id"
                  small-chips
                  deletable-chips
                  outlined
                  return-object
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="pa-0">
                <v-row class="ma-1 d-block">
                  <span class="black--text ml-2 text-subtitle-1">Níveis de Impacto:</span>
                  <v-row class="ma-1">
                    <template v-for="(value, i) in levelsImpact">
                      <v-checkbox
                        v-if="value.name != 'SERVICE'"
                        class="mx-1 my-0"
                        v-model="problema.impactLevels"
                        :key="levelsImpact.key"
                        :label="value.name"
                        :value="value"
                      ></v-checkbox>
                    </template>
                  </v-row>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="pa-0">
                <v-autocomplete
                  readonly
                  v-model="problema.evidences"
                  :items="problema.evidences"
                  item-text="name"
                  label="Evidencias"
                  hide-selected
                  multiple
                  item-value="entityId"
                  small-chips
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="pa-0">
                <v-autocomplete
                  class="ml-1"
                  v-model="problema.solver"
                  :items="solvers"
                  :search-input.sync="searchSolver"
                  item-text="solvers"
                  label="Solucionador"
                  hide-selected
                  no-data-text="Nenhum nome encotrado"
                  item-value="solvers"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" class="pa-0">
                <CommentProblem
                  :idProblema="problema.id"
                  :problemId="problema.problemId"
                />
              </v-col>
              <v-row cols="12" class="d-block ma-2 justify-end align-center">
                <h4 class="text--primary">Este problema realmente impactou algo ?</h4>
                <v-switch class="align-center" v-model="impactou" label="Sim"></v-switch>
              </v-row>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="cancelar"> Cancelar </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="validar(problema)"
            v-if="problema.validated == false"
          >
            validar
          </v-btn>
          <v-btn color="blue darken-1" text @click="desvalidar(problema)" v-else>
            desvalidar
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import Entitie from "@/models/dynatrace/Entitie";
export default {
  props: ["problema", "ativarDialogo", "indexProblema"],
  data() {
    return {
      searchRootCause: "",
      search: "",
      alertNotExist: false,
      Entitie: new Entitie(),
      rootCauseValidated: [(v) => !!v || "Causa Raiz é obrigatória."],
      rootCauses: [],
      impactou: false,
      levelsImpact: [],
      getAfetadas: "",
      afetadas: [],
      getImpactadas: "",
      impactadas: [],
      searchSolver: "",
      solvers: [],
      entityTypes: [],
    };
  },
  computed: {
    tituloCard() {
      return this.problema.validated != true ? "validar problema" : "desvalidar problema";
    },
  },
  created() {
    this.$axios
      .$get(`/impact-levels`)
      .then((res) => (this.levelsImpact = res.content))
      .catch((err) => console.log(err));
  },
  watch: {
    getAfetadas(val) {
      if (val != null) {
        this.getEntities(val, 0);
      }
    },
    getImpactadas(v) {
      if (v != null) {
        this.getEntities(v, 1);
      }
    },
    searchRootCause(val) {
      this.getRootCause(val);
    },
    searchSolver(v, old) {
      let i = this.solvers.indexOf(old);
      this.solvers.splice(i, 1);
      if (v != null || v != "") {
        this.solvers.push(v);
      }
      this.getSolvers(v);
    },
    problema(valor) {
      if (valor.solver != null) {
        this.solvers.push(valor.solver);
      }
      if (valor.rootCauseEntity != null) {
        this.rootCauses.push(valor.rootCauseEntity);
      }
      if (valor.affectedEntities != null) {
        valor.affectedEntities.forEach((element) => {
          this.afetadas.push(element);
        });
      }
      if (valor.impactedEntities != null) {
        valor.impactedEntities.forEach((element) => {
          this.impactadas.push(element);
        });
      }
      if (valor.businessImpact == "NAO" || valor.businessImpact == null) {
        this.impactou = false;
      } else {
        this.impactou = true;
      }
    },
  },
  methods: {
    getEntities(valor, rotulo) {
      // 0 => afetadas ; 1 => impactadas
      this.$axios
        .$get(`/entities?filtro=${valor}`)
        .then((res) => {
          if (rotulo == 0) {
            res.content.forEach((element) => {
              this.afetadas.push(element);
            });
          } else if (rotulo == 1) {
            res.content.forEach((element) => {
              this.impactadas.push(element);
            });
          }
        })
        .catch((err) => this.$snotify.error(err, "Erro."));
    },
    getTypes() {
      if (this.entityTypes.length == 0) {
        this.$axios.$get("entity-types").then((res) =>
          res.content.forEach((element) => {
            if (element.name != "DATABASE") {
              this.entityTypes.push(element.name);
            }
          })
        );
      }
    },
    getRootCause(valor) {
      if (valor != null) {
        this.$axios
          .$get(`/entities?filtro=${valor}`)
          .then((res) => {
            if (res.content.length > 0) {
              this.rootCauses = res.content;
              this.alertNotExist = false;
            } else {
              this.getTypes();
              this.entityTypes.forEach((tipo) => {
                this.$api
                  .get(
                    `${this.$config.urlv2}entities?entitySelector=type("${tipo}"),entityName.startsWith("${valor}")&${this.$config.token}`
                  )
                  .then((res) => {
                    if (res.data.entities.length > 0) {
                      res.data.entities.forEach((element) => {
                        if (element != null) {
                          let entitie = {};
                          entitie.name = element.displayName;
                          entitie.entityId = element.entityId;
                          entitie.entityType = {
                            name: element.type,
                          };
                          this.rootCauses.push(entitie);
                        }
                      });
                      this.alertNotExist = false;
                    }
                  })
                  .catch((error) => {
                    this.$snotify.error(err, "Erro.");
                  });
              });
              const addNotExist = { name: this.searchRootCause };
              if (this.rootCauses.find((x) => x.name != addNotExist.name)) {
                this.rootCauses.shift();
                this.rootCauses.push(addNotExist);
                this.alertNotExist = true;
              }
            }
          })
          .catch((err) => this.$snotify.error(err, "Erro."));
      }
    },
    getSolvers(valor) {
      if (valor != null) {
        this.$axios
          .$get(`/problemas/solvers?nome=${valor}`)
          .then((res) => {
            res.forEach((element) => {
              if (element != null && !this.solvers.includes(element)) {
                this.solvers.push(element);
              }
            });
          })
          .catch((err) => this.$snotify.error(err, "Erro."));
      }
    },

    validar(item) {
      if (item.rootCauseEntity != null) {
        item.validated = true;
        if (this.impactou != true) {
          item.businessImpact = "0";
        } else {
          item.businessImpact = "1";
        }
        if (item.rootCauseEntity.id == null) {
          this.$axios
            .$post("entities", item.rootCauseEntity)
            .then((res) => {
              this.$axios
                .$get(
                  `entities?filtro=${
                    item.rootCauseEntity.entityId
                      ? item.rootCauseEntity.entityId
                      : item.rootCauseEntity.name
                  }`
                )
                .then((res) => {
                  item.rootCauseEntity = res.content[0];
                  this.confirmValidateOrInvalidate(item);
                })
                .catch((err) => this.$snotify.error(err, "Erro."));
            })
            .catch((err) => this.$snotify.error(err, "Erro."));
        } else {
          this.confirmValidateOrInvalidate(item);
        }
      } else {
        this.$snotify.warning("Causa Raiz é obrigatória.", "");
      }
    },
    desvalidar(item) {
      item.validated = false;
      if (this.impactou != true) {
        item.businessImpact = "0";
      } else {
        item.businessImpact = "1";
      }
      this.confirmValidateOrInvalidate(item);
    },
    confirmValidateOrInvalidate(item) {
      this.$axios
        .$put(`/problemas/${item.id}`, item)
        .then(() => {
          this.$emit("index-remove", this.indexProblema);
          this.$snotify.success("Validado com sucesso");
        })
        .catch((err) => this.$snotify.error(err, "Erro"));
      this.cancelar();
    },
    cancelar() {
      this.rootCauses = [];
      this.alertNotExist = false;
      this.searchRootCause = null;
      this.$emit("fechar");
    },
  },
};
</script>
