<template>
  <div class="alerts" v-if="messages.length">
    <div v-for="(message, i) of messages" :key="i">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    return { messages: computed(() => store.getters["alerts/getMessages"]) };
  },
});
</script>

<style lang="less" scoped>
.alerts {
  position: fixed;
  right: 20px;
  top: 60px;
  color: #fff;
  z-index: 101;

  span {
    display: inline-block;
    padding: 15px 30px;
    border-radius: 5px;
    background-color: var(--color1);
    margin-top: 5px;
  }
}
</style>
