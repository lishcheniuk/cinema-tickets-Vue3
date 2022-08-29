<template>
  <div class="slider">
    <Slide
      :slide="getSlide"
      @start="startInterval"
      @stop="stopInterval"
      :key="slideActive"
    />

    <div class="navigation">
      <span
        class="dot"
        v-for="(slide, index) of slides"
        :key="slide._id"
        @click="selectSLide(index)"
        :class="{ selected_image: index === slideActive }"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from "vue";
import { useStore } from "vuex";
import Slide from "./Slide.vue";

export default defineComponent({
  components: { Slide },
  setup() {
    const store = useStore();
    const slideActive = ref(0);
    let interval: null | number = null;

    const slides = computed(() => {
      return store.getters["films/getMoviesToSlider"];
    });

    const getSlide = computed(() => {
      return slides.value[slideActive.value];
    });

    const startInterval = () => {
      if (!interval) {
        interval = setInterval(() => {
          slideActive.value++;

          if (slideActive.value >= slides.value.length) {
            slideActive.value = 0;
          }
        }, 6000);
      }
    };

    const stopInterval = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const selectSLide = (index: number) => {
      slideActive.value = index;
    };

    onMounted(() => {
      startInterval();
    });

    onUnmounted(() => {
      if (interval) clearInterval(interval);
    });

    return {
      slideActive,
      slides,
      selectSLide,
      stopInterval,
      startInterval,
      getSlide,
    };
  },
});
</script>

<style lang="less" scoped>
.slider {
  margin-top: var(--height_navbar);

  .navigation {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    .dot {
      display: inline-block;
      margin: 0 10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 3px solid var(--color1);
      background-color: #000;
      cursor: pointer;

      &.selected_image {
        background-color: var(--color1);
      }
    }
  }
}
</style>
