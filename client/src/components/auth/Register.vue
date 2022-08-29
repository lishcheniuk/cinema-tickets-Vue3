<template>
  <form class="auth__form register" @submit.prevent="onSubmit">
    <p>Регистрация</p>

    <div class="form__item">
      <label for="name">Имя</label
      ><input
        :class="{ invalid: nError && nMeta.touched }"
        id="name"
        type="text"
        v-model="name"
        @blur="nBlur"
      /><br />
      <small v-if="nError && nMeta.touched">{{ nError }}</small>
    </div>

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

    <div class="form__item">
      <label for="cpassword"
        >Повторите<br />
        пароль</label
      ><input
        :class="{ invalid: cpError && cpMeta.touched }"
        id="cpassword"
        type="password"
        v-model="cpassword"
        @blur="cpBlur"
      /><br />
      <small v-if="cpError && cpMeta.touched">{{ cpError }}</small>
    </div>

    <div class="form__footer">
      <button
        class="btn"
        type="submit"
        :disabled="isSubmitting || !fMeta.valid"
      >
        Зарегистрироваться
      </button>
      <small @click="$emit('update:registerForm', false)">Войти</small>
    </div>
  </form>
</template>

<script lang="ts">
import { useField, useForm } from "vee-validate";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import * as yup from "yup";

export default defineComponent({
  title: "Регистрация",
  props: ["registerForm"],
  emits: ["update:registerForm"],
  setup(_, { emit }) {
    const store = useStore();

    const { handleSubmit, isSubmitting, meta: fMeta } = useForm({
      validationSchema: yup.object({
        name: yup
          .string()
          .trim()
          .required("Пожалуйста введите имя"),
        email: yup
          .string()
          .trim()
          .required("Пожалуйста введите email")
          .email("Необходимо ввести корректный email"),
        password: yup
          .string()
          .trim()
          .required("Пожалуйста введите пароль")
          .min(6, `Пароль не может быть меньше ${6} символов`),
        cpassword: yup
          .string()
          .required("Пожалуйста подтвердите пароль")
          .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
      }),
    });

    const {
      value: name,
      errorMessage: nError,
      handleBlur: nBlur,
      meta: nMeta,
    } = useField("name");

    const {
      value: email,
      errorMessage: eError,
      handleBlur: eBlur,
      meta: eMeta,
    } = useField("email");

    const {
      value: password,
      errorMessage: pError,
      handleBlur: pBlur,
      meta: pMeta,
    } = useField("password");

    const {
      value: cpassword,
      errorMessage: cpError,
      handleBlur: cpBlur,
      meta: cpMeta,
    } = useField("cpassword");

    const onSubmit = handleSubmit(async (values, ctx) => {
      const { email, password, name } = values;
      const res = await store.dispatch("auth/registerAction", {
        email,
        password,
        name,
      });

      if (res) emit("update:registerForm");
      else ctx.setFieldValue("email", "");
    });

    return {
      onSubmit,
      name,
      email,
      password,
      cpassword,
      nError,
      eError,
      pError,
      cpError,
      nBlur,
      eBlur,
      pBlur,
      cpBlur,
      isSubmitting,
      nMeta,
      eMeta,
      pMeta,
      cpMeta,
      fMeta,
    };
  },
});
</script>

<style lang="less" scoped>
.auth__form.register {
  label {
    width: 75px;
  }
}
</style>
