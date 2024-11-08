<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-skeleton-loader
        :loading="loading"
        type="table-heading, list-item-avatar-three-line, image, article, table-tfoot"
      >
        <v-row class="mx-2 my-2" align="center">
          <h2 class="text-h6 text-sm-h5 mb-2 mb-sm-0">
            {{ tituloTabela.toUpperCase() }}
          </h2>
          <v-spacer />
          <v-text-field
            v-model="search"
            label="O que está procurando?"
            :append-icon="`mdi-${search ? '' : 'magnify'} `"
            clearable
            dense
            @keyup.enter="buscarDados"
            @click:clear="limpar"
          ></v-text-field>
          <v-btn
            color="primary"
            fab
            small
            title="Buscar"
            class="mx-1"
            v-if="search"
            @click="buscarDados"
            ><v-icon>mdi-magnify</v-icon></v-btn
          >
        </v-row>

        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          item-key="id"
          show-expand
          single-expand
          :no-data-text="semResultados"
          :no-results-text="semResultados"
          hide-default-footer
          :items-per-page="paginacao.pageSize"
        >
          <template v-slot:item.grupos="{ item }">
            <span v-for="grupoItem in item.grupos" :key="grupoItem.nome">
              {{ grupoItem.nome }}
            </span>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-row class="ma-2">
                <v-col cols="6"
                  ><th>AMBIENTES</th>
                  <ul v-for="ambiente in item.ambientes">
                    <li>{{ ambiente.nome }}</li>
                  </ul>
                </v-col>
                <v-col cols="6">
                  <th>RESPONSÁVEIS</th>
                  <ul v-for="responsavel in item.responsaveis">
                    <li>{{ responsavel.nome }}</li>
                  </ul>
                </v-col>
              </v-row>
              <v-row class="ma-2">
                <v-col cols="6">
                  <th>TECNOLOGIA</th>
                  <ul v-for="servico in item.servicos">
                    <li>{{ servico.nome }}</li>
                  </ul>
                </v-col>
                <v-col cols="6">
                  <th>SERVIÇOS</th>
                  <ol class="sistemas">
                    <li v-for="sistema in item.sistemas">{{ sistema.nome }}</li>
                  </ol>
                </v-col>
              </v-row>
            </td>
          </template>
          <template v-slot:body.append="{ headers }">
            <tr>
              <td
                :colspan="headers.length"
                class="text-right font-weight-medium text-body-2"
              >
                <Paginacao :paginacao="paginacao" @paginacao="paged" />
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "MaquinasVirtuais",
  data() {
    return {
      tituloTabela: "HOSTS",
      search: "",
      loading: false,
      semResultados: "Nenhum resultado encontrado",
      paginacao: {
        pageNumber: 0,
        totalPages: 0,
        pageSize: 10,
        totalElements: 0,
      },
      items: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "NOME", value: "nome" },
        { text: "HOSTNAME", value: "hostname" },
        { text: "IP", value: "ip_address" },
        { text: "TIPO VM", value: "tipoVm.nome" },
        { text: "CLUSTER", value: "cluster.nome" },
        { text: "STATUS", value: "status.nome" },
        { text: "GRUPO", value: "grupos" },
      ],
    };
  },
  mounted() {
    this.buscarDados();
  },

  methods: {
    limpar() {
      this.search = "";
      this.paginacao.pageNumber = 0;
      this.paginacao.pageSize = 10;
      this.buscarDados();
    },
    paged(val) {
      this.paginacao = val;
      this.buscarDados();
    },
    buscarDados() {
      this.loading = true;
      this.$axios
        .$get(
          this.search
            ? `${this.$config.inventarioURL}vms?filtro=${this.search}&sort=id`
            : `${this.$config.inventarioURL}vms?page=${this.paginacao.pageNumber}&size=${this.paginacao.pageSize}&sort=id`
        )
        .then((res) => {
          this.items = res.content;
          this.paginacao = res.pageable;
          this.paginacao.totalPages = res.totalPages;
          this.paginacao.totalElements = res.totalElements;
        })
        .catch((err) => this.$snotify.error(err, "Algo deu errado!"));
      this.loading = false;
    },
  },
};
</script>
<style>
ol.sistemas > li {
  float: left;
  width: 30%;
  min-width: 12rem;
}
</style>
