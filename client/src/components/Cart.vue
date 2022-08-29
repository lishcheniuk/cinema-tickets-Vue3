<template>
  <div class="cart">
    <template v-if="cart.length">
      <h3>Ваш заказ в корзине:</h3>
      <div class="cart__orders" ref="cartRef">
        <div class="cart__order" v-for="ticket of cart" :key="ticket._id">
          <div class="cart__order__wrap">
            <span>{{ ticket.row + 1 }}<br />ряд</span>
            <span>{{ ticket.place + 1 }}<br />место</span>

            <div class="cart__order__price">
              {{ ticket.price }}<small>грн.</small>
            </div>
          </div>
          <div class="cart__order__del" @click="$emit('del', ticket)">
            &times;
          </div>
        </div>
      </div>
      <hr />
      <p class="cart__total">
        Всего к оплате: <span>{{ totalPrice }}</span
        >грн
      </p>
      <button class="btn" @click="$emit('buy')">Купить билеты</button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUpdated } from "vue";

export default defineComponent({
  props: { cart: Array, totalPrice: Number },
  emits: ["del", "buy"],
  setup(props) {
    const cartRef = ref<any>(null);

    onUpdated(() => {
      if (cartRef.value) {
        const top = cartRef.value.scrollHeight - (props.cart || []).length * 10;

        cartRef.value.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    });

    return { cartRef };
  },
});
</script>

<style lang="less" scoped>
.cart {
  border-right: 2px solid var(--grey);
  padding: 10px;
  flex-basis: 45%;

  h3 {
    font-weight: 300;
  }

  hr {
    border-color: rgb(218, 5, 5);
    width: 85%;
  }

  &__orders {
    max-height: 170px;
    overflow-y: scroll;
    padding: 10px 0;
  }

  &__order {
    display: flex;
    margin-top: 10px;

    &__wrap {
      display: flex;
      background-color: var(--lighten);
      border-radius: 5px;
      flex-grow: 1;
      padding: 20px;
      text-align: center;
      font-weight: bold;

      span {
        margin-left: 10px;
      }
    }

    &__price {
      margin-left: auto;
      align-self: center;
      color: var(--darken);
      display: flex;
      small {
        align-self: center;
        font-weight: normal;
      }
    }

    &__del {
      align-self: center;
      font-size: 24px;
      padding: 10px;
      cursor: pointer;
    }
  }

  &__total {
    text-align: center;
    font-size: 18px;
    margin: 20px 0;

    span {
      font-weight: bold;
    }
  }

  .btn {
    border-radius: 15px;
    margin: 0 auto;
    display: block;
  }
}
</style>
