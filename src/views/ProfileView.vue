<script setup>
import { ref, onMounted } from 'vue';
import api from '../axios'; // Убедись, что путь к api правильный

const user = ref(null);
const error = ref(null);

const fetchUserData = async () => {
  try {
    const response = await api.getUserData();
    user.value = response.user;
  } catch (err) {
    error.value = err.message || 'Failed to fetch user data';
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <div class="user-container">
    <h2>User Profile</h2>
    <div v-if="user">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Login:</strong> {{ user.login }}</p>
    </div>
    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
.user-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  text-align: center;
}

.error {
  color: red;
}
</style>
