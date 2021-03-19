# vue-shared-components

## Install

`npm i "git+ssh://git@github.com:kuzzleio/vue-shared-components.git"`

In your main Vue.js entrypoint:

```javascript
import VueSharedComponents from "vue-shared-components";

Vue.use(VueSharedComponents);
```

## Components

### Table

```html
<table
  class="p-0 text-left"
  :items="items"
  :fields="fields"
  :filterable="true"
  :current-page="currentPage"
  :per-page="perPage"
  :total-rows="totalRows"
  :tableOptions="tableOptions"
  @sort-changed="onSortChanged"
  @row-selected="handleEvent"
  @filtered="onFilterChanged"
  @page-changed="onPageChanged"
  @per-page-changed="onPerPageChanged"
/>
```

| Name         | Type    | Description                                                               |
| :----------- | :------ | :------------------------------------------------------------------------ |
| items        | Array   | https://bootstrap-vue.org/docs/components/table#items-record-data         |
| fields       | Array   | https://bootstrap-vue.org/docs/components/table#fields-column-definitions |
| filterable   | Boolean | Set to `true` to add a search input text fields to filter table result    |
| current-page | Integer | The current viewed page, for the pagination widget                        |
| per-page     | Integer | Number of row displayed per page                                          |
| total-rows   | Integer | Total rows number, for the pagination widget                              |
| tableOptions | Object  | Used to override bootstrap table default options                          |

More info : https://bootstrap-vue.org/docs/components/table

### Map

```html
<map>
  <template v-slot:marker>
    <v-marker-cluster ref="myCluster">
      <l-marker
        v-for="marker of markers"
        :key="marker.id"
        :name="marker.name"
        v-bind:lat-lng="marker.location"
        v-bind:options="{ id: marker.id }"
        :icon="marker.icon"
        :ref="marker.id"
      >
        <MapPopup>
          <template v-slot:content>Your content here</template>
        </MapPopup>
      </l-marker>
    </v-marker-cluster>
  </template>
</map>
```

More info : https://vue2-leaflet.netlify.app/quickstart/#usage

### MapPopup

```html
<MapPopup :popupOptions="popupOptions">
  <template v-slot:content>Your content here</template>
</MapPopup>
```

| Name         | Type   | Description                                             |
| :----------- | :----- | :------------------------------------------------------ |
| popupOptions | Object | https://leafletjs.com/reference-1.7.1.html#popup-option |

## Services

### Form-schema-service

Allows to generate a form schema to generate automatic form, using an ES mapping and a document.
More info: https://github.com/vue-generators/vue-form-generator

```javascript
import { FormSchemaService } from "vue-shared-components";

const formSchemaService = new FormSchemaService();

const formSchema = formSchemaService.generate(mapping, document);
```

### Mapping-fields-service

Used to generate Table fields from an ES mapping.

```javascript
import { MappingFieldsService } from "vue-shared-components";

const mappingFieldsService = new MappingFieldsService();

const fields = mappingFieldsService.getFieldsForTable(mapping);
```
