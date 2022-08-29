<template>
  <div
    class="movie"
    @click="$router.push({ name: 'FilmPage', params: { id: movie._id } })"
  >
    <div class="movie__poster">
      <img :src="`/images/${movie.poster[0]}`" alt="" />
    </div>

    <div class="movie__description">
      <h3>{{ movie.title }}</h3>
      <p><b>Жанр:</b> {{ movie.genre }}</p>
      <p><b>Год:</b> {{ movie.relesed }}</p>
      <p><b>Режисер:</b> {{ movie.producer }}</p>
      <p><b>В главных ролях:</b> {{ movie.staring }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["movie"],
});
</script>

<style lang="less" scoped>
.movie {
  flex-basis: calc(50% - 20px);
  display: flex;
  margin: 10px;
  cursor: pointer;

  &__poster {
    flex-basis: 50%;
    flex-shrink: 0;
    height: 350px;
  }

  &__description {
    margin-left: 20px;

    h3 {
      margin: 10px 0px;
    }
  }
}
</style>
