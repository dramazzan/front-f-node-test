<script setup>
import { ref, onMounted } from 'vue';
import api from '../axios';

const user = ref(null);
const originalUser = ref(null); 
const error = ref(null);
const isEditing = ref(false); 
const modified = ref(false);

const fetchUserData = async () => {
  try {
    const response = await api.getUserData();
    user.value = response.user;
    originalUser.value = { ...response.user };
  } catch (err) {
    error.value = err.message || 'Failed to fetch user data';
  }
};

const saveProfile = async () => {
  try {
    await api.updateUserData(user.value);
    originalUser.value = { ...user.value }; 
    modified.value = false;
    isEditing.value = false;
  } catch (err) {
    error.value = err.message || 'Failed to save user data';
  }
};

const checkModified = () => {
  modified.value = 
    user.value.name !== originalUser.value.name ||
    JSON.stringify(user.value) !== JSON.stringify(originalUser.value);
};

onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <main class="container">
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="user" class="profile-card">
      <div class="avatar">
        <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
        <div v-else class="avatar-placeholder">?</div>
      </div>

      <div class="user-info">
        <template v-if="!isEditing">
          <h2>{{ user.name }}</h2>
          <p class="user-email">{{ user.email }}</p>
          <button 
            class="edit-btn" 
            @click="isEditing = true"
          >
            Edit Profile
          </button>
        </template>

        <template v-else>
          <input 
            type="text" 
            v-model="user.name" 
            @input="checkModified"
            class="name-input"
          />
          <p class="user-email">{{ user.email }}</p>
          <div class="button-group">
            <button 
              class="save-btn" 
              @click="saveProfile"
              :disabled="!modified"
            >
              Save
            </button>
            <button 
              class="cancel-btn" 
              @click="() => {
                user.value = { ...originalUser.value };
                isEditing = false;
                modified = false;
              }"
            >
              Cancel
            </button>
          </div>
        </template>
      </div>
    </div>

    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.profile-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #007bff;
  margin-right: 20px;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
}

.user-info {
  flex: 1;
}

.user-info h2 {
  margin: 0 0 10px;
  font-size: 20px;
  color: #333;
}

.user-email {
  font-size: 14px;
  color: #777;
  margin: 5px 0 15px;
}

.name-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.edit-btn,
.save-btn,
.cancel-btn {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  border: none;
}

.edit-btn,
.save-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn:hover,
.save-btn:hover {
  background-color: #0056b3;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background-color: #545b62;
}

.error {
  color: #dc3545;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f8d7da;
  border-radius: 4px;
  text-align: center;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>