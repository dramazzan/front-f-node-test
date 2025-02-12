<script setup>
import { ref } from 'vue';
import api from '../axios.js';
import { useRouter } from 'vue-router';  

const router = useRouter()

const login = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const submitLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await api.loginUser(login.value, password.value);
    localStorage.setItem('token', response.token);
    console.log(response.token);
    if(response.success){
    router.push('/');
    }
  } catch (err) {
    error.value = err.response?.data?.msg || 'An error occurred';
    console.log(err)
  } finally {
    loading.value = false;
  }
};
</script>


<template>
  <main>
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="submitLogin">
        <div class="input-group">
          <label for="login">Login:</label>
          <input v-model="login" type="text" id="login" required />
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit" :disabled="loading">Login</button>
      </form>

      <div class="links">
        <p>Don't have an account?</p>
        <router-link to="/register">Sign Up</router-link>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

}

.login-box {
  width: 350px;
  padding: 25px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-box h2 {
  margin-bottom: 15px;
  color: #333;
}

.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 12px;
}

.input-group label {
  font-size: 14px;
  color: #444;
  margin-bottom: 5px;
}

.input-group input {
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  transition: 0.3s;
}

.input-group input:focus {
  border-color: #0984e3;
  background: #fff;
  outline: none;
  box-shadow: 0px 0px 5px rgba(9, 132, 227, 0.5);
}

button {
  width: 100%;
  padding: 12px;
  background: #0984e3;
  border: none;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #0652dd;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.links {
  margin-top: 10px;
  font-size: 14px;
}

.links p {
  margin-bottom: 5px;
  color: #555;
}

.links a {
  color: #0984e3;
  text-decoration: none;
  font-weight: bold;
}

.links a:hover {
  text-decoration: underline;
}

.error {
  margin-top: 10px;
  color: red;
  font-size: 14px;
}
</style>

