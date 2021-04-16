<template>
  <div class="movie">
    <div class="movie__poster">
      <img :src="`/images/${movie.poster[0]}`" alt="" />
    </div>
    <div class="movie__schedule">
      <h3>{{ movie.title }}</h3>
      <hr />

      <session-film
        v-for="(session, date) of movie.schedule"
        :key="date"
        :session="session"
        :date="date"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SessionFilm from "./SessionFilm.vue";

export default defineComponent({
  props: { movie: Object },
  components: { SessionFilm },
});
</script>

<style lang="less" scoped>
.movie {
  font-weight: 600;
  background-color: var(--lighten);
  display: flex;
  padding: 10px;
  margin: 20px 10px;

  &__poster {
    max-width: 200px;
    height: 300px;
  }

  &__schedule {
    flex-grow: 1;
    margin-left: 10px;

    h3 {
      color: var(--color1);
    }
  }
}
</style>
