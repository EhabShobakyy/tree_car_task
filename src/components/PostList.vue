<template>
  <div class="main">
    <v-container>
      <v-row>
        <v-col cols="12">
          <PostCard v-if="currentPost" :post="currentPost" />
        </v-col>
      </v-row>
      <v-row class="btn-section">
        <v-btn color="red" @click="previousPost" :disabled="currentIndex === 0">Previous</v-btn>
        <v-btn @click="nextPost" :disabled="currentIndex === posts.length - 1">Next</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostCard from './PostCard.vue';
import { fetchPosts, fetchUser } from '../services/api';

export default {
  name: 'PostList',
  components: {
    PostCard,
  },
  data() {
    return {
      posts: [],
      currentIndex: 1,
      loaded: false, // Flag to track whether data has been loaded
    };
  },
  computed: {
    currentPost() {
      return this.posts[this.currentIndex];
    },
  },
  async mounted() {
      await this.loadPostsAndUserDetails(); // Load data only if it hasn't been loaded
  },
  methods: {
    async loadPostsAndUserDetails() {
      try {
        this.posts = await fetchPosts();
        await this.loadUserDetails()
        this.loaded = true; // Set flag to true after loading data
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    async loadUserDetails() {
      for (let i = 0; i < this.posts.length; i++) {
        const user = await fetchUser(this.posts[i].userId);
        this.posts[i].user = user;
      }
    },
    nextPost() {
      if (this.currentIndex < this.posts.length - 1) {
        this.currentIndex++;
      }
    },
    previousPost() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  display: flex;
  align-items: center !important;
}
.btn-section {
  justify-content: space-between !important;
}
</style>
