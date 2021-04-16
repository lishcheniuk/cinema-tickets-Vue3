<template>
  <transition name="slide" appear>
    <div
      class="slide"
      :style="{ backgroundImage: `url(/images/${slide.poster})` }"
      @mouseenter="$emit('stop')"
      @mouseleave="$emit('start')"
    >
      <div class="title">
        {{ slide.title }} ({{ slide.ageLimit }})
        <button
          class="btn"
          v-if="showButton"
          @click="$router.push({ name: 'FilmPage', params: { id: slide.id } })"
        >
          Купить билет
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    slide: { type: Object },
    showButton: { type: Boolean, default: true },
  },
  emits: ["start", "stop"],
});
</script>

<style lang="less" scoped>
.slide {
  overflow: hidden;
  height: 400px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 15%;
  position: relative;

  .title {
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.slide-enter-from {
  opacity: 0;
}

.slide-enter-active {
  transition: opacity 0.5s;
}
.slide-leave-active {
  opacity: 0;
}
</style>
