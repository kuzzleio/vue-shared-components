import MapComponent from "./src/components/map/components/Map";
import MapPopupComponent from "./src/components/map/components/Popup";
import TableComponent from "./src/components/table/components/Table";

import FormSchema from "./src/services/FormSchema";
import MappingFields from "./src/services/MappingFields";

export default {
  install(Vue) {
    Vue.component("Map", MapComponent);
    Vue.component("MapPopup", MapPopupComponent);
    Vue.component("Table", TableComponent);
  },
};

export const FormSchemaService = FormSchema;
export const MappingFieldsService = MappingFields;
