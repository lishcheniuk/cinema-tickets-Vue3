<template>
  <form class="auth__form form" @submit.prevent="onSubmit">
    <p>Авторизация</p>
    <div class="form__item">
      <label for="email">Email</label
      ><input
        :class="{ invalid: eError && eMeta.touched }"
        id="email"
        type="text"
        v-model="email"
        @blur="eBlur"
      /><br />
      <small v-if="eError && eMeta.touched">{{ eError }}</small>
    </div>
    <div class="form__item">
      <label for="password">Пароль</label
      ><input
        :class="{ invalid: pError && pMeta.touched }"
        id="password"
        type="password"
        v-model="password"
        @blur="pBlur"
      /><br />
      <small v-if="pError && pMeta.touched">{{ pError }}</small>
    </div>
    <div class="form__footer">
      <button
        class="btn"
        type="submit"
        :disabled="isSubmitting || !eMeta.valid || !pMeta.valid"
      >
        Войти
      </button>
      <small @click="$emit('update:registerForm', true)"
        >Зарегистрироваться</small
      >
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  title: "Вход в кабинет",
  props: ["registerForm"],
  emits: ["update:registerForm"],
  setup() {
    const store = useStore();
    const router = useRouter();
    const { handleSubmit, isSubmitting } = useForm({});

    const {
      value: email,
      errorMessage: eError,
      handleBlur: eBlur,
      meta: eMeta,
    } = useField(
      "email",
      yup
        .string()
        .trim()
        .required("Пожалуйста введите email")
        .email("Необходимо ввести корректный email")
    );

    const {
      value: password,
      errorMessage: pError,
      handleBlur: pBlur,
      meta: pMeta,
    } = useField(
      "password",
      yup
        .string()
        .trim()
        .required("Пожалуйста введите пароль")
    );

    const onSubmit = handleSubmit(async (values) => {
      const res = await store.dispatch("auth/loginAction", values);
      if (res) router.push("/");
    });

    return {
      onSubmit,
      email,
      password,
      eError,
      pError,
      eBlur,
      pBlur,
      isSubmitting,
      eMeta,
      pMeta,
    };
  },
});
</script>

<style lang="less"></style>
