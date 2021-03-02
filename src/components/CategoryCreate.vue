<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            @blur="tBlur"
            :class="{ invalid: tError }"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="tError">{{ tError }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            @blur="lBlur"
            :class="{ invalid: lError }"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="lError">{{ lError }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import M from "materialize-css";
import { useCreateForm } from "../use/create-form";
import { onMounted } from "vue";

export default {
  emits: ["created"],
  setup(_, { emit }) {
    const store = useStore();

    onMounted(() => {
      M.updateTextFields();
    });

    const submit = async (values, { resetForm }) => {
      const category = await store.dispatch("createCategory", values);
      console.log(category);
      // $message("Категория создана");
      resetForm({
        values: {
          title: "",
          limit: 100
        }
      });
      emit("created", category);
    };

    return { ...useCreateForm(submit) };
  }

  // updated(){
  //    this.$message("Категория создана");
  // }
};
</script>

<style></style>
