<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" clipped app>
      <v-list nav dense>
        <template v-for="menu in menusDynatrace">
          <v-list-item
            v-for="(item, index) in menu.menu"
            :key="index"
            :to="item.to"
            link
            active-class="blue--text text--darken-4"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.name" class="text-subtitle-1" />
            </v-list-item-content>
          </v-list-item>

          <v-list-group :key="menu.name" :prepend-icon="menu.icon">
            <template #activator>
              <v-list-item-title>{{ menu.name }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="(submenu, index) in menu.submenus"
              :key="index"
              :to="submenu.to"
              link
            >
              <v-list-item-action v-if="submenu.icon">
                <v-icon small>{{ submenu.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="submenu.name" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
      <v-list nav dense>
        <template v-for="menu in menusInventario">
          <v-list-item
            v-for="(item, index) in menu.menu"
            :key="index"
            :to="item.to"
            link
            active-class="blue--text text--darken-4"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.name" class="text-subtitle-1" />
            </v-list-item-content>
          </v-list-item>

          <v-list-group :key="menu.name" :prepend-icon="menu.icon">
            <template #activator>
              <v-list-item-title>{{ menu.name }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="(submenu, index) in menu.submenus"
              :key="index"
              :to="submenu.to"
              link
            >
              <v-list-item-action v-if="submenu.icon">
                <v-icon small>{{ submenu.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="submenu.name" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left color="primary" dark app class="d-block">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant" v-if="drawer">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <h1>LOGO</h1>
      <v-spacer />
      <v-btn color="#fff" outlined @click.prevent="logout">
        <span class="d-none d-sm-flex"> SAIR </span>
        <v-icon small> mdi-exit-to-app </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <client-only>
          <vue-snotify></vue-snotify>
        </client-only>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer>
      <v-card-text class="pa-0 text-center"
        >&copy; {{ new Date().getFullYear() }} - Wesley Carvalho</v-card-text
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      loading: false,
      drawer: true,
      menusInventario: [
        {
          name: "Inventário",
          icon: "mdi-lock-check-outline",
          menu: [
            {
              name: "Host",
              to: "/inventario/hosts",
              icon: "mdi-monitor-dashboard",
            },
          ],
          submenus: [
            {
              name: "Ambientes",
              to: "/inventario/ambientes",
              icon: "mdi-developer-board",
            },
            {
              name: "Cargos",
              to: "/inventario/cargos",
              icon: "mdi-badge-account-alert",
            },
            {
              name: "Clusters",
              to: "/inventario/clusters",
              icon: "mdi-server-network",
            },
            {
              name: "Gerências",
              to: "/inventario/gerencias",
              icon: "mdi-badge-account-horizontal-outline",
            },
            {
              name: "Grupos",
              to: "/inventario/grupos",
              icon: "mdi-group",
            },
            {
              name: "Pessoas",
              to: "/inventario/pessoas",
              icon: "mdi-account-group",
            },
            {
              name: "Responsaveis",
              to: "/inventario/responsaveis",
              icon: "mdi-badge-account",
            },
            {
              name: "Tercnologias",
              to: "/inventario/tecnologias",
              icon: "mdi-cellphone-link",
            },
            {
              name: "Serviços",
              to: "/inventario/servicos",
              icon: "mdi-inbox-multiple",
            },
            {
              name: "Contratação",
              to: "/inventario/tipos-contratacao",
              icon: "mdi-file-document-edit",
            },
            {
              name: "Tipos Vm",
              to: "/inventario/tiposvm",
              icon: "mdi-monitor-multiple",
            },
          ],
        },
      ],
      menusDynatrace: [
        {
          name: "Dynatrace",
          icon: "mdi-alert-circle-outline",
          menu: [
            {
              name: "Problemas",
              to: "/",
              icon: "mdi-alert-circle",
            },
          ],
          submenus: [
            {
              name: "Comentários",
              to: "/problemas/comentarios",
              icon: "mdi-comment-text",
            },
            {
              name: "Entities",
              to: "/problemas/entities",
              icon: "mdi-card-multiple",
            },
          ],
        },
      ],
      miniVariant: false,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$auth.$storage.removeLocalStorage('user');
    },
  },
};
</script>
