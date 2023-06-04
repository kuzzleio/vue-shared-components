import type { Meta, StoryObj } from '@storybook/vue';

import KButton, { KButtonProps } from './KButton.vue';

type KButtonArgs = KButtonProps & { leftside: string; default: string; click: () => void };

export default {
  component: KButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'danger', 'simple'],
    },
    click: {
      type: 'function',
    },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => ({
    components: {
      KButton,
    },
    setup() {
      return { args };
    },
    template: `
      <KButton v-bind="args">{{ args.default }}</KButton>
    `,
  }),
} satisfies Meta<KButtonArgs>;

type Story = StoryObj<KButtonArgs>;
export const Primary: Story = {
  args: {
    variant: 'primary',
    icon: 'fa-plus',
    default: 'Add Asset',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    icon: 'fa-minus',
    default: 'Remove Asset',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    default: 'Cancel',
  },
};

export const Simple: Story = {
  args: {
    variant: 'simple',
    default: 'Simple Button',
  },
};
