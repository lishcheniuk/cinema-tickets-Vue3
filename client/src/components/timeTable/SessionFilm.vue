<template>
  <div class="session__date">
    <p>{{ dateTimeFormat(date, { weekday: "long" }) }}</p>
    <div class="session__date__item" v-for="(item, idx) of session" :key="idx">
      <p>{{ idx }}{{ showFormat(item.format) }}</p>
      <ul>
        <li
          v-for="time of item.times"
          :key="time.id"
          @click="$router.push({ name: 'BuyTicket', params: { id: time.id } })"
        >
          {{ time.time }}
        </li>
      </ul>
    </div>
    <hr class="end" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dateTimeFormat } from "../../utils/datetime.filter";

export default defineComponent({
  props: ["session", "date"],
  setup() {
    const showFormat = (format: "2D" | "3D") => {
      return format !== "2D" ? ", " + format : "";
    };

    return { dateTimeFormat, showFormat };
  },
});
</script>

<style lang="less" scoped>
.session__date {
  width: 100%;
  padding-top: 5px;
  font-size: 14px;

  & > p {
    font-size: 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 15px 0;

    & > p {
      flex-basis: 13%;
      text-align: center;
    }

    ul {
      display: flex;

      li {
        padding: 5px 10px;
        background-color: var(--color1);
        color: #fff;
        border-radius: 5px;
        margin: 0px 5px;
        cursor: pointer;
        box-shadow: 0 0 3px var(--color1);
        font-weight: 500;

        &.disabled {
          color: grey;
          background-color: inherit;
          box-shadow: 0 0 3px grey;
          cursor: default;
        }
      }
    }
  }

  &:last-child hr {
    display: none;
  }

  hr.end {
    border: none;
    background-color: var(--color1);
    height: 2px;
  }
}
</style>
