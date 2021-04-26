<template>
  <b-form-group label-cols="2">
    <template v-slot:label
      ><strong>{{ schema.label }}</strong></template
    >
    <b-form-input
      v-model="value"
      :data-cy="`Field__${schema.name}`"
      :placeholder="schema.placeholder"
      :type="schema.inputType"
    />
  </b-form-group>
</template>

<script>
import { abstractField } from 'vue-form-generator';
import { BFormInput, BFormGroup } from 'bootstrap-vue';
export default {
  name: 'fieldBootstrapInput',
  mixins: [abstractField],
  components: {
    BFormInput,
    BFormGroup
  }
};
</script>

<style lang="scss">
.field-bootstrap-input > label {
  display: none;
}
</style>
