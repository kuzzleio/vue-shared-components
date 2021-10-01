import Vue from 'vue';
import { ToastPlugin } from 'bootstrap-vue';
Vue.use(ToastPlugin);

export const errorMixin = {
  // components: {
  //   BToast
  // },
  methods: {
    handleError: function(error) {
      this.$bvToast.toast(error.message, {
        title: 'Error',
        variant: 'danger',
        solid: true
      });
      console.error(error);
    },
    handleWarning: function(error) {
      this.$bvToast.toast(error.message, {
        title: 'Error',
        variant: 'warning',
        solid: true
      });
      console.warn(error);
    }
  }
};
