// import Vue from 'vue';
import type { Meta, StoryObj } from '@storybook/vue';

import KTag, { KTagProps } from './KTag.vue';

type KTagArgs = KTagProps & { default: string };

// const render = (component: Vue) => {
//   const name = component.__name;
//   return (args) => ({
//     components: {
//       component,
//     },
//     setup() {
//       return { args };
//     },
//     template: `<${name} v-bind="$">{{ args.default }}</${name}>`,
//   });
// };
// console.log(render(KTag)({}));

export default {
  component: KTag,
  tags: ['autodocs'],
  // render: (args) => ({
  //   components: {
  //     KButton,
  //   },
  //   setup() {
  //     return { args };
  //   },
  //   template: `
  //     <KButton v-bind="args">{{ args.default }}</KButton>
  //   `,
  // }),
} satisfies Meta<KTagArgs>;

type Story = StoryObj<KTagArgs>;
export const Measure: Story = {
  args: {},
};
