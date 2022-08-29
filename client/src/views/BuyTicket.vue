<template>
    <div class="buy-ticket">
        <header :style="{
            backgroundImage: `url(/images/${getTimeMovie.poster[1] ||
                getTimeMovie.poster[0]})`,
        }">
            <h2 class="buy-ticket__title">
                ФИЛЬМ: &nbsp;{{  getTimeMovie.title  }} ({{
                 getTimeMovie.ageLimit 
                }})<br />
                СЕАНС: &nbsp;{{
                 dateTimeFormat(getTimeMovie.date, {
                     hour: "2-digit",
                     minute: "2-digit"
                 })






                }}
            </h2>
        </header>
        <main class="buy-ticket__main wrap">
            <h2>Выбор мест</h2>
            <small>Пожалуйста, выберите места на схеме и нажмите "Купить билеты"</small>
            <section>
                <Cart
                      :cart="getCart"
                      @del="removeFromCart"
                      @buy="buyTickets"
                      :totalPrice="totalPrice" />

                <Places
                        :places="getTimeMovie.places"
                        @add="addTicket" />
            </section>
        </main>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { CartType } from "../store/types";
import Places from "../components/Places.vue";
import Cart from "../components/Cart.vue";
import { subscribeToUpdate, unsubscribeFromUpdate } from "../http/socket.api";
import { dateTimeFormat } from "../utils/datetime.filter";

export default defineComponent({
    title: "Покупка билетов",
    components: { Places, Cart },
    setup() {
        const store = useStore();
        const route = useRoute();

        const getTimeMovie = computed(() => {
            return store.getters["films/getTimeMovie"](route.params.id);
        });

        const getCart = computed(() => {
            return store.getters["cart/getCart"];
        });

        const getUser = computed(() => {
            return store.getters["auth/getUser"];
        });

        const totalPrice = computed(() => {
            return store.getters["cart/totalPrice"];
        });

        const recalculateCart = computed(() => {
            const places = getTimeMovie.value.places;
            return getCart.value.filter(
                (ticket: CartType) => places[ticket.row][ticket.place] === "free"
            );
        });

        const addTicket = (payload: { row: number; place: number }) => {
            const { price, _id: timeId } = getTimeMovie.value;
            const data = {
                ticket: { ...payload, price, id: Date.now().toString() },
                timeId,
            };

            store.commit("cart/addToCart", data);
            store.commit("films/editPlace", { ...payload, timeId });
        };

        const removeFromCart = (ticket: CartType) => {
            store.commit("cart/removeFromCart", ticket.id);
            store.commit("films/editPlace", {
                ...ticket,
                timeId: getTimeMovie.value._id,
            });
        };

        const buyTickets = () => {
            if (getUser.value) {
                store.dispatch("cart/buyTickets", {
                    places: getCart.value,
                    timeId: getTimeMovie.value._id,
                    movieId: getTimeMovie.value.movieId,
                    userId: getUser.value._id,
                });
            } else {
                store.dispatch("alerts/addMessage", "Для покупки нужна авторизация");
            }
        };

        const socketMessageHandler = async (message: string) => {
            if (message === "update") {
                await store.dispatch("films/loadMovies");

                if (getCart.value.length !== recalculateCart.value.length) {
                    store.commit("cart/setCart", recalculateCart.value);
                    store.dispatch("alerts/addMessage", "Корзина обновилась");
                }

                recalculateCart.value.forEach(({ row, place }: any) => {
                    store.commit("films/editPlace", {
                        row,
                        place,
                        timeId: getTimeMovie.value._id,
                    });
                });
            }
        }

        onMounted(() => {
            subscribeToUpdate(socketMessageHandler);
        });

        onUnmounted(() => {
            store.commit("cart/clearCart");
            unsubscribeFromUpdate(socketMessageHandler);
        });

        return {
            getTimeMovie,
            dateTimeFormat,
            addTicket,
            getCart,
            removeFromCart,
            totalPrice,
            buyTickets,
        };
    },
});
</script>

<style lang="less" scoped>
.buy-ticket {
    margin-top: var(--height_navbar);

    header {
        height: 200px;
        flex-basis: 100%;
        display: flex;
        align-items: flex-end;
        background-size: cover;
        background-position: center;

        .buy-ticket__title {
            flex-basis: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            font-weight: 300;
            font-size: 1rem;
            color: #fff;
            line-height: 25px;
            padding: 25px 20px;
        }
    }

    .buy-ticket__main {
        margin-top: 20px;

        h2 {
            padding-left: 0;
        }

        section {
            flex-basis: 100%;
            margin-top: 30px;
            display: flex;
        }
    }
}
</style>
