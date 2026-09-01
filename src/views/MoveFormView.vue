<template>
  <div>
    <h1>Flyttanmälan</h1>

    <div v-if="reference" class="success-card">
      <h2>Tack för din anmälan!</h2>
      <p>Vi har tagit emot din flyttanmälan.</p>
      <p class="reference-number">
        Referensnummer: <strong>{{ reference }}</strong>
      </p>
    </div>

    <MoveForm v-else @submit="handleMoveSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MoveForm from '../components/MoveForm.vue';
import { submitMove } from '../services/api';

const reference = ref(null);

const handleMoveSubmit = async (formData) => {
  const res = await submitMove(formData);
  reference.value = res.ref;
};
</script>

<style scoped>
.success-card {
  max-width: 560px;
  padding: 24px;
  border-radius: 8px;
  background-color: #ecfdf3;
  border: 1px solid #a6f4c5;
}

.reference-number {
  color: #027a48;
  margin-top: 12px;
  font-size: 1.1rem;
}
</style>
