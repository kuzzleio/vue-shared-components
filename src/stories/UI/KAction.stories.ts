import type { Meta, StoryObj } from '@storybook/vue';

import KAction, { KActionProps } from './KAction.vue';

type KActionArgs = KActionProps & { default: string };

export default {
  component: KAction,
  tags: ['autodocs'],
  render: (args) => ({
    components: {
      KAction,
    },
    setup() {
      return { args };
    },
    template: `
      <KAction v-bind="args">{{ args.default }}</KAction>
    `,
  }),
} satisfies Meta<KActionArgs>;

type Story = StoryObj<KActionArgs>;
export const Measure: Story = {
  args: {
    default: 'test',
  },
};
