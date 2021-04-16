<template>
  <nav>
    <span class="logo">
      <router-link to="/"
        ><img src="/images/New_Line_Cinema_logo.jpg" alt="logo"
      /></router-link>
    </span>
    <ul class="menu">
      <li>
        <router-link to="/time-table">Расписание</router-link>
      </li>
      <li><router-link to="/films">Фильмы</router-link></li>
      <li><router-link to="/4dx">4DX</router-link></li>
      <li v-if="!getUser">
        <router-link to="/auth">
          <!-- <svg id="user_sign">
            <use xlink:href="/images/sprite.svg#user"></use>
          </svg> -->
          Вход | Регистрация</router-link
        >
      </li>
      <li v-else>
        <router-link to="/profile">
          <svg id="profile">
            <use xlink:href="/images/sprite.svg#profile" />
          </svg>
        </router-link>
        <a href="#" @click="logout">
          <svg id="logout">
            <use xlink:href="/images/sprite.svg#logout" />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    getUser() {
      return this.$store.getters["auth/getUser"];
    },
  },
  methods: {
    logout() {
      this.$store.commit("auth/logOut");
      window.location.assign("/");
    },
  },
});
</script>

<style lang="less" scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--height_navbar);
  background-color: rgb(0, 0, 0);
  display: flex;

  .logo {
    max-width: 60px;
    cursor: pointer;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  ul {
    display: flex;
    flex-grow: 1;
    list-style-type: none;
    height: 100%;
    align-items: center;
    margin: 0 10px;

    li {
      &:last-child {
        margin-left: auto;

        a {
          line-height: 100%;

          svg {
            width: 30px;
            height: 30px;
            fill: #fff;
          }
        }
      }

      a {
        display: inline-block;
        line-height: var(--height_navbar);
        text-decoration: none;
        padding: 0px 10px;
        color: #fff;

        &.router-link-active {
          color: var(--color1);

          svg#profile {
            fill: var(--color1);
          }
        }
      }
    }
  }
}
</style>
