<template>
  <div class="AdvancedFilter" data-cy="AdvancedFilter">
    <div class="AdvancedFilter-predicates">
      <div class="AdvancedFilter-predicate">
        <div
          v-for="(orBlock, orIndex) in filter"
          :key="`orBlock-${orIndex}`"
          class="AdvancedFilter-orBlock"
        >
          <b-card body-bg-variant="light">
            <template v-if="orIndex === filter.length - 1" v-slot:footer>
              <b-button
                variant="outline-secondary"
                :data-cy="`AdvancedFilter-OrBtn--${orIndex}`"
                @click="addOrCondition"
              >
                <i class="fa fa-plus left mr-2" />OR
              </b-button>
            </template>
            <b-row
              align-v="center"
              align-h="center"
              class="mt-1"
              v-for="(andBlock, andIndex) in orBlock"
              no-gutters
              :key="`andBlock-${andIndex}`"
            >
              <b-col xl="11">
                <b-row align-v="center" align-h="center" no-gutters>
                  <b-col cols="11" class="mt-1">
                    <b-row align-v="center" align-h="center">
                      <b-col class="text-center mb-1 px-0" xl="1">
                        <span
                          v-if="andIndex !== 0"
                          class="text-secondary font-weight-bold"
                        >
                          AND
                        </span>
                      </b-col>
                      <b-col xl="4" class="mb-1">
                        <b-row align-v="center" align-h="center">
                          <b-col>
                            <b-form-select
                              placeholder="Attribute"
                              v-model="andBlock.attribute"
                              :data-cy="
                                `AdvancedFilter-attributeSelect--${orIndex}.${andIndex}`
                              "
                              :options="selectAttributesValues"
                              @change="onAttributeChange(orIndex, andIndex)"
                            >
                              <template v-slot:first>
                                <b-form-select-option :value="null" disabled
                                  >Field</b-form-select-option
                                >
                              </template>
                            </b-form-select>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col xl="3" class="mb-1">
                        <b-form-select
                          :disabled="!andBlock || !andBlock.attribute"
                          v-model="andBlock.operator"
                          :data-cy="
                            `AdvancedFilter-operator--${orIndex}.${andIndex}`
                          "
                          :options="
                            andBlock
                              ? getOperatorsForAttribute(orIndex, andIndex)
                              : []
                          "
                          @change="$emit('input', filter)"
                        >
                          <template v-slot:first>
                            <b-form-select-option :value="null" disabled
                              >Operator</b-form-select-option
                            >
                          </template>
                        </b-form-select>
                      </b-col>
                      <b-col xl="4" class="mb-1">
                        <!-- TODO Complete the operator UIs -->
                        <template
                          v-if="
                            [
                              'exact_match',
                              'fuzzy_match',
                              'regexp_match'
                            ].includes(andBlock.operator)
                          "
                        >
                          <b-form-input
                            class="AdvancedFilter--value validate"
                            placeholder="Value"
                            type="text"
                            :data-cy="
                              `AdvancedFilter-valueInput--${orIndex}.${andIndex}`
                            "
                            v-model="andBlock.value"
                            @input="$emit('input', filter)"
                          />
                        </template>
                        <template
                          v-if="
                            ['range', 'date_range_ts'].includes(
                              andBlock.operator
                            )
                          "
                        >
                          <!-- TODO should support both gte and gt -->
                          <b-form-input
                            v-model="andBlock.value.gt"
                            placeholder="Value 1"
                            type="text"
                            class="AdvancedFilter--gtValue validate mb-1"
                            :data-cy="`AdvancedFilter-operator-Range-Value1`"
                            @input="$emit('input', filter)"
                          />
                          <!-- TODO should support both lte and lt -->
                          <b-form-input
                            v-model="andBlock.value.lt"
                            placeholder="Value 2"
                            type="text"
                            class="AdvancedFilter--ltValue validate mt-1"
                            :data-cy="`AdvancedFilter-operator-Range-Value2`"
                            @input="$emit('input', filter)"
                          />
                        </template>
                        <template
                          v-if="
                            [
                              'date_range',
                              'is_in',
                              'geoBoundingBox',
                              'geoDistanceRange',
                              'geoDistance',
                              'geoPolygon'
                            ].includes(andBlock.operator)
                          "
                        >
                          Operator not yet supported
                        </template>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="1" class="text-center">
                    <!-- TODO enable to delete the first condition if there are more than zero -->
                    <b-button
                      v-if="filter.length > 0 || orBlock.length > 0"
                      :data-cy="
                        `AdvancedFilter-removeAndBtn--${orIndex}.${andIndex}`
                      "
                      @click="removeAndCondition(orIndex, andIndex)"
                    >
                      <i class="fa fa-times pointer" />
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
              <b-col xl="1">
                <b-row align-v="center" align-h="center">
                  <b-button
                    v-if="andIndex === orBlock.length - 1"
                    variant="outline-secondary"
                    :data-cy="`AdvancedFilter-andBtn--${orIndex}.${andIndex}`"
                    @click="addAndCondition(orIndex)"
                  >
                    <i class="fa fa-plus left mr-1" />AND
                  </b-button>
                </b-row>
              </b-col>
            </b-row>
          </b-card>

          <b-row v-if="orIndex < filter.length - 1">
            <b-col class="pr-0 mr-0" md="5"><hr /></b-col>
            <b-col
              md="2"
              class="pr-0 mr-0 pl-0 ml-0 mt-2 text-center text-secondary"
            >
              <b>OR</b>
            </b-col>
            <b-col class="pl-0 ml-0" md="5"><hr /></b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BFormInput,
  BFormSelect,
  BFormSelectOption
} from 'bootstrap-vue';
import cloneDeep from 'lodash/cloneDeep';
import { getOperatorsByFieldType, emptyAdvancedFilter } from '@/services/FilterUtils';

export default {
  name: 'AdvancedFilter',
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormSelect,
    BFormSelectOption
  },
  props: {
    attributes: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      default: null
    },
    lang: {
      type: String,
      default: 'koncorde',
      validator: function(value) {
        return value === 'koncorde' || value === 'es';
      }
    }
  },
  data() {
    return {
      filter: [[{ attribute: null, operator: null, value: null }]]
    };
  },
  computed: {
    selectAttributesValues() {
      return Object.keys(this.attributes).map(a => ({
        text: a,
        value: a
      }));
    },
    getOperatorsForAttribute() {
      return (orIndex, andIndex) => {
        const predicate = this.getPredicate(orIndex, andIndex);
        if (!predicate) {
          return [];
        }
        const attributeFullPath = predicate.attribute;
        if (!attributeFullPath) {
          return [];
        }
        const attributeType = this.attributes[attributeFullPath]
          ? this.attributes[attributeFullPath].type
          : null;

        if (!attributeType) {
          return [];
        }
        return getOperatorsByFieldType(attributeType, this.lang);
      };
    },
    getPredicate() {
      return (orIndex, andIndex) => {
        if (
          !this.filter ||
          !this.filter[orIndex] ||
          !this.filter[orIndex][andIndex]
        ) {
          console.log(`Predicate not found for [${orIndex}, ${andIndex}]`);
          return null;
        }
        return this.filter[orIndex][andIndex];
      };
    }
  },
  methods: {
    onAttributeChange(orIndex, andIndex) {
      const predicate = this.getPredicate(orIndex, andIndex);
      if (!predicate) {
        return;
      }
      predicate.operator = null;
      this.$emit('input', this.filter);
    },
    addOrCondition() {
      this.filter.push(emptyAdvancedFilter()[0]);
    },
    addAndCondition(orIndex) {
      if (!this.filter[orIndex]) {
        return false;
      }
      this.filter[orIndex].push(emptyAdvancedFilter()[0][0]);
    },
    removeAndCondition(orIndex, andIndex) {
      if (!this.filter[orIndex] || !this.filter[orIndex][andIndex]) {
        return false;
      }
      if (this.filter.length === 1 && this.filter[0].length === 1) {
        this.$set(this.filter[0], 0, emptyAdvancedFilter());
        this.$emit('input', this.filter);
        return;
      }
      if (this.filter[orIndex].length === 1 && this.filter.length > 1) {
        this.filter.splice(orIndex, 1);
        this.$emit('input', this.filter);
        return;
      }
      this.filter[orIndex].splice(andIndex, 1);
      this.$emit('input', this.filter);
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.filter = cloneDeep(this.value);
      }
    },
    // Cannot trigger @input here, since it triggers an update loop (this watcher
    // gets triggered every time the props change).
    // We must trigger the @input event only after interactions with the DOM elements.
    filter: {
      immediate: false,
      handler() {
        this.$log.debug('Advanced filter has changed!');
        // this.$log.debug(JSON.stringify(this.filter, null, 2));
      }
    }
  }
};
</script>
