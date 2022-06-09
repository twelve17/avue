<template>
  <p>
    Message: {{ message }}<br />
    Computed Message Substring: {{ messageSubstr }}<br />
  </p>
</template>

<script>
import gql from "graphql-tag";

const query = gql`
  query getMessage($id: Int!) {
    message(id: $id) {
      id
      text
    }
  }
`;

export default {
  name: "App",
  computed: {
    messageSubstr() {
      console.log("computed.messageSubstr called. this.message:", this.message)
      return this.message?.text?.substr(0, 2);
    },
  },
  data() {
    return {
      message: {},
    };
  },
  apollo: {
    message: {
      query,
      variables: { id: 2 },
      update(data) {
        console.log("data", data);
        return data ? data.message : undefined;
      },
      manual: false,
      result ({ data }, key) {
        console.log('apollo.result() called, key: ', key, ',data:', data)
        this.message = data.message;
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
