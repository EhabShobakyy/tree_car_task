<!-- src/App.vue -->
<template>
  <div id="app">
    <PostList />
  </div>
</template>

<script>
import PostList from './components/PostList.vue';

export default {
  name: 'App',
  components: {
    PostList,
  },
};
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
}
</style>