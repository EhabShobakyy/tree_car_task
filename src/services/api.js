// src/services/api.js
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";
let userDataCache = {}; // Cache for user data

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const fetchUser = async (userId) => {
  // Check if user data is already cached
  if (userDataCache[userId]) {
    return userDataCache[userId];
  }

  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    const userData = response.data;
    // Cache user data
    userDataCache[userId] = userData;
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    return {};
  }
};
