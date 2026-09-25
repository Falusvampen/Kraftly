<template>
  <section v-if="show" class="card norway" role="region" aria-labelledby="norway-notice-title">
    <h2 id="norway-notice-title">Kraftly kommer till Norge</h2>
    <p>
      Under våren lanserar vi i Norge. Har du abonnemang på båda sidor gränsen kommer du snart kunna
      se förbrukning och fakturor för båda här på Mina sidor.
    </p>
  </section>
</template>

<script setup>
import { isEnabled } from '@utils/features';
/**
 * Registrerar tillgängliga props för komponenten.
 *
 * - show (Boolean): Styr om komponenten ska visas eller döljas.
 *   Om parametern utelämnas anropas standardfunktionen isEnabled('norway').
 */
defineProps({
  show: {
    type: Boolean,
    default: () => isEnabled('norway'),
  },
});
</script>

<style scoped>
.norway {
  border-left: 4px solid #ba0c2f;
}
</style>
