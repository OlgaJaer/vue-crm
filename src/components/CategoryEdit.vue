<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">{{
              c.title
            }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            @blur="tBlur"
            :class="{ invalid: tError }"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="tError">{{ tError }} </span>
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
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import M from "materialize-css";
import { useEditForm } from "../use/edit-form";
import { useStore } from "vuex";
import { onUnmounted, onMounted, ref, watch, toRefs } from "vue";

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const select = ref(null);
    const current = ref(null);
    const store = useStore();
    // const title = ref('');
    // const limit = ref(null)

    console.log(props.categories[0]);
    const { title, limit, id } = toRefs(props.categories[0]);
    // title.value  = props.categories[0].title;
    // limit.value  = props.categories[0].limit;

    // console.log("limit", limit);
    // console.log("title", title.value);
    // current.value = id.value;
    console.log("limit", limit.value);
    console.log("title", title.value);
    current.value = id.value;
    // current.value = props.categories[0].id;

    onMounted(() => {
      select.value = M.FormSelect.init(select.value);
      M.updateTextFields();
    });

    onUnmounted(() => {
      if (select.value && select.value.destroy) {
        select.value.destroy();
      }
    });

    // console.log(current.value.value);

    const submit = async (values, { resetForm }) => {
      try {
        console.log("values", values);
        const categoryData = await store.dispatch("updateCategory", values);
        console.log(categoryData);
        resetForm({
          values: {
            title: "",
            limit: 100
          }
        });
        emit("updated", categoryData);
      } catch (e) {
        console.log(e);
        throw e;
      }
      // const category = await store.dispatch("createCategory", values);
      // console.log(category);
      // // $message("Категория создана");
      // resetForm({
      //   values: {
      //     title: "",
      //     limit: 100
      //   }
      // });
      // emit("created", category);
    };
    watch(current, catId => {
      console.log("props", props);
      const catInfo = props.categories.find(cat => cat.id === catId);
      // console.log('catId', catId);
      console.log(current);
      console.log("catId", catId);
      console.log("props", props);
      console.log("catInfo", catInfo);
      // console.log('before title', title.value);
      // console.log('before', limit.value);
      console.log(props.categories[0]);
      title.value = catInfo.title;
      limit.value = catInfo.limit;
      console.log("after title", title.value);
      console.log("after", limit.value);
    });
    return { ...useEditForm(submit), select, current, title, limit };
  }
  // created() {
  //   const { id, title, limit } = this.categories[0];
  //   this.title = title;
  //   this.current = id;
  //   this.limit = limit;
  // },
  // mounted() {
  //   M.updateTextFields();
  //   this.select = M.FormSelect.init(this.$refs.select);
  // },
  // unmounted() {
  //   if (this.select && this.select.destroy) {
  //     this.select.destroy();
  //   }
  // }
};
</script>

<style></style>
