<template>
  <div>
    <Slider />

    <div class="home wrap">
      <h2 v-if="getMoviesToday.length">
        Сегодня в кино {{ getMoviesToday.length }} {{ strTransform }}
      </h2>
      <h2 v-else>Сегодня фильмов нету</h2>
      <movie
        v-for="movie of getMoviesToday"
        :key="movie._id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Slider from "../components/slider/Slider.vue";
import Movie from "../components/Movie.vue";

export default defineComponent({
  name: "Home",
  components: {
    Slider,
    Movie,
  },
  title: "Главная",
  setup() {
    const store = useStore();

    const getMoviesToday = computed(
      () => store.getters["films/getMoviesToday"]
    );

    const strTransform = computed(() => {
      let str = "фильмов";
      const count = getMoviesToday.value.length;

      if (count === 1) {
        str = "фильм";
      } else if (count < 5) {
        str = "фильмa";
      }

      return str;
    });

    return { getMoviesToday, strTransform };
  },
});
</script>

<style lang="less" scoped>
.container {
  margin-top: 10px;
}
</style>
