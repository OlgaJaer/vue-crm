<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="email"
          v-model="email"
          @blur="eBlur"
          :class="{ invalid: eError }"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="eError">{{ eError }}</small>
      </div>
      <div class="input-field" :class="{ invalid: pError }">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          @blur="pBlur"
          :class="{ invalid: pError }"
        />
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="pError">{{ pError }}</small>
      </div>

      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          @blur="nBlur"
          :class="{ invalid: nError }"
        />
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="nError">{{ nError }}</small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="agree"
            @blur="aBlur"
            :class="{ invalid: aError }"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
      <small class="helper-text invalid" v-if="aError">{{ aError }}</small>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useRegisterForm } from "../use/register-form";
export default {
  name: "register",
  setup() {
    return { ...useRegisterForm() };
  }
};
</script>
