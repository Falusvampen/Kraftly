<template>
  <div class="login-wrap">
    <div class="card login-card">
      <img src="@/assets/logo-dark.svg" class="login-logo" />
      <h1>Logga in på Mina sidor</h1>
      <input type="text" placeholder="E-postadress" v-model="email" />
      <input type="password" placeholder="Lösenord" v-model="password" />
      <button class="btn" style="width: 100%" @click="handleLogin">Logga in</button>
      <p v-if="errorMessage" role="alert">
        {{ errorMessage }}
      </p>
      <p class="hint" style="margin-top: 10px">
        Problem att logga in? Ring kundservice 020-123 456
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/api';
import { setAccessToken } from '@/services/token';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const data = await login(email.value, password.value);
    setAccessToken(data.token);
    router.push('/');
  } catch {
    errorMessage.value = 'Fel e-postadress eller lösenord.';
  }
};
</script>

<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}

.login-card {
  width: 380px;
}

.login-logo {
  height: 34px;
  margin-bottom: 18px;
}
</style>
