import { CartType, OrderType, MoviesDataType, ScheduleType } from "./types";
import api from "../http";
import { socketSendMessage } from "../http/socket.api";
import { dateTimeFormat } from "../utils/datetime.filter";

const state = {
  orders: [] as OrderType[],
  cart: [] as CartType[],
};
type CartStateType = typeof state;

export default {
  namespaced: true,
  state,

  getters: {
    getCart(state: CartStateType) {
      return state.cart;
    },
    totalPrice(state: CartStateType) {
      return state.cart.reduce((acc, item) => {
        return (acc += +item.price);
      }, 0);
    },
    getOrders(state: CartStateType, _: any, rootState: any) {
      return state.orders
        .map((order) => {
          const { title, schedule } = rootState.films.films.find(
            (film: MoviesDataType) => film._id === order.movieId
          );
          const { date } = schedule.find(
            (s: ScheduleType) => s._id === order.timeId
          );

          const [time, d] = dateTimeFormat(date, {
            hour: "2-digit",
            minute: "2-digit",
          }).split(",");

          return { ...order, title, time, date: d.trim().split(" ") };
        })
        .reduce((acc: OrderType[], order: OrderType) => {
          const o = acc.find((item: OrderType) => item.timeId === order.timeId);

          if (o) o.places = [...o.places, ...order.places];
          else acc.push(order);

          return acc;
        }, []);
    },
  },

  mutations: {
    addToCart(state: CartStateType, { ticket }: any) {
      state.cart.push(ticket);
    },
    removeFromCart(state: CartStateType, id: string) {
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    clearCart(state: CartStateType) {
      state.cart = [];
    },
    addOrder(state: CartStateType, payload: OrderType) {
      state.orders.push(payload);
    },
    setOrders(state: CartStateType, payload: OrderType[]) {
      state.orders = payload;
    },
    setCart(state: CartStateType, newCart: CartType[]) {
      state.cart = newCart;
    },
  },

  actions: {
    async buyTickets({ commit, dispatch }: any, payload: OrderType) {
      const order = await api.buyTickets(payload);
      socketSendMessage({ method: "buy" });
      commit("addOrder", order);
      commit("clearCart");
      dispatch("alerts/addMessage", "Покупка прошла успешно", { root: true });
    },
    async loadOrders(store: any, userId: string) {
      try {
        const orders = await api.fetchOrders(userId);
        store.commit("setOrders", orders);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
