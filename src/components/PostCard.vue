<template>
  <v-card v-if="post.user">
    <v-img :src="postImageUrl" height="300" class="mb-3"></v-img>
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-text class="user-info">
      <div> Name : {{ userInfo.name }}</div>
      <div>Phone Number :  {{userInfo.phone}}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="white" class="read-btn"> Read More</v-btn>
    </v-card-actions>
  </v-card>
  <v-card v-else>
    <v-img src="" height="300" class="mb-3"></v-img>
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-text>Loading...</v-card-text>
  </v-card>
</template>

<script>

import { fetchUser } from '../services/api';
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  async mounted () {
     this.userInfo = await fetchUser(this.default)
  },
   data() {
     return {
    userInfo : [],
    default : 1,
   }},
  computed: {
    postImageUrl() {
      return `https://picsum.photos/600/300/?image=${this.post.id}`;
    },

  },
  watch: {
    post: {
     async handler(nv) {
        console.log(nv);
         this.userInfo = await fetchUser(nv.id);
        console.log("user",this.userInfo);
         
        // Update computed properties when post prop changes
        this.$forceUpdate();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.read-btn { 
  background-color: gray;
}
::v-deep .v-btn__content {
  color: white !important;
  font-weight: 500;
}
.user-info { 
font-weight: bold;  
}
</style>
