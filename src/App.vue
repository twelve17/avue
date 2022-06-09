<template>
  <p>
    Message: {{ message }}<br />
    Computed Message Substring: {{ messageLetter }}<br />
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
    messageLetter() {
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
      variables: { id: 1 },
      update(data) {
        console.log("data", data);
        return data ? data.message : undefined;
      },
      manual: false,
      result ({ data }) {
        console.log('We got some result!', data)
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
