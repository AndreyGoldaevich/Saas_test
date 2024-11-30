<template>
  <form class="form">
    <div class="wrapper">
      <h2 class="title">Учётные записи</h2>
      <button class="btn-add btn-reset" @click.prevent="store.addNewLogin">+</button>
    </div>
    <span class="clue">
      <span class="clue-quest">?</span> Для указания нескольких меток для одной пары логин/пароль
      используйте разделитель ;
    </span>
    <ul class="list list-reset">
      <div class="wrapper-marks">
        <span class="above">Метки</span>
        <span class="above">Тип записи</span>
        <span class="above">Логин</span>
        <span class="above">Пароль</span>
      </div>
      <LoginItem
        v-for="login in loginsData"
        :key="login.id"
        :id="login.id"
        :marks="login.marks"
        v-model:mark="login.mark"
        v-model:type="login.type"
        v-model:login="login.login"
        v-model:password="login.password"
        v-model:switch="switchHidden"
      />
    </ul>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "./stores/store";

import LoginItem from "./components/LoginItem.vue";

const store = useStore();
const { loginsData } = storeToRefs(store);

const switchHidden = ref<string>("password");
</script>
