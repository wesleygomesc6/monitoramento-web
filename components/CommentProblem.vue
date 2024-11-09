<template>
  <v-col cols="12">
    <v-row align="center" class="ma-1">
      <th class="text-h6 mr-2">Comentários</th>
      <v-icon
        @click="addComment = true"
        title="Novo Comentário"
        color="primary"
        class="mx-1"
      >
        mdi-plus-circle-outline</v-icon
      >
    </v-row>
    <v-row align="center">
      <v-col cols="12">
        <AddComment
          :idProblema="idProblema"
          v-if="addComment == true"
          @fechar-comment="addComment = false"
          @atualizar-comment="addNewComment"
        />
        <v-row align="center" v-if="comments.length > 0" class="d-none d-sm-flex">
          <v-col cols="12" sm="1">
            <span class="font-weight-medium">Id</span>
          </v-col>
          <v-col cols="12" sm="3"><span class="font-weight-medium">Autor</span></v-col>
          <v-col cols="12" sm="6"
            ><span class="font-weight-medium">Comentário</span></v-col
          >
          <v-col cols="12" sm="2" class="text-center"
            ><span class="font-weight-medium">Ações</span>
          </v-col>
        </v-row>
        <v-alert v-else border="top" colored-border dense type="info">
          Este problema não possui comentarios.
        </v-alert>
        <v-row align="center" v-for="(value, i) in comments" :key="i">
          <v-col cols="12" sm="1">
            <span class="font-weight-medium d-flex d-sm-none">Id:</span>
            <span>{{ value.id }}</span>
          </v-col>
          <v-col cols="12" sm="3"
            ><span class="font-weight-medium d-flex d-sm-none">Author:</span
            ><span>{{ value.authorName }}</span></v-col
          >
          <v-col cols="12" sm="6"
            ><span class="font-weight-medium d-flex d-sm-none">Comentário:</span>
            <span>{{ value.content }}</span>
          </v-col>
          <v-col cols="12" sm="2" class="text-center">
            <v-icon
              small
              color="error"
              title="Excluir"
              class="mx-1"
              @click="deleteComment(value.id)"
              >mdi-delete-outline</v-icon
            > </v-col
          ><v-divider />
          <v-col cols="12" class="pa-0"><v-divider /></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
export default {
  name: "CommentProblem",
  props: ["idProblema", "problemId"],
  data() {
    return {
      addComment: false,
      comments: [],
      id: 0,
    };
  },
  watch: {
    idProblema(newValue, oldValue) {
      this.id = newValue;
      this.getCommentsProblem();
    },
  },

  created() {
    this.id = this.idProblema;
    this.getCommentsProblem();
  },
  methods: {
    deleteComment(id) {
      let index = this.comments.indexOf(id);
      this.$axios
        .$delete(`/comments/${id}`)
        .then(this.comments.splice(index, 1))
        .catch((err) => this.$snotify.error(err, "Erro."));
    },
    addNewComment(comment) {
      this.comments.push(comment);
    },
    getCommentsProblem() {
      this.$axios
        .$get(`/comments?idProblema=${this.id}`)
        .then((res) => (this.comments = res))
        .catch((err) => this.$snotify.error(err, "Erro."));
    },
  },
};
</script>
