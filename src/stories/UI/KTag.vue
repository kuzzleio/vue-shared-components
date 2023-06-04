<template>
  <p class="tw-inline-block tw-rounded-full tw-bg-tertiary tw-p-2">
    <!-- @slot test -->
    <slot />
  </p>
</template>

<script lang="ts" setup>
// Props
export interface KTagProps {}
defineProps<KTagProps>();
</script>
