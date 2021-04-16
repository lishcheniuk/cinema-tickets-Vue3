<template>
  <div class="movies wrap">
    <h2>
      Все фильмы
    </h2>

    <movie v-for="movie of getMovies" :key="movie._id" :movie="movie" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import Movie from "../components/Movie.vue";

export default defineComponent({
  title: "Фильмы",
  components: { Movie },
  setup() {
    const store = useStore();

    const getMovies = computed(() => store.getters["films/getMovies"]);
    return { getMovies };
  },
});
</script>

<style></style>
