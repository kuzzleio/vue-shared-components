<template>
  <div
    class="tw-inline-block tw-space-x-1 tw-rounded tw-border-2 tw-px-3 tw-py-1 tw-text-center tw-text-base tw-transition-all"
    :class="[
      {
        'tw-border-primary tw-bg-primary tw-text-white hover:tw-contrast-125':
          variant === 'primary',
        'tw-border-white tw-text-white hover:tw-bg-white hover:tw-text-secondary':
          variant === 'secondary',
        'tw-border-primary tw-text-primary hover:tw-bg-primary hover:tw-text-white':
          variant === 'danger',
        'tw-border-none tw-bg-transparent tw-text-current': variant === 'simple',
      },
      // 'tw-border-white tw-bg-transparent',
      disabled ? 'tw-cursor-not-allowed tw-select-none tw-contrast-50' : 'tw-cursor-pointer',
    ]"
    @click="onClick"
  >
    <!-- @slot Slot for custom icon use -->
    <slot name="leftside">
      <FontAwesomeIcon v-if="icon !== null" :icon="['fa', icon]" />
    </slot>

    <p v-if="$slots.default?.[0].text" class="tw-inline-block">
      <!-- @slot Label for the button -->
      <slot />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Props
export interface KButtonProps {
  /**
   * Button's variant
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'simple';
  /**
   * Is the button clickable
   */
  disabled?: boolean;
  /**
   * Fontawesome icon in the leftside slot
   */
  icon?: string | null;
}
const props = withDefaults(defineProps<KButtonProps>(), {
  variant: 'primary',
  disabled: false,
  icon: null,
});

// Emits
interface EmitTypes {
  /**
   * Emitted on click
   */
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  (name: 'click'): void;
}
const emit = defineEmits<EmitTypes>();

// Functions
function onClick(): void {
  if (!props.disabled) {
    emit('click');
  }
}
</script>
