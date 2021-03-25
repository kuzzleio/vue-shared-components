import MapComponent from "./src/components/map/components/Map";
import MapPopupComponent from "./src/components/map/components/Popup";

import TableComponent from "./src/components/table/components/Table";

import FormComponent from "./src/components/form/components/Form.vue";
import JSONEditorComponent from "./src/components/form/components/JSONEditor.vue";
import JsonFormInputComponent from "./src/components/form/components/JsonFormInput.vue";
import DateTimeFormInputComponent from "./src/components/form/components/DateTimeFormInput.vue";

import MappingFields from "./src/services/MappingFields";
import FormSchema from "./src/services/FormSchema";

export default {
  install(Vue) {
    Vue.component("Map", MapComponent);
    Vue.component("MapPopup", MapPopupComponent);
    Vue.component("Table", TableComponent);
    Vue.component("Form", FormComponent);
    Vue.component("JSONEditor", JSONEditorComponent);
    Vue.component("JsonFormInput", JsonFormInputComponent);
    Vue.component("DateTimeFormInput", DateTimeFormInputComponent);
  },
};

export const FormSchemaService = FormSchema;
export const MappingFieldsService = MappingFields;
