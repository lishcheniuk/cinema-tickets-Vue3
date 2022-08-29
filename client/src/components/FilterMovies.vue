<template>
  <div class="filters__item">
    <p>{{ filter.title }}</p>
    <ul>
      <li v-for="(value, index) of filter.values" :key="value + index">
        <input
          :class="{ shadow: filter.type !== 'radio' }"
          :type="filter.type"
          :name="filter.slug"
          :id="filter.slug + index"
          :value="value"
          v-model="inputValue"
        /><label :for="filter.slug + index">{{ value }}</label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: ["filter"],
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const typeValue =
      props.filter.slug === "period" ? props.filter.values[0] : [];
    const inputValue = ref(typeValue);

    watch(inputValue, (newVal) => {
      emit("update:modelValue", newVal);
    });

    return { inputValue };
  },
});
</script>

<style lang="less" scoped>
.filters__item {
  padding: 20px 0 10px 0;
  border-top: 1px solid rgb(223, 217, 217);
  border-bottom: 1px solid rgb(223, 217, 217);
  overflow: hidden;

  p {
    color: grey;
  }

  ul {
    margin-top: 10px;
    float: right;
    width: 50%;
    text-align: left;

    li {
      margin-top: 5px;

      label {
        margin-left: 5px;
        cursor: pointer;
      }

      input {
        appearance: none;
        border: 2px solid var(--color1);
        border-radius: 50%;
        width: 16px;
        height: 16px;
        outline: none;
        position: relative;
        cursor: pointer;

        &.shadow {
          box-shadow: 0 2px 2px var(--color1);
        }

        &[type="checkbox"] {
          border-radius: inherit;

          &:before {
            border-radius: inherit;
          }
        }

        &:before {
          content: "";
          display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color1);
        }

        &:checked:before {
          display: inline-block;
        }
      }
    }
  }
}
</style>
