<template>
    <div class="wrap profile">
        <div v-if="!getOrders.length">Loading...</div>

        <template v-else>
            <h2>
                Ваши билеты: <span>&nbsp;{{  getOrders.length  }} билетов</span>
            </h2>
            <main>
                <div
                     class="user-order"
                     v-for="order of getOrders"
                     :key="order.id"
                     :style="{ gridRow: `span ${order.places.length}` }">
                    <table>
                        <caption>
                            {{
                             order.title 
                            }}
                        </caption>
                        <thead>
                            <tr>
                                <th>
                                    {{  order.date[0]  }}<br><small>{{  order.date[1]  }}</small>
                                </th>
                                <th>{{  order.time  }}</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr
                                v-for="place of order.places"
                                :key="place.id">
                                <td>
                                    <small>ряд </small>{{  place.row + 1  }}
                                </td>
                                <td><small>место </small>{{  place.place + 1  }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </template>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    title: "Профиль",
    setup() {
        const store = useStore();
        const getUser = computed(() => store.getters["auth/getUser"]);
        const getOrders = computed(() => store.getters["cart/getOrders"]);

        onMounted(() => {
            store.dispatch("cart/loadOrders", getUser.value._id);
        });

        return { getOrders };
    },
});
</script>

<style lang="less" scoped>
.profile {
    max-width: inherit;
    margin-left: 30px;

    h2 {
        font-weight: 500;
        display: flex;

        span {
            font-size: 12px;
            color: grey;
        }
    }

    main {
        display: grid;
        grid-template-columns: repeat(3, 250px);
        grid-gap: 10px;

        .user-order {
            background-color: var(--lighten);

            table {
                width: 100%;
                text-align: center;
                //table-layout: fixed;
                border-spacing: 0px 10px;
                font-weight: 700;

                caption {
                    padding: 10px 10px 0px;
                }

                small {
                    font-weight: 500;
                }

                th,
                td {
                    border: 1px solid grey;
                }

                th {

                    &:first-child,
                    &:last-child {
                        border-left: none;
                    }

                    &:last-child {
                        border-right: none;
                    }
                }

                td {
                    padding: 5px 20px;
                    border-radius: 3px;

                    position: relative;
                    left: 10px;

                    &:nth-child(2n) {
                        left: -10px;
                        color: #fff;
                        background-color: rgb(48, 48, 68);
                    }

                    &:nth-child(2n-1) {
                        padding-right: 35px;
                        width: 52%;
                    }
                }

                tr:first-child {
                    td {
                        position: static;
                        left: auto;
                        border-bottom: none;
                        padding: 0;
                        border-radius: 0;
                    }
                }
            }
        }
    }
}
</style>
