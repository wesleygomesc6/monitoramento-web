<template>
  <v-col cols="12">
    <v-row class="mx-2 my-2" align="center">
      <h2 class="text-h6 text-sm-h5 mb-2 mb-sm-0">{{ titulo.toUpperCase() }}</h2>
      <v-spacer />
      <v-text-field
        v-model="valorFiltro"
        label="O que está procurando?"
        :append-icon="`mdi-${search ? '' : 'magnify'} `"
        clearable
        dense
        @keyup.enter="$emit('search', valorFiltro)"
        @click:clear="$emit('limpar-filtro')"
      ></v-text-field>
      <v-btn
        color="primary"
        fab
        small
        title="Buscar"
        class="mx-1"
        v-if="valorFiltro"
        @click="$emit('search', valorFiltro)"
        ><v-icon>mdi-magnify</v-icon></v-btn
      >
    </v-row>
    <slot name="selecData" />
    <Tabs
      :tabValue="tabValue"
      @getAll="todos"
      @getPendentes="pendentes"
      @getValidados="validados" />

    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      single-expand
      show-expand
      hide-default-footer
      :page.sync="paginacao.pageNumber"
      :items-per-page.sync="paginacao.pageSize"
      :no-result-text="semResultados"
      :no-data-text="semResultados"
    >
      <template v-slot:item.displayId="{ item }">
        <a
          class="text-decoration-none"
          :href="`${$config.dynaURL}${item.problemId}`"
          target="_black"
          title="Clique para ir ao dynatrace"
          >{{ item.displayId }}</a
        >
      </template>
      <template v-slot:item.startTime="{ item }">
        {{ item.startTime.split("T")[0] }} {{ item.startTime.split("T")[1].slice(0, 5) }}
      </template>
      <template v-slot:item.endTime="{ item }">
        <template v-if="item.status != 'OPEN'">
          {{ item.endTime.split("T")[0] }} {{ item.endTime.split("T")[1].slice(0, 5) }}
        </template>
        <template v-else> processando... </template>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row class="ma-2 d-flex">
            <v-col cols="12" sm="4"
              ><th>PROBLEM ID:</th>
              <span>{{ item.problemId }}</span>
            </v-col>

            <v-col cols="12" sm="4"
              ><th>DURAÇÃO:</th>
              <span v-if="item.status == 'OPEN'">Sem duração definida</span>
              <span v-else>{{ item.duracao }}</span>
            </v-col>

            <v-col cols="12" sm="4"
              ><th>STATUS:</th>
              <span>{{ item.status }}</span>
            </v-col>

            <v-col cols="12" sm="4">
              <th>NÍVEIS DE IMPACTO:</th>
              <ul v-for="impact in item.impactLevels">
                <li>{{ impact.name }}</li>
              </ul>
            </v-col>
            <v-col cols="12" sm="8"
              ><th>CAUSA RAIZ:</th>
              <template v-if="item.rootCauseEntity != null">
                <template v-for="(value, i) in item.rootCauseEntity">
                  <div class="d-flex mb-1">
                    <span class="font-weight-medium">{{ i }}</span>
                    <span v-if="i != 'entityType'"> : {{ value }} </span>
                    <span v-else-if="value != null"> : {{ value.name }} </span>
                  </div>
                </template></template
              >
            </v-col>
          </v-row>
          <v-divider />
          <v-row justify="center" class="ma-2 d-flex"
            ><v-col cols="12"
              ><th>AFFECTED ENTITIES:</th>
              <v-row class="d-flex ma-1">
                <template v-for="(v, i) in item.affectedEntities">
                  <v-col
                    cols="12"
                    :sm="item.affectedEntities.length == 1 ? '12' : '6'"
                    lg="4"
                    class="pa-1"
                  >
                    <template v-for="(value, index) in v">
                      <div class="d-block">
                        <span class="font-weight-medium">{{ index }}</span>
                        <span v-if="index != 'entityType'"> : {{ value }} </span>
                        <span v-else> : {{ value.name }} </span>
                      </div> </template
                    ><v-divider v-if="item.affectedEntities.length > 2"
                  /></v-col> </template
              ></v-row>
            </v-col>
          </v-row>
          <v-divider />
          <v-row justify="center" class="ma-2 d-flex"
            ><v-col cols="12"
              ><th>IMPACTED ENTITIES:</th>
              <v-row class="d-flex ma-1">
                <template v-for="(v, i) in item.impactedEntities">
                  <v-col
                    cols="12"
                    :sm="item.impactedEntities.length == 1 ? '12' : '6'"
                    lg="4"
                    class="pa-1"
                  >
                    <template v-for="(value, index) in v">
                      <div class="d-block">
                        <span class="font-weight-medium">{{ index }}</span>
                        <span v-if="index != 'entityType'"> : {{ value }} </span>
                        <span v-else> : {{ value.name }} </span>
                      </div> </template
                    ><v-divider v-if="item.impactedEntities.length > 2"
                  /></v-col> </template
              ></v-row>
            </v-col>
          </v-row>
          <v-divider />

          <v-row justify="center" class="ma-2 d-flex"
            ><v-col cols="12"
              ><th>EVIDENCIAS:</th>
              <v-row class="d-flex ma-1">
                <template v-for="(v, i) in item.evidences">
                  <v-col
                    cols="12"
                    :sm="item.evidences.length == 1 ? '12' : '6'"
                    class="pa-1"
                  >
                    <template v-for="(value, index) in v">
                      <div class="d-block">
                        <span class="font-weight-medium">{{ index }}</span>
                        <span v-if="index != 'entityType'"> : {{ value }} </span>
                        <template v-else>: {{ value.name }}</template>
                      </div> </template
                    ><v-divider v-if="item.evidences.length > 2"
                  /></v-col> </template
              ></v-row>
            </v-col>
          </v-row>
          <v-divider />
          <v-row justify="center" class="ma-2 d-flex"
            ><CommentProblem :idProblema="item.id" :problemId="item.problemId"
          /></v-row>
        </td>
      </template>

      <template v-slot:item.validated="{ item, index }">
        <v-icon
          :color="`${item.validated != true ? 'error' : 'primary'}`"
          :title="`Clique para ${item.validated != true ? 'validar' : 'desvalidar'}`"
          @click="validarOrDesvalidarItem(item, index)"
          >mdi-{{ item.validated != true ? "circle-outline" : "check-bold" }}
        </v-icon>
      </template>
      <template v-slot:footer>
        <slot name="footerTable" />
      </template> </v-data-table
    ><ValidarDesvalidarProblema
      :problema="problema"
      :indexProblema="index"
      :ativarDialogo="ativarDialogo"
      @fechar="ativarDialogo = false"
      @index-remove="$emit('atualizar-items')"
  /></v-col>
</template>
<script>
import Problema from "@/models/dynatrace/Problema";
export default {
  name: "TabelaProblemas",
  props: ["titulo", "paginacao", "items", "headers", "search"],
  data() {
    return {
      semResultados: "Nenhum problema encontrado.",
      valorFiltro: "",
      tabValue: 0,
      ativarDialogo: false,
      start: [],
      end: [],
      problema: new Problema(),
      index: 0,
    };
  },
  watch: {
    search(v) {
      this.valorFiltro = v;
    },
  },
  methods: {
    todos() {
      this.tabValue = 0;
      this.$emit("get-all", this.tabValue);
    },
    pendentes(valid) {
      this.tabValue = 1;
      this.$emit("get-pendentes", valid, 0, this.tabValue);
    },
    validados(valid) {
      this.tabValue = 2;
      this.$emit("get-validados", valid, 0, this.tabValue);
    },
    validarOrDesvalidarItem(item, index) {
      this.problema = item;
      this.index = index;
      this.ativarDialogo = true;
    },
  },
};
</script>
