import api from "../http";
import { UserType } from "./types";

const state = { user: null as UserType | null };
type AuthState = typeof state;

export default {
  namespaced: true,
  state,

  getters: {
    getUser: (state: AuthState) => state.user,
  },

  mutations: {
    setUser(state: AuthState, user: UserType) {
      state.user = user;
    },
    logOut(state: AuthState) {
      state.user = null;
    },
  },

  actions: {
    async loginAction({ commit, dispatch }: any, payload: UserType) {
      try {
        const user = await api.login(payload);
        commit("setUser", user);
        dispatch("alerts/addMessage", `Добро пожаловать ${user.name}`, {
          root: true,
        });
        return true;
      } catch (e) {
        if (e.status === 400) {
          dispatch("alerts/addMessage", "Неверный логин или пароль", {
            root: true,
          });
        }
        return false;
      }
    },
    async registerAction({ dispatch }: any, payload: UserType) {
      try {
        const { message } = await api.register(payload);
        dispatch("alerts/addMessage", message, { root: true });
        return true;
      } catch (e) {
        if (e.status === 400) {
          dispatch("alerts/addMessage", "Такой email уже занят", {
            root: true,
          });
        }
        return false;
      }
    },
  },
};
