<!-- src/views/HomeView.vue -->
<template>
  <v-container>
    <h1 class="mb-4">Posts</h1>
    <PostList :posts="posts" />
  </v-container>
</template>

<script>
import PostList from '../components/PostList';
import ApiService from '../services/api'; // Import ApiService

export default {
  components: {
    PostList
  },
  data() {
    return {
      posts: []
    };
  },
  async created() {
    this.posts = await this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      // Use ApiService to fetch posts
      return await ApiService.fetchPosts();
    }
  }
};
</script>
