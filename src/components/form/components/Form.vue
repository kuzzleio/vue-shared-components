<template>
  <vue-form-generator :schema="formSchema" :model="model"> </vue-form-generator>
</template>

<script>
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
    },
    model: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
};
</script>

<style lang="sass" scoped></style>
