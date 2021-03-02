<template>
  <ul class="sidenav app-sidenav" :class="{ open: modelValue }">
    <!-- <li v-for="link in links" :key="link.url">
      <router-link :to="link.url" custom v-slot="{ navigate, href }"
        ><a
          @click="navigate"
          :class="[
            'waves-effect',
            'waves-orange',
            'pointer',
            { active: $route.path.indexOf(href) !== -1 }
          ]"
          :exact="link.exact"
          >{{ link.title }}</a
        ></router-link
      >
    </li> -->
    <router-link
      :to="link.url"
      v-for="link in links"
      :key="link.url"
      custom
      v-slot="{ href, navigate, isExactActive }"
    >
      <li :class="[isExactActive && 'active']">
        <a
          :href="href"
          @click="navigate"
          class="waves-effect waves-orange pointer"
          >{{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ["modelValue"],
  data: () => ({
    links: [
      { title: "Счет", url: "/", exact: true },
      { title: "История", url: "/history" },
      { title: "Планирование", url: "/planning" },
      { title: "Новая запись", url: "/record" },
      { title: "Категории", url: "/categories" }
    ]
  })
};
</script>
