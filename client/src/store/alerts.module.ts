const state = {
  messages: [] as string[],
};
type AlertType = typeof state;

export default {
  namespaced: true,
  state,
  getters: {
    getMessages: (state: AlertType) => state.messages,
  },
  mutations: {
    addMessage(state: AlertType, message: string) {
      state.messages.push(message);
    },
    clearMessage(state: AlertType) {
      state.messages = state.messages.filter((_, i) => i !== 0);
    },
  },

  actions: {
    addMessage({ commit }: any, payload: string) {
      commit("addMessage", payload);

      setTimeout(() => {
        commit("clearMessage");
      }, 5000);
    },
  },
};
