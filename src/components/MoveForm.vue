<template>
  <form @submit.prevent="handleSubmit" class="card" style="max-width: 560px">
    <p style="margin-bottom: 14px">Fyll i uppgifterna nedan så flyttar vi ditt elavtal.</p>

    <BaseInput v-model="form.address" placeholder="Ny adress" :error="errors.address" />

    <BaseInput v-model="form.zip" placeholder="Postnummer" :error="errors.zip" />

    <BaseInput v-model="form.city" placeholder="Ort" :error="errors.city" />

    <BaseInput
      v-model="form.date"
      placeholder="Inflyttningsdatum (ÅÅÅÅ-MM-DD)"
      :error="errors.date"
    />

    <div class="input-group">
      <select v-model="form.contract" :class="{ 'input-error': errors.contract }">
        <option disabled value="">Välj avtal</option>
        <option>Rörligt pris</option>
        <option>Fast pris 1 år</option>
        <option>Fast pris 3 år</option>
      </select>
      <p v-if="errors.contract" class="error-message">{{ errors.contract }}</p>
    </div>

    <BaseButton type="submit">Skicka flyttanmälan</BaseButton>
    <p class="hint" style="margin-top: 8px">Anmälan måste göras senast 14 dagar före flytt</p>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import validateMove from '../utils/validateMove.js';

const emit = defineEmits(['submit']);

const form = reactive({
  address: '',
  zip: '',
  city: '',
  date: '',
  contract: '',
});

const errors = reactive({
  address: null,
  zip: null,
  city: null,
  date: null,
  contract: null,
});

const handleSubmit = () => {
  const validationErrors = validateMove(form);
  Object.assign(errors, validationErrors);

  const hasErrors = Object.values(errors).some((err) => err !== null);
  if (hasErrors) {
    return;
  }

  // Skickar en grund kopia av formulärdatat (immutability) så att föräldrakomponenten
  // inte "muterar" (ändrar) formulärets interna state.
  emit('submit', { ...form });
};
</script>

<style scoped>
.input-group {
  margin-bottom: 12px;
}

select {
  width: 100%;
  box-sizing: border-box;
}

.input-error {
  border-color: #d92d20;
}

.error-message {
  color: #d92d20;
  font-size: 0.85rem;
  margin: 4px 0 0;
}
</style>
