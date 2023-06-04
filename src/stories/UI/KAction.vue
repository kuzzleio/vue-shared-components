<template>
  <!-- Don't forget the slot in case... -->
  <div>
    <div>
      <FontAwesomeIcon :icon="['fas', icon]" />
    </div>
    <div class="tw-inline-block tw-rounded tw-bg-secondary tw-p-2 tw-text-white">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Props
export interface KActionProps {
  title: string;
  icon: string;
}
defineProps<KActionProps>();
</script>
