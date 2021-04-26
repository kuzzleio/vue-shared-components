import findKey from 'lodash/findKey';

export const getOperatorsByFieldType = (
  fieldType: string,
  lang: 'koncorde' | 'es' = 'koncorde'
) => {
  // TODO complete this with geospatial operators
  const range = {
    text: 'is between',
    value: 'range'
  };
  const dateRangeTs = {
    text: 'is between timestamps',
    value: 'date_range_ts'
  };
  const dateRange = {
    text: 'is between dates',
    value: 'date_range'
  };
  const exactMatch = {
    text: 'matches exactly',
    value: 'exact_match'
  };
  const fuzzyMatch = {
    text: 'matches regex',
    value: 'fuzzy_match'
  };
  const regexpMatch = {
    text: 'matches regex',
    value: 'regexp_match'
  };
  const exists = {
    text: 'exists',
    value: 'exists'
  };
  const missing = {
    text: 'does not exist',
    value: 'missing'
  };
  const isIn = {
    text: 'is one of',
    value: 'is_in'
  };
  const geoDistance = {
    text: 'is within cercle',
    value: 'geo_distance'
  };
  const unsupported = {
    text: 'field type not supported',
    value: 'unsupported'
  };

  switch (fieldType) {
    case 'keyword':
      return [exactMatch, regexpMatch, isIn, exists, missing];
    case 'text':
      return lang === 'koncorde'
        ? [exactMatch, regexpMatch, isIn, exists, missing]
        : [exactMatch, regexpMatch, fuzzyMatch, isIn, exists, missing];
    case 'integer':
    case 'long':
    case 'double':
    case 'float':
      return [range, isIn, exists, missing];
    case 'date':
      return [dateRangeTs, dateRange, exists, missing];
    case 'geo_point':
      return [geoDistance];
    default:
      return [unsupported];
  }
};

// KONCORDE
///////////////////////////////////////////////////////////////////

enum advancedFilterOperator {
  'exact_match' = 'exact_match',
  'is_in' = 'is_in',
  'range' = 'range',
  'exists' = 'exists',
  'regexp_match' = 'regexp_match',
  'missing' = 'missing',
  'geo_distance' = 'geo_distance'
}

const koncordeToAdvancedFilterOperator = {
  equals: advancedFilterOperator.exact_match,
  in: advancedFilterOperator.is_in,
  range: advancedFilterOperator.range,
  exists: advancedFilterOperator.exists,
  regexp: advancedFilterOperator.regexp_match,
  geoDistance: advancedFilterOperator.geo_distance
};

export interface KoncordeRange {
  range: {
    [field: string]: {
      gte?: Number;
      lte?: Number;
      gt?: Number;
      lt?: Number;
    };
  };
}

export interface KoncordeEquals {
  equals: {
    [field: string]: string;
  };
}

export interface KoncordeRegexp {
  regexp: {
    [field: string]: {
      value: string;
      flags: string;
    };
  };
}

export interface KoncordeIn {
  in: {
    [field: string]: string[];
  };
}

export type KoncordeClause =
  | KoncordeRange
  | KoncordeEquals
  | KoncordeRegexp
  | KoncordeIn;
export interface KoncordeAndGroup {
  and: KoncordeClause[];
}
export interface StandardKoncordeFilter {
  or: KoncordeAndGroup[];
}

export interface AdvancedFilterPredicate {
  attribute: string | null;
  operator: // TODO complete this with ES-compliant operators
  advancedFilterOperator | null;
  value?: any | null;
}
export type AdvancedFilter = AdvancedFilterPredicate[][];

export const emptyAdvancedFilter = (): AdvancedFilter => [
  [{ attribute: null, operator: null, value: null }]
];

// TODO - Test all the if statements in this function
/**
 * Transforms a Koncorde filter into the Advanced Filter UI Schema.
 * The Koncorde filter must be in the [boolean form]
 * (https://docs.kuzzle.io/core/2/api/koncorde-filters-syntax/operators/#bool)
 * and comply to the following pattern
 * ```
 *  {
 *    or: [
 *     {
 *       and: [
 *         ...predicates...
 *       ]
 *     },
 *     {
 *       and: [
 *         ...predicates...
 *       ]
 *     },
 *    ]
 *  }
 * ```
 *
 * @param filter
 */
export const koncordeFilterToAdvancedFilter = (
  filter: StandardKoncordeFilter
): AdvancedFilter => {
  if (!filter.or) {
    throw new Error(
      'The Koncorde filter does not comply with the expected shape: root `or` not found.'
    );
  }
  if (filter.or.length === 0) {
    // TODO test this
    return emptyAdvancedFilter();
  }
  return filter.or.map((andGroup: KoncordeAndGroup) => {
    if (!andGroup.and) {
      throw new Error(
        'The Koncorde filter does not comply with the expected shape: `and` not found in `or` group.'
      );
    }
    if (andGroup.and.length === 0) {
      // TODO test this
      return emptyAdvancedFilter()[0];
    }
    return andGroup.and.map((clause: KoncordeClause) =>
      koncordeClauseToAdvancedFilterPredicate(clause)
    );
  });
};

function koncordeClauseToAdvancedFilterPredicate(
  clause: KoncordeClause
): AdvancedFilterPredicate {
  const koncordeOperator = Object.keys(clause)[0];
  // TODO complete this
  if (
    koncordeOperator === 'equals' ||
    koncordeOperator === 'in' ||
    koncordeOperator === 'range' ||
    koncordeOperator === 'regexp'
  ) {
    const operatorValues = clause[koncordeOperator as keyof typeof clause];
    if (!operatorValues) {
      throw new Error(
        `Unable to translate Koncorde Clause ${JSON.stringify(clause)}`
      );
    }
    const attribute = Object.keys(operatorValues)[0];
    return {
      attribute,
      operator: koncordeToAdvancedFilterOperator[koncordeOperator],
      value: operatorValues[attribute]
    };
  }

  throw new Error(
    `Unable to translate Koncorde Clause ${JSON.stringify(clause)}`
  );
}

// export const advancedFilterToKoncordeFilter = (
//   advFilter: AdvancedFilterPredicate[][]
// ): StandardKoncordeFilter | null => {
//   const koncordeFilter: StandardKoncordeFilter = {
//     or: []
//   };
//   if (!Array.isArray(advFilter)) {
//     throw new Error('Malformed AdvancedFilter - not an array');
//   }

//   // Filter out the empty predicates
//   let cleanFilter = advFilter
//     .map(orBlock =>
//       orBlock.filter(
//         predicate =>
//           !!predicate.attribute && !!predicate.operator && !!predicate.value
//       )
//     )
//     .filter(orBlock => orBlock.length > 0); // Filter out the empty or-blocks

//   if (cleanFilter.length === 0) {
//     return null;
//   }

//   koncordeFilter.or = cleanFilter.map(orBlock => ({
//     and: orBlock.map(advancedFilterPredicateToKoncordeClause)
//   }));
//   return koncordeFilter;
// };

/**
 * Translates this
 * {
 *  attribute: 'toto',
 *  operator: 'equals',
 *  value: 'titi'
 * }
 * to this
 * {
 *  equals: {
 *   toto: 'titi'
 *  }
 * }
 * @param predicate The AdvancedFilter predicate to translate
 */
// function advancedFilterPredicateToKoncordeClause(
//   predicate: AdvancedFilterPredicate
// ): KoncordeClause {
//   if (!predicate.operator) {
//     throw new Error('Invalid predicate: null operator.');
//   }
//   if (!predicate.attribute) {
//     throw new Error('Invalid predicate: null attribute.');
//   }
//   const operator = findKey(
//     koncordeToAdvancedFilterOperator,
//     v => v === predicate.operator
//   );

//   if (!operator) {
//     throw new Error(
//       `Invalid predicate: unknown operator ${predicate.operator}`
//     );
//   }

//   return {
//     [operator]: {
//       [predicate.attribute]: predicate.value
//     }
//   };
// }

// ELASTICSEARCH
///////////////////////////////////////////////////////////////////

// TODO
