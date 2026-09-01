<template>
  <div class="input-group">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      :aria-invalid="!!error"
      :class="{ 'input-error': error }"
      v-bind="$attrs"
    />
    <p v-if="error" class="error-message" role="alert">{{ error }}</p>
  </div>
</template>

<script setup>
// Hindrar attribut (t.ex. autocomplete, disabled) från att ärvas av wrapper-diven.
// De binds istället explicit direkt på <input>-elementet via v-bind="$attrs".
defineOptions({
  inheritAttrs: false,
});

const model = defineModel();

defineProps({
  id: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  error: {
    type: String,
    default: null,
  },
});
</script>

<style scoped>
.input-group {
  margin-bottom: 12px;
}

.input-label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 4px;
  font-weight: 500;
}

input {
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
