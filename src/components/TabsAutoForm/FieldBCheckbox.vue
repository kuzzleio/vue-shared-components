<template>
  <b-form-group label-cols="2">
    <template v-slot:label
      ><strong>{{ schema.label }}</strong></template
    >
    <b-form-checkbox v-model="value" :data-cy="`Field__${schema.name}`" />
  </b-form-group>
</template>

<script>
import { abstractField } from 'vue-form-generator';
import { BFormCheckbox, BFormGroup } from 'bootstrap-vue';
export default {
  name: 'fieldBootstrapCheckbox',
  mixins: [abstractField],
  components: {
    BFormCheckbox,
    BFormGroup
  }
};
</script>

<style lang="scss">
.field-bootstrap-checkbox > label {
  display: none;
}
.field-bootstrap-checkbox .form-row {
  align-items: center;
}
</style>
