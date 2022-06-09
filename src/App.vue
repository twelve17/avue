<template>
  <!--
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 in CodeSandbox!" />
  -->
  <p>
    Message: {{ message }}<br />
    Computed MessageLetter: {{ messageLetter }}<br />
  </p>
</template>



<script>
//import HelloWorldVue from "./components/HelloWorld.vue";
import gql from "graphql-tag";

const query = gql`
  query getMessage($id: Int!) {
    message3(id: $id) {
      id
      text
    }
  }
`;

export default {
  name: "App",
  /*
  components: {
    HelloWorld: HelloWorldVue,
  },
  */
  computed: {
    messageLetter() {
      return "hi";
    },
  },
  data() {
    return {
      message: "_default_",
    };
  },
  apollo: {
    message: {
      query,
      variables: { id: 1 },
      update(data) {
        console.log("data", data);
        return data ? data.message : undefined;
      },
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
