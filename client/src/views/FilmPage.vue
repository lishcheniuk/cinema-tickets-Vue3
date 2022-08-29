<template>
  <div>
    <Slide :slide="getSlide" :showButton="false" />

    <div class="film-page wrap">
      <div class="time-table">
        <session-film
          v-for="(session, date) of getFilm.schedule"
          :key="date"
          :session="session"
          :date="date"
        />
      </div>
      <div class="info">
        <div class="info__image">
          <img :src="`/images/${getFilm.poster[0]}`" alt="" />
        </div>
        <p class="info__imbd">
          <svg width="50" height="50">
            <use xlink:href="/images/sprite.svg#imbd" />
          </svg>
          <b>{{ getFilm.rate }}<span>/10</span></b>
        </p>

        <ul class="info__description">
          <li><small>Год</small><br />{{ getFilm.relesed }}</li>
          <li><small>Страна</small><br />{{ getFilm.country }}</li>
          <li><small>Жанр</small><br />{{ getFilm.genre }}</li>
          <li><small>В главных ролях</small><br />{{ getFilm.staring }}</li>
          <li><small>Режисер</small><br />{{ getFilm.producer }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import SessionFilm from "../components/timeTable/SessionFilm.vue";
import Slide from "../components/slider/Slide.vue";
import { MoviesDataType } from "../store/types";

export default defineComponent({
  components: { SessionFilm, Slide },
  setup() {
    const store = useStore();
    const route = useRoute();

    const getFilm = computed(() => {
      return store.getters["films/getMovies"].find(
        (movie: MoviesDataType) => movie._id === route.params.id
      );
    });

    const getSlide = computed(() => {
      return {
        title: getFilm.value.title,
        ageLimit: getFilm.value.age_limit,
        poster: getFilm.value.poster[1] || getFilm.value.poster[0],
        id: getFilm.value._id,
      };
    });

    return { getFilm, getSlide };
  },
});
</script>

<style lang="less" scoped>
.film-page {
  .time-table {
    flex-grow: 1;
  }

  .info {
    max-width: 20%;
    margin-left: 20px;

    &__imbd {
      display: flex;
      align-items: center;

      b {
        margin-left: 10px;
      }

      span {
        font-size: 12px;
      }
    }

    &__description {
      li {
        margin-bottom: 20px;
        small {
          color: grey;
        }
      }
    }
  }
}
</style>
