<template>
  <div class="places">
    <div class="places__row" v-for="(item, index) of places" :key="index + 1">
      Ряд {{ index + 1 }}&nbsp;
      <div v-for="(place, idx) of item" :key="idx + 1">
        <div
          class="places__item__free"
          v-if="place === 'free'"
          @click="$emit('add', { row: index, place: idx })"
        >
          <span>{{ idx + 1 }}</span>
        </div>
        <div class="places__item__busy" v-else>
          <svg>
            <use xlink:href="/images/sprite.svg#user-place"></use>
          </svg>
        </div>
      </div>

      &nbsp;Ряд {{ index + 1 }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: { places: { type: Array, required: true } },
  emits: ["add"],
});
</script>

<style lang="less" scoped>
.places {
  align-self: flex-start;
  margin-left: 100px;

  &__row {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    margin-top: 10px;
  }

  &__item__free {
    width: 22px;
    height: 30px;
    margin: 0px 5px;
    border-radius: 5px;
    //border: 1px solid var(--lighten);
    box-shadow: 1px 1px 4px var(--color1);
    cursor: pointer;
    text-align: center;
    line-height: 30px;

    span {
      display: none;
      color: #fff;
    }

    &:hover {
      background-color: var(--color1);

      span {
        display: block;
      }
    }
  }
  .places__item__busy {
    margin: 0px 5px;
    height: 30px;
    svg {
      width: 22px;
      height: 100%;
      fill: grey;
    }
  }
}
</style>
