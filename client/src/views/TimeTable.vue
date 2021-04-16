<template>
  <div class="schedule wrap">
    <h2>Расписание сеансов</h2>
    <div class="filters">
      <h3>Фильтры</h3>

      <filter-movies
        v-for="filter of filtersData"
        :key="filter.title"
        :filter="filter"
        v-model="filterValues[filter.slug]"
      />
    </div>

    <main>
      <time-table-film
        v-for="movie of getMovies"
        :key="movie._id"
        :movie="movie"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import FilterMovies from "../components/FilterMovies.vue";
import TimeTableFilm from "../components/timeTable/TimeTableFilm.vue";

export default defineComponent({
  title: "Расписание сеансов",
  components: { FilterMovies, TimeTableFilm },
  setup() {
    const store = useStore();
    const filtersData = reactive([
      {
        title: "Период",
        type: "radio",
        values: ["Сегодня", "Завтра", "Неделя", "Месяц"],
        slug: "period",
      },
      {
        title: "Технология",
        type: "checkbox",
        values: ["4DX", "IMAX", "Cinetech"],
        slug: "technology",
      },
      {
        title: "Формат",
        type: "checkbox",
        values: ["2D", "3D"],
        slug: "format",
      },
    ]);

    const filterValues = reactive<any>({
      period: "Сегодня",
      technology: [],
      format: [],
    });

    const isValidDate = (date: string) => {
      const currentDate = "2021-02-20".split("-");
      const d = date.split("-");

      switch (filterValues.period) {
        case "Завтра":
          return +d[2] === +currentDate[2] + 1 && +d[1] === +currentDate[1];
        case "Неделя":
          return +d[2] <= +currentDate[2] + 7 && +d[1] === +currentDate[1];
        case "Месяц":
          return +d[1] <= +currentDate[1] + 1;

        default:
          return date === currentDate.join("-");
      }
    };

    const getMovies = computed(() => {
      return store.getters["films/getMovies"].filter((movie: any) => {
        const dates = {} as any;

        Object.keys(movie.schedule).forEach((date: string) => {
          if (isValidDate(date)) {
            Object.keys(movie.schedule[date]).forEach((tech: string) => {
              if (filterValues.technology.length) {
                if (filterValues.technology.includes(tech)) {
                  dates[date] = {
                    ...dates[date],
                    [tech]: movie.schedule[date][tech],
                  };
                }
              } else {
                dates[date] = {
                  ...dates[date],
                  [tech]: movie.schedule[date][tech],
                };
              }
            });
          }
        });

        movie.schedule = dates;
        return Object.keys(dates).length;
      });
    });

    return { filtersData, filterValues, getMovies };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  max-width: inherit;
}

.filters {
  flex-basis: 190px;
  margin-right: 20px;
  text-align: center;
}

main {
  flex-grow: 1;
  min-width: 500px;
}

h3 {
  padding: 10px 0;
}
</style>
