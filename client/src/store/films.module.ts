import { MoviesDataType, ScheduleType } from "./types";
import api from "../http";

const state = {
  films: [] as MoviesDataType[],
};

type MoviesStateType = typeof state;

export default {
  namespaced: true,
  state,
  getters: {
    getMovies(state: MoviesStateType) {
      return state.films.map((movie: MoviesDataType) => {
        const schedule = movie.schedule
          .sort((a, b) => {
            if (a["date"] > b["date"]) {
              return 1;
            }
            if (a["date"] < b["date"]) {
              return -1;
            }
            return 0;
          })
          .reduce((acc: any, item: ScheduleType) => {
            const [date, time] = item.date.split("T");
            const t = time.slice(0, 5);
            let times = [{ time: t, id: item._id }];

            if (acc[date] && acc[date][item.technology]) {
              times = acc[date][item.technology].times.concat(times);
            }

            acc[date] = {
              ...acc[date],
              [item.technology]: {
                times,
                format: item.format,
              },
            };

            return acc;
          }, {});

        return { ...movie, schedule };
      });
    },
    getMoviesToday(state: MoviesStateType) {
      //const currentDate = new Date().toISOString().split("T")[0];
      const currentDate = "2021-03-20";

      return state.films
        .filter((movie) => {
          return movie.schedule.some((item) => {
            return item.date.split("T")[0] === currentDate;
          });
        })
        .map((movie) =>
          Object.fromEntries(
            Object.entries(movie).filter((item) => item[0] !== "schedule")
          )
        );
    },
    getMoviesToSlider(state: MoviesStateType) {
      return state.films
        .filter((movie) => {
          return movie.type === "new" && !!movie.poster[1];
        })
        .map((movie) => ({
          title: movie.title,
          poster: movie.poster[1],
          id: movie._id,
          ageLimit: movie.age_limit,
        }))
        .slice(0, 3);
    },
    getTimeMovie(state: MoviesStateType) {
      return (id: string) => {
        let data = null;

        state.films.forEach((movie) => {
          const time = movie.schedule.find((date) => date._id === id);

          if (time)
            data = {
              title: movie.title,
              ageLimit: movie.age_limit,
              poster: movie.poster,
              movieId: movie._id,
              ...time,
            };
        });

        return data;
      };
    },
  },
  mutations: {
    setMovies(state: MoviesStateType, payload: MoviesDataType[]) {
      state.films = payload;
    },
    editPlace(state: MoviesStateType, payload: any) {
      state.films.forEach((movie) => {
        movie.schedule.forEach((item) => {
          if (item._id === payload.timeId) {
            const place = item.places[payload.row];

            place[payload.place] =
              place[payload.place] === "free" ? "busy" : "free";
          }
        });
      });
    },
  },
  actions: {
    async loadMovies(store: any) {
      const movies = await api.fetchMovies();
      store.commit("setMovies", movies);
    },
  },
};
