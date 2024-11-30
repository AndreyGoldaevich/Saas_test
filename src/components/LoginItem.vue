<template>
  <form>
    <ul>
      <li class="item">
        <label for="markInput" class="label">
          <input
            id="markInput"
            class="input"
            maxlength="50"
            name="marks"
            type="text"
            v-model="setMark"
          />
        </label>
        <label for="typeSelect" class="label">
          <select
            id="typeSelect"
            class="select"
            name="type"
            @change="localType"
            v-model="setType"
            :checked="props.type"
          >
            <option value="local">Локальная</option>
            <option value="LDAP">LDAP</option>
          </select>
        </label>
        <label for="loginInput" class="label" :class="{ passwordNull: props.type === 'LDAP' }">
          <input
            id="loginInput"
            required
            maxlength="100"
            class="input"
            name="login"
            type="text"
            v-model="setLogin"
            :class="{ unvalid: !setLogin }"
          />
        </label>
        <label for="passwordInput" class="label label-password" v-if="props.type === 'local'">
          <input
            id="passwordInput"
            required
            maxlength="100"
            class="input"
            name="password"
            :type="props.switch"
            v-model="setPassword"
            :class="{ unvalid: !setPassword }"
          />
          <span class="hidden" @click="showPassword">*</span>
        </label>
        <button class="delete btn-reset" @click.prevent="store.deleteLogin(props.id)">
          &times;
        </button>
      </li>
    </ul>
    <button>clock</button>
  </form>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { useStore } from "@/stores/store";
import debounce from "lodash.debounce";
import type { IMark } from "@/interfaces/logins";

const store = useStore();

interface Props {
  marks: IMark[];
  mark: string;
  type: string;
  login: string;
  password: string;
  switch: string;
  id?: number;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: "update:mark", value: string): void;
  (event: "update:type", value: string): void;
  (event: "update:login", value: string): void;
  (event: "update:password", value: string): void;
  (event: "update:switch", value: string): void;
}>();

const currMarks = ref<IMark[]>([]);

const setMark = computed<string>({
  get() {
    return props.mark;
  },
  set(value) {
    emits("update:mark", value);
  },
});

const setType = computed<string>({
  get() {
    return props.type;
  },
  set(value) {
    emits("update:type", value);
  },
});

const setLogin = computed<string>({
  get() {
    return props.login;
  },
  set(value) {
    emits("update:login", value);
  },
});

const setPassword = computed<string>({
  get() {
    return props.password;
  },
  set(value) {
    if (setType.value === "local") {
      emits("update:password", value);
    }
  },
});

const showPassword = () => {
  if (props.password !== "null") {
    if (props.switch === "password") {
      emits("update:switch", "");
    } else {
      emits("update:switch", "password");
    }
  }
};

const localType = () => {
  if (props.type === "LDAP") {
    emits("update:password", "null");
  } else {
    emits("update:password", "");
  }
};

watch(
  [setMark, setType, setLogin, setPassword],
  debounce(() => {
    if (setType.value && setLogin.value && setPassword.value) {
      store.changeLogin(props.id, setType.value, setLogin.value, setPassword.value);
    }

    if (setMark.value) {
      currMarks.value = setMark.value.split(";").filter((item) => item !== "");
      store.changeMarks(props.id, currMarks.value, setMark.value);
    } else if (!setMark.value) {
      currMarks.value = [];
      store.changeMarks(props.id, currMarks.value, setMark.value);
    }
  }, 3000)
);
</script>
