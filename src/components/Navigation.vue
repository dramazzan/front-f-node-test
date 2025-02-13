<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(!!localStorage.getItem('token'));

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token');
});

const logout = () => {
  localStorage.removeItem('token');
  isAuthenticated.value = false;
  router.push('/login');
};
</script>

<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li><router-link to="/" class="nav-link">Home</router-link></li>
      <li><router-link to="/profile" class="nav-link">Profile</router-link></li>
      <li v-if="!isAuthenticated">
        <router-link to="/login" class="nav-link login">Login</router-link>
      </li>
      <li v-else>
        <button @click="logout" class="logout-button">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
    background: #f0f0f0;
  padding: 15px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

.nav-list li {
  display: inline-block;
}

.nav-link {
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 5px;
  color: #000;
  transition: background 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-button:hover {
  background-color: #c0392b;
}

.login {
  background-color: #3498db;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background 0.3s;
}

.login:hover {
  background-color: #2980b9;
}
</style>
