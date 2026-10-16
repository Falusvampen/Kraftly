<template>
  <span :class="['status-chip', resolvedStatus === 'Betald' ? 'status-betald' : 'status-obetald']">
    {{ resolvedStatus }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // Stöder den befintliga koden och enhetstesterna: <StatusChip status="Betald" />
  status: {
    type: String,
    default: null,
  },
  // Stöder de nya kraven från Storybook och a11y-testet: <StatusChip :invoice="{ status: 'Betald' }" />
  invoice: {
    type: Object,
    default: null,
  },
});

// Hämtar status oavsett hur anroparen valde att skicka in datan
const resolvedStatus = computed(() => {
  return props.status || props.invoice?.status || '';
});
</script>

<style scoped>
.status-chip {
  display: inline-block;
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
