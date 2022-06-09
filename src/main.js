import { createApp } from "vue";
import App from "./App.vue";
import { apolloProvider } from "./apollo-provider";

createApp(App).use(apolloProvider()).mount("#app");
