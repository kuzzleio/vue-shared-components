<template>
  <b-container class="mt-3">
    <b-row class="mb-3">
      <b-col class="text-left">
        <h1>Form</h1>
      </b-col>
    </b-row>
    <Form :formSchema="formSchema" />
  </b-container>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";

import MappingFields from "@/services/MappingFields";
import FormSchemaService  from "@/services/FormSchema";

import Form from "../components/Form.vue"

export default {
  name: "FormView",
  components: {
    Form
  },
  setup(props, ctx) {
    const mappingFieldsService = new MappingFields();
    const formSchemaService = new FormSchemaService();
    const items = reactive([]);
    let formSchema = ref({});
    let fields = ref([]);
    let document = ref({});

    const fetchMapping = () => {
          ctx.root.$kuzzle.collection
            .getMapping("tenant1", "asset", {
              includeKuzzleMeta: false,
            })
            .then((mapping) => {
              fields.value = mappingFieldsService.getFieldsForTable(mapping);
              fields.value.push({
                key: "actions",
                label: "Actions",
                sortable: false,
              });
              formSchema.value = formSchemaService.generate(
                mapping.properties,
                document.value
              );
        });
    };

    fetchMapping();
    return {
      fields,
      formSchema,
      document,
    };
  },
};
</script>

<style lang="sass" scoped>
</style>
