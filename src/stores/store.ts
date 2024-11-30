import { Ref, ref } from "vue";
import { defineStore } from "pinia";

import createId from "@/helpers/createId";

import type { ILogin, IValue, IMark } from "@/interfaces/login";

// Интерфейс для описания состояния хранилища
interface StoreState {
  loginsData: Ref<ILogin[]>;
}

interface StoreActions {
  saveLogins(): void;
  addNewLogin(): void;
  deleteLogin(id: number | undefined): void;
  changeLogin(id: number | undefined, type: IValue, login: IValue, password: IValue): void;
  changeMarks(id: number | undefined, marks: IMark[], mark: IValue): void;
}

export const useStore = defineStore<StoreState & StoreActions>("store", () => {
  const loginsJson: string | null = localStorage.getItem("logins");
  const loginsData = ref<ILogin[]>(loginsJson !== null ? JSON.parse(loginsJson) : []);

  function saveLogins(): void {
    localStorage.setItem("logins", JSON.stringify(loginsData.value));
  }

  function addNewLogin(): void {
    const newLogin: ILogin = {
      marks: [],
      mark: "",
      type: "local",
      login: "",
      password: "",
      id: createId(loginsData.value),
    };
    loginsData.value.push(newLogin);
    saveLogins();
  }

  function changeLogin(
    id: number | undefined,
    type: IValue,
    login: IValue,
    password: IValue
  ): void {
    const index = loginsData.value.findIndex((user) => user.id === id);
    if (index >= 0) {
      loginsData.value[index].type = type.value;
      loginsData.value[index].login = login.value;
      loginsData.value[index].password = password.value;
      saveLogins();
    }
  }

  function changeMarks(id: number | undefined, marks: IMark[], mark: IValue): void {
    const index = loginsData.value.findIndex((user) => user.id === id);
    if (index >= 0) {
      loginsData.value[index].marks = marks;
      loginsData.value[index].mark = mark.value;
      saveLogins();
    }
  }

  function deleteLogin(id: number | undefined): void {
    loginsData.value = loginsData.value.filter((login) => login.id !== id);
    saveLogins();
  }

  return {
    loginsData,
    saveLogins,
    addNewLogin,
    deleteLogin,
    changeLogin,
    changeMarks,
  };
});
