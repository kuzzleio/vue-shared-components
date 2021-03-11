# vue-shared-components

## Install

`$ npm i https://github.com/kuzzleio/vue-shared-components`

In your main Vue.js entrypoint:

```
import VueSharedComponents from 'vue-shared-components';

Vue.use(VueSharedComponents);
```

## Components

### Table

```
<Table
  class="p-0 text-left"
  :items="items"
  :fields="fields"
  :filterable="true"
  :selectable="true"
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

##### Props

| Name         | Type    | Description                                                               |
| :----------- | :------ | :------------------------------------------------------------------------ |
| items        | Array   | https://bootstrap-vue.org/docs/components/table#items-record-data         |
| fields       | Array   | https://bootstrap-vue.org/docs/components/table#fields-column-definitions |
| filterable   | Boolean | Set to `true` to add a search input text fields to filter table result    |
| selectable   | Boolean | When set, places the table body rows in selectable mode                   |
| current-page | Integer | The current viewed page, for the pagination widget                        |
| per-page     | Integer | Number of row displayed per page                                          |
| total-rows   | Integer | Total rows number, for the pagination widget                              |
| tableOptions | Object  | Used to override bootstrap table default options                          |

More info : https://bootstrap-vue.org/docs/components/table

### Map

[...]

### MapPopup

[...]

## Services

### Form-schema-service

Allows to generate a form schema to generate automatic form, using an ES mapping and a document.
More info: https://github.com/vue-generators/vue-form-generator

##### Usage

```
import {  FormSchemaService } from 'vue-shared-components';

const formSchemaService = new FormSchemaService();

const formSchema = formSchemaService.generate(mapping, document)

```

### Mapping-fields-service

Used to generate Table fields from an ES mapping.

##### Usage

```
import {  MappingFieldsService } from 'vue-shared-components';

const mappingFieldsService = new MappingFieldsService();

const fields = mappingFieldsService.getFieldsForTable(mapping)

```
