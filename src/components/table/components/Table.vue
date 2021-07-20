<template>

  <b-container fluid class="d-flex flex-column">
    <div class="d-flex flex-row mb-1">
      <div class="flex-grow-1 mr-1">
        <b-input-group prepend="Search" v-if="filterable" >
          <b-form-input
            v-model="filter"
            data-cy="table-text-filter"
            type="search"
            placeholder="Type to Filter"
            @input="onFiltered"
          ></b-form-input>
        </b-input-group>
      </div>
      <b-input-group class="perPageSelect" prepend="Per page">
        <b-form-select
          v-model="_perPage"
          data-cy="table-pagination-selector"
          :options="pageOptions"
          @change="onPerPageChanged"
        ></b-form-select>
      </b-input-group>
    </div>
    <!-- A note about the conditional .h-1 class. This is a veri ugli CSS ack.
    In some cases, we want the table to take the full available height in the
    parent, but setting stickyHeader: "100%" won't work because the implementation
    of BootstrapVue wraps the table in a div with max-height: 100%, which will
    fall back to max-height: none if the parent has not an explicit height (which
    is the case for flexboxed parents). BY PURE CHANCE, we noticed that setting
    whatever height on the flexboxed parent AND max-height: 100% on the wrapper,
    makes the table behave exactly as wanted: keep the sticky header and fill
    the availeble height. If anybody can explain this, I'll be interested (Luca). -->
    <div class="flex-grow-1" :class="{'h-1': stickyHeader === '100%'}">
      <b-table
        :sticky-header="stickyHeader"
        class="m-0 p-0"
        data-cy="table"
        v-bind="mergedOptions"
        :items="items"
        :fields="fields"
        @sort-changed="onSortChanged"
        @row-selected="onRowSelected"
      >
        <template
          v-for="slotName of Object.keys($scopedSlots)"
          v-slot:[slotName]="slotScope"
        >
          <slot :name="slotName" v-bind="slotScope"></slot>
        </template>
      </b-table>
    </div>
    <b-pagination
      v-model="_currentPage"
      :total-rows="totalRows"
      size="sm"
      class="mt-2"
      :per-page="_perPage"
    ></b-pagination>

  </b-container>
</template>

<script>
import { ref, watch, reactive, computed } from "@vue/composition-api";

export default {
  name: "Table",
  props: {
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    filterable: {
      type: Boolean,
      required: false,
      default: false,
    },
    currentPage: {
      type: Number,
      required: false,
      default: 1,
    },
    perPage: {
      type: Number,
      required: false,
      default: 10,
    },
    pageOptions: {
      type: Array,
      required: false,
      default: () => [10, 40, 60, 100],
    },
    totalRows: {
      type: Number,
      required: false,
      default: 0,
    },
    tableOptions: {
      type: Object,
      required: false,
      default: () => {},
    },
    stickyHeader: {
      required: false,
      default: true,
    },
  },
  setup(props, { emit }) {
    let _currentPage = ref(props.currentPage);
    let _perPage = ref(props.perPage);

    const defaultTableOptions = {
      striped: true,
      hover: true,
      bordered: true,
      small: true,
      selectable: false,
      responsive: "sm",
      borderless: true,
      "no-border-collapse": true,
      "no-sort-reset": true,
      "no-local-sorting": true,
      "show-empty": true,
      "sort-icon-left": true,
    };

    watch(_currentPage, (value) => {
      emit("page-changed", value);
    });

    const mergedOptions = computed(() => {
      return { ...props.tableOptions, ...defaultTableOptions };
    });

    return {
      filter: ref(""),
      _currentPage,
      _perPage: reactive(props.perPage),
      mergedOptions,
      onSortChanged: (data) => {
        emit("sort-changed", data);
      },
      onRowSelected: (data) => {
        emit("row-selected", data);
      },
      onFiltered: (filter) => {
        emit("filtered", filter);
      },
      onPerPageChanged: (data) => {
        emit("per-page-changed", data);
      },
    };
  },
};
</script>

<style lang="sass" scoped>
.perPageSelect
  width: 245px
.h-1
  height: 1px
</style>
