import { createApp } from "vue";
import { apolloProvider } from "./apollo-provider";
import App from "./App.vue";

createApp(App).use(apolloProvider()).mount("#app");
