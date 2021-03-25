<template>
    <vue-form-generator :schema="formSchema" :model="document">
    </vue-form-generator>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
import VueFormGenerator from "vue-form-generator";

import Vue from "vue";
import JsonFormInput from "../components/JsonFormInput.vue";
import DateTimeFormInput from "../components/DateTimeFormInput.vue";
Vue.component("field-jsonFormInput", JsonFormInput);
Vue.component("field-dateTimeFormInput", DateTimeFormInput);

export default {
  name: "Form",
  components: {
    VueFormGenerator: VueFormGenerator.component,
  },
   props: {
    formSchema: {
      type: Object,
      required: true,
    }
   },
  setup(props, ctx) {
    let document = ref({});
    return {
      document
    };
  },
};
</script>

<style lang="sass" scoped>
</style>
