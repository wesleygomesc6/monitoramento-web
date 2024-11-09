<template>
  <div>
    <!-- <LoadingPage :loading="loading" /> -->
    <v-row justify="center" align="center" class="mt-12">
      <v-card min-width="250" width="500" height="400" class="elevation-3 ma-4">
        <v-form ref="form" @submit.prevent="efetuarLogin" class="ma-4 pt-5">
          <h3 class="my-5">LOGIN</h3>
          <v-text-field
            v-model="usuario.email"
            :rules="usuario.emailRules"
            label="Usuário"
          ></v-text-field>
          <v-text-field
            class="pb-10"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="usuario.senha"
            :rules="usuario.senhaRules"
            label="Senha"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
          ></v-text-field>

          <div class="mt-10 justify-space-between d-flex">
            <v-btn color="warning" @click.prevent="reset">
              LIMPAR <v-icon small class="ml-1"> mdi-eraser </v-icon></v-btn
            >
            <v-btn color="primary" type="submit" :loading="loading">
              ENTRAR <v-icon small class="ml-1"> mdi-login </v-icon></v-btn
            >
          </div>
        </v-form>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "login",
  name: "login",
  data() {
    return {
      show: false,
      loading: false,
      usuario: {
        email: "",
        emailRules: [(v) => !!v || "Usuário é obrigatório"],
        senha: "",
        senhaRules: [(v) => !!v || "Senha é obrigatória"],
      },
    };
  },
  methods: {
    async efetuarLogin() {
      this.loading = true;
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.usuario.email,
            senha: this.usuario.senha,
          },
        })
        .then(() => this.$auth.$storage.setLocalStorage('user', this.usuario.email))
        this.$router.push({ path: "/" });
      } catch (err) {
        if (err.request.status === 403) {
          this.$snotify.error(err, "Recurso não autorizado!");
        } else if (err.request.status === 400) {
          this.$snotify.error(err, "Dados incorretos. Tente novamente!");
        } else if (err.request.status >= 500) {
          this.$snotify.error(err, "Erro interno!");
        } else {
          this.$snotify.error(err, "Erro!");
        }
      }
      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
