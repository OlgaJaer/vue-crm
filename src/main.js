import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "./utils/message.plugin.js";
import Loader from "./components/app/Loader.vue";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyAiTFbyUy0z7lgXwbI43VHMQY-_ififFfU",
  authDomain: "vue3-crm-38c7c.firebaseapp.com",
  projectId: "vue3-crm-38c7c",
  storageBucket: "vue3-crm-38c7c.appspot.com",
  messagingSenderId: "680325392979",
  appId: "1:680325392979:web:92e4b13cd283c95f0474a6"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(messagePlugin)
      .use(store)
      .use(router)
      .component("Loader", Loader)
      .mount("#app");
  }
});
