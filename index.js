import MapComponent from "./src/components/map/components/Map";
import MapPopupComponent from "./src/components/map/components/Popup";

import TableComponent from "./src/components/table/components/Table";

import FormComponent from "./src/components/form/components/Form.vue";
import JsonEditorComponent from "./src/components/form/components/JsonEditor.vue";
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
    Vue.component("JsonEditor", JsonEditor);
    Vue.component("JsonFormInput", JsonFormInputComponent);
    Vue.component("DateTimeFormInput", DateTimeFormInputComponent);
  },
};

export const FormSchemaService = FormSchema;
export const MappingFieldsService = MappingFields;
