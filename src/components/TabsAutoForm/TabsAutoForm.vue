<template>
  <b-card data-cy="TabsAutoForm">
    <template slot="header"
      ><div class="d-flex flex-row align-items-center">
        <div class="flex-grow-1">
          {{ title }}
        </div>
        <b-dropdown
          text="Add..."
          right
          variant="primary"
          :data-cy="`Dropdown-${itemType}`"
        >
          <b-dropdown-item v-if="itemOptions.length === 0">
            No items available
          </b-dropdown-item>
          <b-dropdown-item
            v-for="item in itemOptions"
            :data-cy="`Dropdown-${itemType}__${item.name}`"
            :disabled="item.disabled"
            :key="item.name"
          >
            <!-- TODO onItemClick - add new item and create empty model -->
            {{ item.name }}
            <div class="small text-secondary">{{ item.description }}</div>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </template>
    <div v-if="value.length === 0" class="text-center">
      <h3 class="text-secondary">No items assigned.</h3>
    </div>
    <!-- Refactor this as a generic component -->
    <b-card v-else no-body class="vertical-tabs">
      <b-tabs card vertical :data-cy="`Tabs-${itemType}`" :value="0">
        <template v-slot:tabs-start>
          <span class="text-secondary small mb-2 px-3">Items</span>
        </template>
        <b-tab
          v-for="v in value"
          :data-cy="`Tabs-${itemType}__${v.name}`"
          :key="v.name"
          :title="v.name"
          :title-link-attributes="{
            'data-cy': `Tabs-${itemType}-tab__${v.name}`
          }"
          active
        >
          <template v-if="!getItem(v.name)">
            <div>This item is not exposed by the backend.</div>
            <div class="text-secondary small">
              This means there's probably a problem
            </div>
          </template>
          <template v-else>
            <div class="text-secondary mb-3">
              {{ getItem(v.name).description }}
            </div>
            <div v-if="!argumentSignature(v.name)" class="text-center">
              <h5 class="text-secondary">This item has no arguments.</h5>
            </div>
            <vue-form-generator
              :schema="itemSchema(v.name)"
              :model="argumentValues(v.name)"
              @model-updated="onModelUpdated(model)"
            >
            </vue-form-generator>
          </template>
          <!-- <span v-html="JSON.stringify(model, null, 2)"></span> -->
        </b-tab>
      </b-tabs>
    </b-card>
  </b-card>
</template>

<script>
import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator';
import { generateSchema } from '@/services/formUtils';

import {
  BCard,
  BCardText,
  BTabs,
  BTab,
  BDropdown,
  BDropdownItem
} from 'bootstrap-vue';

import FieldBInput from './FieldBInput';
import FieldBCheckbox from './FieldBCheckbox';
Vue.component('fieldBootstrapInput', FieldBInput);
Vue.component('fieldBootstrapCheckbox', FieldBCheckbox);

export default {
  name: 'TabsAutoForm',
  components: {
    BCard,
    BTabs,
    BTab,
    BDropdown,
    BDropdownItem,
    'vue-form-generator': VueFormGenerator.component
  },
  props: {
    itemType: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    itemList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      model: []
    };
  },
  computed: {
    itemOptions() {
      return this.itemList.map(p => ({
        ...p,
        disabled: !!this.value.find(v => v.name === p.name)
      }));
    },
    getItem() {
      return name => this.itemList.find(i => i.name === name);
    },
    argumentSignature() {
      return name => {
        const itemByName = this.itemList.find(a => a.name === name);
        if (!itemByName) {
          return null;
        }
        if (!itemByName.args) {
          return null;
        }
        return itemByName.args;
      };
    },
    argumentValues() {
      return name => {
        const valueByName = this.model.find(a => a.name === name);
        if (!valueByName) {
          return null;
        }
        if (!valueByName.args) {
          return null;
        }
        return valueByName.args;
      };
    },
    itemSchema() {
      return name => this.generateSchema(this.argumentSignature(name));
    }
  },
  methods: {
    generateSchema,
    onModelUpdated() {
      this.$emit('input', this.model);
    },
    generateModel() {
      this.model = this.value.map(v => ({
        ...v,
        args: VueFormGenerator.schema.createDefaultObject(
          this.itemSchema(v.name),
          v.args
        )
      }));
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.generateModel();
      }
    }
  }
};
</script>

<style lang="scss">
.vertical-tabs {
  .card-header {
    border-right: 1px solid #dee2e6;
  }
  .nav-tabs .nav-link.active {
    border-color: #dee2e6 #fff #dee2e6 #dee2e6;
    border-style: solid;
    border-width: 1px;
    border-radius: 0.25rem 0 0 0.25rem;
    margin-right: -1.33rem;
  }
  .vue-form-generator .form-group {
    margin-bottom: 0.5rem;
  }
}
</style>
