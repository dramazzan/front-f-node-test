<script setup>
import { ref } from 'vue';
import api from '../axios.js'; 
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref({
  name: '',
  email: '',
  login: '',
  password: ''
});

const password2 = ref('');
const errors = ref({}); // Объект для хранения ошибок валидации
const loading = ref(false);

const submitRegister = async () => {
  loading.value = true;
  errors.value = {}; // Сбрасываем ошибки перед отправкой

  try {
    // Проверка пароля на клиенте
    if (user.value.password !== password2.value) {
      errors.value.password2 = "Passwords do not match";
      loading.value = false;
      return;
    }if(user.value.password.length < 6){
        errors.value.password2 = "The password should be longer";
        errors.value.password = "The password should be longer"
        loading.value = false;
        return;
    }


    const response = await api.registerUser(user.value);
    console.log(response);

    if (response.success) {
      router.push('/login');
    }
  } catch (err) {
    if (err.response?.data?.errors) {
      // Записываем ошибки от сервера
      err.response.data.errors.forEach(error => {
        errors.value[error.path] = error.msg;
      });
    } else {
      errors.value.general = err.response?.data?.msg || 'An error occurred';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main>
    <div class="register-box">
      <h2>Register</h2>
      <form @submit.prevent="submitRegister">
        <div class="input-group" :class="{ 'error-border': errors.name }">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="user.name" required />
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>
        <div class="input-group" :class="{ 'error-border': errors.email }">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
        </div>
        <div class="input-group" :class="{ 'error-border': errors.login }">
          <label for="login">Login:</label>
          <input v-model="user.login" type="text" id="login" required />
          <p v-if="errors.login" class="error">{{ errors.login }}</p>
        </div>
        <div class="input-group" :class="{ 'error-border': errors.password }">
          <label for="password">Password:</label>
          <input v-model="user.password" type="password" id="password" required />
          <p v-if="errors.password" class="error">{{ errors.password }}</p>
        </div>
        <div class="input-group" :class="{ 'error-border': errors.password2 }">
          <label for="password2">Confirm Password:</label>
          <input type="password" id="password2" v-model="password2" required />
          <p v-if="errors.password2" class="error">{{ errors.password2 }}</p>
        </div>
        <button type="submit" :disabled="loading">Register</button>
      </form>

      <p v-if="errors.general" class="error general">{{ errors.general }}</p>
    </div>
  </main>
</template>

<style scoped>
/* Общие стили */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

/* Фон */
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Контейнер формы */
.register-box {
  width: 350px;
  padding: 25px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.register-box h2 {
  margin-bottom: 15px;
  color: #333;
}

/* Поля ввода */
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

/* Красная граница для полей с ошибками */
.error-border input {
  border: 1px solid red !important;
}

/* Кнопка */
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

/* Ошибки */
.error {
  margin-top: 5px;
  color: red;
  font-size: 12px;
}

.general {
  margin-top: 10px;
  font-size: 14px;
}
</style>
