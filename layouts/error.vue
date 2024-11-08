<template>
  <v-container class="d-block text-center">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
      <div align="center">
        <v-img src="/404.jpg" max-width="500px" title="img oops! not found" />
      </div>
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Voltar para Home </NuxtLink><br>
    <NuxtLink to="/login">Login </NuxtLink>
  </v-container>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "Não foi encontrado!",
      otherError: "Algo deu errado!",
    };
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
