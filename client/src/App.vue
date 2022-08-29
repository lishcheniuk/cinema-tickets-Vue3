<template>
  <div>
    <alerts />
    <navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Navbar from "./components/Navbar.vue";
import Alerts from "./components/Alerts.vue";

export default defineComponent({
  components: {
    Navbar,
    Alerts
  }
});
</script>

<style lang="less">
:root {
  --height_navbar: 60px;
  --color1: #34bffb;
  --lighten: lighten(#34bffb, 37%);
  --darken: darken(#34bffb, 10%);
  --grey: #f1f1f1;
}

.min-max(@min, @max, @marginTop: var(--height_navbar)) {
  min-width: @min;
  max-width: @max;
  margin: @marginTop auto 0;
  display: flex;
  flex-wrap: wrap;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
}

#app {
  height: calc(100vh - var(--height_navbar));
}

.wrap {
  .min-max(300px, 1000px);
}

.btn {
  background-color: var(--color1);
  padding: 10px 20px;
  color: #fff;
  border: none;
  cursor: pointer;
}

h2 {
  flex-basis: 100%;
  padding: 10px 60px;
}

ul {
  list-style-type: none;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
