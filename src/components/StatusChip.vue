<template>
  <span :class="['status-chip', status === 'Betald' ? 'status-betald' : 'status-obetald']">
    {{ status }}
  </span>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    required: true, // "Betald" eller "Obetald"
  },
});
</script>

<style scoped>
.status-chip {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.status-betald {
  background-color: #e6f4ea;
  color: #137333;
}

.status-obetald {
  background-color: #fce8e6;
  color: #c5221f;
}
</style>
