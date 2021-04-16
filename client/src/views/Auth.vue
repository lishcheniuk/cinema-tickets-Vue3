<template>
  <div class="auth wrap">
    <Login
      v-if="!visibleRegisterForm"
      v-model:registerForm="visibleRegisterForm"
    />

    <Register v-else v-model:registerForm="visibleRegisterForm" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";

export default defineComponent({
  components: { Login, Register },
  setup() {
    const visibleRegisterForm = ref(false);

    return {
      visibleRegisterForm,
    };
  },
});
</script>

<style lang="less">
.auth__form {
  margin: 50px auto 0;
  border: 1px solid #000;
  border-radius: 15px 15px 0 0;
  width: 360px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  p {
    text-align: center;
    padding: 20px;
    background-color: #000;
    color: #fff;
  }

  .form__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    small {
      color: var(--color1);
      cursor: pointer;
    }
  }

  .form__item {
    margin-top: 10px;
    align-self: center;

    label {
      display: inline-block;
      margin-right: 5px;
      width: 55px;
      font-weight: 700;
      font-size: 0.9rem;
    }

    input {
      vertical-align: top;
      padding: 5px;
      font-size: 1rem;
      border: none;
      background-color: var(--lighten);
      border-bottom: 1px solid transparent;

      &.invalid {
        border-bottom: 1px solid red;
        background-color: rgba(238, 128, 128, 0.301);
      }

      &:focus {
        outline: none;
        border-bottom: 1px solid var(--color1);

        &.invalid {
          border-bottom: 1px solid red;
        }
      }
    }

    small {
      display: block;
      text-align: right;
      color: red;
    }
  }

  .btn {
    display: block;
    background-color: black;
    border-radius: 5px;

    &:disabled {
      background-color: gray;
      cursor: not-allowed;
    }
  }
}
</style>
